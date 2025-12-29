(function () {
    "use strict";

    /* 核心代码 */
    function Promise(executor) {
        var self = this;
        // init params
        if (typeof executor !== "function") throw new TypeError("Promise resolver executor is not a function");
        if (!(self instanceof Promise)) throw new TypeError("undefined is not a promise");

        // property
        self.state = "pending";
        self.result = undefined;
        define(self, "onfulfilledCallbacks", []);
        define(self, "onrejectedCallbacks", []);
        var change = function change(state, result) {
            if (self.state !== "pending") return;
            self.state = state;
            self.result = result;
            // “异步”通知集合中的方法执行
            var callbacks = state === "fulfilled" ? self.onfulfilledCallbacks : self.onrejectedCallbacks;
            if (callbacks.length > 0) {
                setTimeout(function () {
                    callbacks.forEach(function (callback) {
                        callback(self.result);
                    });
                });
            }
        };

        // run executor
        try {
            executor(function resolve(value) {
                change("fulfilled", value);
            }, function reject(reason) {
                change("rejected", reason);
            });
        } catch (err) {
            change("rejected", err);
        }
    }

    /* 工具/通用方法 */
    // 检测是否为Promise的实例
    var checkInstance = function checkInstance(self) {
        if (!(self instanceof Promise)) {
            throw new TypeError('Method then called on incompatible receiver #<Promise>');
        }
    };

    // 处理THEN方法返回的新实例promise的状态和值
    var resolvePromise = function resolvePromise(promise, x, resolve, reject) {
        if (x === promise) throw new TypeError("Chaining cycle detected for promise #<Promise>");
        if (x !== null && /^(object|function)$/.test(typeof x)) {
            var then;
            try {
                then = x.then;
            } catch (err) {
                reject(err);
                return;
            }
            if (typeof then === "function") {
                // x是一个promise实例了
                var called = false;
                try {
                    then.call(
                        x,
                        function onfulfilled(y) {
                            if (called) return;
                            called = true;
                            resolvePromise(promise, y, resolve, reject);
                        },
                        function onrejected(r) {
                            if (called) return;
                            called = true;
                            reject(r);
                        }
                    );
                } catch (err) {
                    if (called) return;
                    called = true;
                    reject(err);
                }
                return;
            }
        }
        resolve(x);
    };

    // 设置不可枚举的属性方法
    var define = function define(obj, key, value) {
        Object.defineProperty(obj, key, {
            enumerable: false,
            configurable: true,
            writable: true,
            value: value
        });
    };

    /* 原型对象 */
    var proto = Promise.prototype;
    define(proto, Symbol.toStringTag, "Promise");
    define(proto, "then", function then(onfulfilled, onrejected) {
        checkInstance(this);
        var self = this,
            promise;
        // 实现THEN的穿透机制
        if (typeof onfulfilled !== "function") {
            onfulfilled = function onfulfilled(value) {
                return value;
            };
        }
        if (typeof onrejected !== "function") {
            onrejected = function onrejected(reason) {
                throw reason;
            };
        }
        // 实现THEN链机制
        promise = new Promise(function (resolve, reject) {
            switch (self.state) {
                case "fulfilled":
                    setTimeout(function () {
                        try {
                            var x = onfulfilled(self.result);
                            resolvePromise(promise, x, resolve, reject);
                        } catch (err) {
                            reject(err);
                        }
                    });
                    break;
                case "rejected":
                    setTimeout(function () {
                        try {
                            var x = onrejected(self.result);
                            resolvePromise(promise, x, resolve, reject);
                        } catch (err) {
                            reject(err);
                        }
                    });
                    break;
                default:
                    self.onfulfilledCallbacks.push(function (value) {
                        try {
                            var x = onfulfilled(value);
                            resolvePromise(promise, x, resolve, reject);
                        } catch (err) {
                            reject(err);
                        }
                    });
                    self.onrejectedCallbacks.push(function (reason) {
                        try {
                            var x = onrejected(reason);
                            resolvePromise(promise, x, resolve, reject);
                        } catch (err) {
                            reject(err);
                        }
                    });
            }
        });
        return promise;
    });
    define(proto, "catch", function catchMy(onrejected) {
        checkInstance(this);
        var self = this;
        return self.then(null, onrejected);
    });

    /* 静态私有属性方法 */
    define(Promise, "resolve", function resolve(value) {
        return new Promise(function (resolve) {
            resolve(value);
        });
    });
    define(Promise, "reject", function reject(reason) {
        return new Promise(function (_, reject) {
            reject(reason);
        });
    });

    /* 测试规范 */
    Promise.deferred = function () {
        var result = {};
        result.promise = new Promise(function (resolve, reject) {
            result.resolve = resolve;
            result.reject = reject;
        });
        return result;
    };

    /* 暴露API */
    if (typeof window !== "undefined") window.Promise = Promise;
    if (typeof module === "object" && typeof module.exports === "object") module.exports = Promise;
})();
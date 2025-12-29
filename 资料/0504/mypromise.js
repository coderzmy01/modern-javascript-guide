(function () {
    "use strict";

    /* 核心代码 */
    function Promise(executor) {
        var self = this;
        if (typeof executor !== "function") throw new TypeError("Promise resolver executor is not a function");
        if (!(self instanceof Promise)) throw new TypeError("undefined is not a promise");
        self.state = "pending";
        self.result = undefined;
        define(self, "onfulfilledCallbacks", []);
        define(self, "onrejectedCallbacks", []);
        var change = function change(state, result) {
            if (self.state !== "pending") return;
            self.state = state;
            self.result = result;
            var callbacks = state === "fulfilled" ? self.onfulfilledCallbacks : self.onrejectedCallbacks;
            if (callbacks.length > 0) {
                setTimeout(function () {
                    callbacks.forEach(function (callback) {
                        callback(self.result);
                    });
                });
            }
        };
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
    var toString = Object.prototype.toString;

    var checkInstance = function checkInstance(self) {
        if (!(self instanceof Promise)) {
            throw new TypeError('Method then called on incompatible receiver #<Promise>');
        }
    };

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

    var define = function define(obj, key, value) {
        Object.defineProperty(obj, key, {
            enumerable: false,
            configurable: true,
            writable: true,
            value: value
        });
    };

    // 验证传递的值是否是符合iterator迭代器规范的集合
    var isIterator = function isIterator(obj) {
        if (Array.isArray(obj)) return true;
        if (obj == null) return false;
        var flag = false;
        if (typeof Symbol !== "undefined" && obj[Symbol.iterator]) flag = true;
        return flag;
    };

    // 验证是否为promise实例
    var isPromise = function isPromise(x) {
        if (x !== null && /^(object|function)$/.test(typeof x)) {
            var then;
            try {
                then = x.then;
            } catch (_) {
                return false;
            }
            if (typeof then === "function") {
                return true;
            }
        }
        return false;
    };

    /* 原型对象 */
    var proto = Promise.prototype;
    if (typeof Symbol !== "undefined") define(proto, Symbol.toStringTag, "Promise");
    define(proto, "then", function then(onfulfilled, onrejected) {
        checkInstance(this);
        var self = this,
            promise;
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
    define(Promise, "all", function all(promises) {
        // 校验集合的合法性
        if (!isIterator(promises)) throw new TypeError("promises is not iterable!");
        // 如果传递的是Set结构，则把其变为数组
        if (toString.call(promises) === "[object Set]") promises = Array.from(promises);
        return new Promise(function (resolve, reject) {
            var len = promises.length,
                n = 0,
                results = [];
            // 迭代集合中的每一项,验证每一项的成功和失败
            for (var i = 0; i < len; i++) {
                // 基于闭包存储需要的索引
                (function (i) {
                    var promise = promises[i];
                    // 验证每一项是否是promise实例,如果不是则把其变为promise实例
                    if (!isPromise(promise)) promise = Promise.resolve(promise);
                    promise.then(function onfulfilled(value) {
                        // 某一项是成功，我们把值存储起来「按照顺序存储」，继续看下一项
                        results[i] = value;
                        n++;
                        if (n >= len) {
                            // 都成功了，则整体也是成功的
                            resolve(results);
                        }
                    }, function onrejected(reason) {
                        // 其中有一项是失败，则整体就是失败
                        reject(reason);
                    });
                })(i);
            }
        });
    });
    define(Promise, "any", function any(promises) {
        if (!isIterator(promises)) throw new TypeError("promises is not iterable!");
        if (toString.call(promises) === "[object Set]") promises = Array.from(promises);
        return new Promise(function (resolve, reject) {
            var len = promises.length,
                n = 0;
            [].forEach.call(promises, function (promise) {
                if (!isPromise(promise)) promise = Promise.resolve(promise);
                promise.then(function onfulfilled(value) {
                    resolve(value);
                }, function onrejected() {
                    if (++n >= len) reject(new Error("All promises were rejected"));
                });
            });
        });
    });
    // 字节的面试题：具备可控失败数量的all方法
    define(Promise, "allLimit", function all(promises, limit) {
        if (!isIterator(promises)) throw new TypeError("promises is not iterable!");
        if (toString.call(promises) === "[object Set]") promises = Array.from(promises);
        limit = +limit;
        if (isNaN(limit)) limit = 1;
        return new Promise(function (resolve, reject) {
            var len = promises.length,
                n = 0,
                m = 0,
                results = [];
            [].forEach.call(promises, function (promise, index) {
                if (!isPromise(promise)) promise = Promise.resolve(promise);
                promise.then(function onfulfilled(value) {
                    results[index] = value;
                    if (++n >= len) resolve(results);
                }, function onrejected() {
                    // 失败也要计数
                    if (++m >= limit) {
                        reject(new Error("There have been " + limit + " failures!"));
                        return;
                    }
                    results[index] = null;
                    if (++n >= len) resolve(results);
                });
            });
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
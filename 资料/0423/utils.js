(function () {
    /* 检测数据类型 */
    const class2type = {},
        toString = class2type.toString,
        hasOwn = class2type.hasOwnProperty;
    const toType = function toType(obj) {
        let reg = /^\[object ([\w\W]+)\]$/;
        if (obj == null) return obj + "";
        return typeof obj === "object" || typeof obj === "function" ?
            reg.exec(toString.call(obj))[1].toLowerCase() :
            typeof obj;
    };
    const isFunction = function isFunction(obj) {
        return typeof obj === "function" &&
            typeof obj.nodeType !== "number" &&
            typeof obj.item !== "function";
    };
    const isWindow = function isWindow(obj) {
        return obj != null && obj === obj.window;
    };
    const isArrayLike = function isArrayLike(obj) {
        let length = !!obj && "length" in obj && obj.length,
            type = toType(obj);
        if (isFunction(obj) || isWindow(obj)) return false;
        return type === "array" || length === 0 ||
            typeof length === "number" && length > 0 && (length - 1) in obj;
    };
    const isPlainObject = function isPlainObject(obj) {
        let proto, Ctor;
        if (!obj || toString.call(obj) !== "[object Object]") return false;
        proto = Object.getPrototypeOf(obj);
        if (!proto) return true; //匹配 Object.create(null)
        Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
        return typeof Ctor === "function" && Ctor === Object;
    };
    const isEmptyObject = function isEmptyObject(obj) {
        let keys = Object.getOwnPropertyNames(obj);
        if (typeof Symbol !== "undefined") keys = keys.concat(Object.getOwnPropertySymbols(obj));
        return keys.length === 0;
    };
    const isNumeric = function isNumeric(obj) {
        var type = toType(obj);
        return (type === "number" || type === "string") &&
            !isNaN(obj - parseFloat(obj));
    };

    /* 函数的防抖和节流 */
    const clearTimer = function clearTimer(timer) {
        if (timer) clearTimeout(timer);
        return null;
    };
    const debounce = function debounce(func, wait, immediate) {
        if (typeof func !== "function") throw new TypeError("func is not a function!");
        if (typeof wait === "boolean") {
            immediate = wait;
            wait = undefined;
        }
        wait = +wait;
        if (isNaN(wait)) wait = 300;
        if (typeof immediate !== "boolean") immediate = false;
        let timer = null;
        return function operate(...params) {
            let now = !timer && immediate;
            timer = clearTimer(timer);
            timer = setTimeout(() => {
                if (!immediate) func.call(this, ...params);
                timer = clearTimer(timer);
            }, wait);
            if (now) func.call(this, ...params);
        };
    };
    const throttle = function throttle(func, wait) {
        if (typeof func !== "function") throw new TypeError("func is not a function!");
        wait = +wait;
        if (isNaN(wait)) wait = 300;
        let timer = null,
            previous = 0;
        return function operate(...params) {
            let now = +new Date(),
                remaining = wait - (now - previous);
            if (remaining <= 0) {
                func.call(this, ...params);
                previous = +new Date();
                timer = clearTimer(timer);
            } else if (!timer) {
                timer = setTimeout(() => {
                    func.call(this, ...params);
                    previous = +new Date();
                    timer = clearTimer(timer);
                }, remaining);
            }
        };
    };


    const utils = {
        toType,
        isFunction,
        isWindow,
        isArrayLike,
        isPlainObject,
        isEmptyObject,
        isNumeric,
        debounce,
        throttle
    };

    /* 处理冲突 */
    if (typeof window !== "undefined") {
        let $ = window._;
        utils.noConflict = function noConflict() {
            if (window._ === utils) {
                window._ = $;
            }
            return utils;
        };
    }

    /* 导出API */
    if (typeof window !== "undefined") window.utils = window._ = utils;
    if (typeof module === "object" && typeof module.exports === "object") module.exports = utils;
})();
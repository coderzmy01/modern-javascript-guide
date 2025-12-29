(function () {
    "use strict";

    /* 函数防抖&节流 */
    const clearTimer = function clearTimer(timer) {
        if (timer !== null) clearTimeout(timer);
        return null;
    };
    const debounce = function debounce(func, wait, immediate) {
        if (typeof func !== "function") throw new TypeError("func is not a function!");
        if (typeof wait === "boolean") immediate = wait;
        if (typeof wait !== "number") wait = 300;
        if (typeof immediate !== "boolean") immediate = false;
        let timer = null;
        return function operate(...params) {
            let now = !timer && immediate;
            timer = clearTimer(timer);
            timer = setTimeout(() => {
                timer = clearTimer(timer);
                if (!immediate) func.apply(this, params);
            }, wait);
            if (now) return func.apply(this, params);
        };
    };
    const throttle = function throttle(func, wait) {
        if (typeof func !== "function") throw new TypeError("func is not a function!");
        if (typeof wait !== "number") wait = 300;
        let timer = null,
            previous = 0;
        return function operate(...params) {
            let now = +new Date(),
                remaining = wait - (now - previous);
            if (remaining <= 0) {
                timer = clearTimer(timer);
                previous = +new Date();
                return func.apply(this, params);
            }
            if (!timer) {
                timer = setTimeout(() => {
                    timer = clearTimer(timer);
                    previous = +new Date();
                    func.apply(this, params);
                }, remaining);
            }
        };
    };

    /* 暴露API */
    const utils = {
        version: '1.0.0',
        debounce,
        throttle
    };
    if (typeof module === "object" && typeof module.exports === "object") module.exports = utils;
    if (typeof window !== "undefined") window.utils = utils;
})();
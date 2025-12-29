(function () {
    /* 函数的防抖和节流 */
    const clearTimer = function clearTimer(timer) {
        if (timer) clearTimeout(timer);
        return null;
    };

    const debounce = function debounce(func, wait, immediate) {
        // init params
        if (typeof func !== "function") throw new TypeError("func is not a function!");
        if (typeof wait === "boolean") {
            immediate = wait;
            wait = undefined;
        }
        wait = +wait;
        if (isNaN(wait)) wait = 300;
        if (typeof immediate !== "boolean") immediate = false;
        // handler
        let timer = null;
        return function operate(...params) {
            // now:记录是否是立即执行「第一次点击&immediate=true」
            let now = !timer && immediate;
            // 清除之前设置的定时器
            timer = clearTimer(timer);
            timer = setTimeout(() => {
                // 结束边界触发
                if (!immediate) func.call(this, ...params);
                // 清除最后一个定时器
                timer = clearTimer(timer);
            }, wait);
            // 如果是立即执行，则第一次执行operate就把要干的事情做了即可 “开始边界触发”
            if (now) func.call(this, ...params);
        };
    };

    const throttle = function throttle(func, wait) {
        // init params
        if (typeof func !== "function") throw new TypeError("func is not a function!");
        wait = +wait;
        if (isNaN(wait)) wait = 300;
        // handler
        let timer = null,
            previous = 0; //记录上一次func触发的时间
        return function operate(...params) {
            let now = +new Date(),
                remaining = wait - (now - previous);
            if (remaining <= 0) {
                // 两次触发的间隔时间超过设定的频率，则立即执行函数
                func.call(this, ...params);
                previous = +new Date();
                timer = clearTimer(timer);
            } else if (!timer) {
                // 间隔时间不足设定的频率，而且还未设置等待的定时器，则设置定时器等待执行函数即可
                timer = setTimeout(() => {
                    func.call(this, ...params);
                    previous = +new Date();
                    timer = clearTimer(timer);
                }, remaining);
            }
        };
    };


    const utils = {
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
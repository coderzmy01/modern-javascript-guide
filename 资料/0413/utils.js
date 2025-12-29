/*
 对项目中常用方法的封装
   + 支持：浏览器导入<script src>、支持CommonJS、支持ES6Module规范(webpack)
   + 支持：浏览器、Node、webpack
 */
(function () {
    const utils = {
        // ...
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

/* 
浏览器：
<script src='utils.js'>
<script>
   _.xxx();
   utils.xxx();
</script>

NODE：
const utils=require('./utils.js');
utils.xxx();

webpack：实现CommonJS和ES6Module的转换
import _ from './utils.js';
_.xxx();
*/
(function (global, factory) {
    "use strict";
    /* 
     浏览器&webpack ：global -> window
     Node ：global -> global对象或者当前模块
     ----
     factory ：回调函数
    */
    if (typeof module === "object" && typeof module.exports === "object") {
        /* 
        支持CommonJS模块规范：运行在Node或者Webpack环境下
          + global.document存在：则global是window，说明是Webpack环境下 => 把factory执行的返回结果，基于module.exports导出 => module.exoprts=jQuery
            const $ = require('jquery') => $===jQuery

          + 不存在：Node环境  => module.exports导出一个函数，函数执行，如果无法提供window对象，则报错，也说明了“JQ不支持在Node中运行” 
        */
        module.exports = global.document ?
            factory(global, true) :
            function (w) {
                if (!w.document) {
                    throw new Error("jQuery requires a window with a document");
                }
                return factory(w);
            };
        return;
    }t
    // 不支持CommonJS模块规范：运行在浏览器环境下
    factory(global);
})(
    typeof window !== "undefined" ? window : this,
    function (window, noGlobal) {
        /*
         浏览器：window->window  noGlobal->undefined
           <script src='jquery.js'>
           <script>
              $()
              jQuery()
           </script>
           
         webpack：window->window  noGlobal->true
         */
        var version = "3.6.0",
            jQuery = function (selector, context) {
                //...
            };
        // ...

        if (typeof noGlobal === "undefined") {
            window.jQuery = window.$ = jQuery;
        }
        return jQuery;
    }
);
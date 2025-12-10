// (function fn() {
//   console.log('xx');
// })();
// console.log(fn);
// var b = 10;
// (function b() {
//   b = 20;
//   console.log(b);
// })();
// console.log(b);
// let x = 5;
// const fn = function fn(x) {
//   return function (y) {
//     console.log(y + ++x);
//   };
// };
// let f = fn(6);
// f(7);
// fn(8)(9);
// f(10);
// console.log(x);

// let a = 0,
//   b = 0;
// let A = function (a) {
//   A = function (b) {
//     console.log(a + b++);
//   };
//   console.log(a++);
// };
// A(1);
// A(2);
/* 
每间隔1秒输出 0 1 2
*/
// for (let i = 0; i < 3; i++) {
//   setTimeout(() => {
//     console.log(i);
//   }, (i + 1) * 1000);
// }
// const fn = (x, y) => (z) => x + y + z;
// const fn = (...params) => {
//   return (...ags) => {
//     return params.concat(ags).reduce((cur, prev) => cur + prev, 0);
//   };
// };

// 函数curry
// let res = fn(1, 2)(3);
// console.log(res); //=>6  1+2+3

// const curring = function curring(...args) {
//   return function add(...params) {
//     return add;
//   };
// };
// let add = curring();
// let res = add(1)(2)(3);
// console.log(+res); //->6

// add = curring();
// res = add(1, 2, 3)(4);
// console.log(+res); //->10

// add = curring();
// res = add(1)(2)(3)(4)(5);
// console.log(+res); //->15
// 函数柯理化
// const curry = (fn) => {
//   return function curriedFn(...args) {
//     if (args.length == fn.length) {
//       return fn.apply(this, args);
//     }
//     return function (...nexArgs) {
//       return curriedFn.apply(this, args.concat(nexArgs));
//     };
//   };
// };
// const add = (x, y, z) => {
//   return x + y + z;
// };
// const curriedAdd = curry(add);
// console.log(curriedAdd(1)(2)(3));
// // 函数组合
// const compose = (...fns) => {
//   if (fns.length === 0)
//     return (x) => {
//       x;
//     };
//   if (fns.length == 1)
//     return () => {
//       fns.at(0)();
//     };
//   return (arg) => {
//     fns.reduce((cur, next) => {
//       next = cur(next);
//       return next;
//     }, arg);
//   };
// };

// // 惰性思想
// const getCss = function (ele, attribute) {
//   if (window.getComputedStyle) {
//     return getComputedStyle(ele)[attribute];
//   } else {
//     return ele.currentStyle[attribute];
//   }
// };
// // 惰性版
// let getCssLazy = (ele, attribute) => {
//   if (window.getComputedStyle) {
//     getCssLazy = (ele, attribute) => {
//       return getComputedStyle(ele)[attribute];
//     };
//   } else {
//     getCssLazy = (ele, attribute) => {
//       return ele.currentStyle[attribute];
//     };
//   }
//   return getCssLazy(ele, attribute);
// };
// console.log(getCssLazy(document.body, 'width'));

// jquery中的环境判断
(function (global, factory) {
  // node&webpack环境
  if (typeof module !== undefined && !module.exports) {
    module.exports = global.document
      ? factory(global, true)
      : () => {
          throw new Error('jQuery requires a window with a document');
        };
  }
  factory(global);
})(typeof window !== undefined ? window : this, function factory(window, noGlobal) {
  var jquery = function () {
    console.log('ss');
  };
  if (noGlobal === undefined) window.$ = jquery;
  return jquery;
});
// 封装utils的基础架子
(function () {
  const utils = {};

  // 根据环境导出
  if (window && window.document) window._ = window.utils = utils;
  if (typeof module !== undefined && !module.exports) module.exports = utils;
  // 处理冲突
  let $ = window._;
  utils.noConflict = () => {
    if (window._ === utils) {
      window._ = $;
    }
    return utils;
  };
})();

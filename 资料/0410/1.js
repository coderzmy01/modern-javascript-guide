
/* 
匿名函数具名化：更规范一些、可以让原本的匿名函数实现递归等操作
  + 自执行函数
  + 函数表达式
    const fn = function fn(){};
    fn();
  -----
  @1 不会在所处上下文(宿主环境)中进行声明：设置的名字在外面用不了
  @2 在自己执行产生的上下文中会被声明赋值，赋的值是当前函数本身
  @3 而且赋的值默认是不能被修改的：但是如果此名字被其他方式声明了(例如let/const/var...)，则以其它方式声明的为主
*/

/* (function fn() {
    let fn = 100;
    console.log(fn); //100
})(); */

/* 
(function fn() {
    fn = 100;
    console.log(fn); //函数本身
})(); 
// console.log(fn); //Uncaught ReferenceError: fn is not defined
*/

/* var b = 10;
(function b() {
    b = 20;
    console.log(b); //函数本身
})();
console.log(b); //10 */

/* 
"use strict";
let num = 0;
(function fn() {
    if (num >= 5) return;
    num++;
    // 调用本函数(递归): arguments.callee 获取的也是函数本身（严格模式下不允许使用）
    // arguments.callee();
    fn();
})();
console.log(num); 
*/
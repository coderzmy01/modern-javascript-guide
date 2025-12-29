/* 
 浏览器是多线程，但是它只分配一个“JS引擎线程”用来渲染和解析JS代码，所以JS是单线程的！！
   + JS中大部分代码都是“同步编程”，例如：循环...
     + 千万不要写死循环，一但遇到死循环，则JS引擎线程会一直被占用，其它事情都做不了了
     + 遇到程序抛出异常，后面的代码也不会再执行了
       + 我们可以基于 try/catch 进行异常捕获，这样不会影响后续代码的执行
     + ...
   
   + JS中也存在“异步编程”：依托于浏览器多线程，再基于EventLoop事件循环机制处理的
     + 异步宏任务 macrotask
       + 定时器 setTimeout/setInterval
       + 事件绑定 
       + ajax/fetch
       + ...
     + 异步微任务 microtask
       + requestAnimationFrame 
       + Promise.then/catch/finally
       + async await
       + queueMicrotask 基于这个方法可以创建一个异步微任务
       + IntersectionObserver
       + ...


 定时器到时间后也不一定能执行（设定的时间是其最快执行的时间）：如果此时主线程被占用，则必须等主线程空闲下来，排在EventQueue中的定时器才可以执行！
   @1 基于JS和定时器实现动画效果，存在以下问题：
     + 出现卡顿的状况：到时间该走了，但是主线程被占用，它走不了
     + 我们设定的时间很难和“屏幕刷新率”保持一致
   @2 但是可以基于 window.requestAnimationFrame 实现动画
     + 不需要我们设置时间，默认是按照电脑的“屏幕刷新率对应的时间”进行运动的
     + 也会出现“因主线程被占用，它无法立即执行”导致的卡顿，但是比定时器好，因为它是异步微任务，优先于异步宏任务执行！！
*/


/* 
setTimeout(() => {
    console.log(1);
}, 20);
console.log(2);
setTimeout(() => {
    console.log(3);
}, 10);
console.log(4);
for (let i = 0; i < 90000000; i++) {
    // do soming  79ms左右
}
console.log(5);
setTimeout(() => {
    console.log(6);
}, 8);
console.log(7);
setTimeout(() => {
    console.log(8);
}, 15);
console.log(9); 
*/


/* 
setTimeout(() => {
    console.log(1);
}, 0); //定时器等待时间不设置或设置为零，不是立即执行，而是要等待浏览器最快反应时间「谷歌5~7ms」
console.log(2);
// 先输出2  再输出1 
*/

/* 
try {
    console.log(a); //Uncaught ReferenceError: a is not defined
    // throw new Error('xxx'); //手动抛出异常
} catch (err) {
    // err:我们捕获到的异常错误
}
console.log('ok'); 
*/

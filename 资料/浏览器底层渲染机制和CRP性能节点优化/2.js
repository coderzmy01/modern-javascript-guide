/*
 JS是单线程的「因为浏览器只分配一个“JS引擎线程(主线程)”去渲染解析JS」 
   + 所以JS中大部分代码都是同步的「事情是一件件的去处理，上一件事情完成，下一件事情才能去处理」
     例如：循环...
     项目中一定要避免出现死循环，一但出现，主线程会被持续占用，后续所有操作都无法进行
   + JS中也有异步编程的代码
     例如：定时器、事件绑定、ajax、Promise、await...
     单线程异步编程，是借用了浏览器的其他线程，实现了一套EventLoop事件循环机制
 */

setTimeout(() => {
    console.log(1);
}, 20);
console.log(2);
setTimeout(() => {
    console.log(3);
}, 10);
console.log(4);
for (let i = 0; i < 90000000; i++) {
    // do soming 79MS
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



/* setTimeout(() => {
    console.log(6);
}, 0); //等待时间设置为零，也不是立即执行，需要等待5~7ms，也是异步的{宏任务} */

/* console.log(1);
while(1){

}
console.log(2); */

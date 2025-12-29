/*
 浏览器是多线程的
   + GUI渲染线程：渲染和解析页面
   + JS引擎线程：渲染和解析JS 「浏览器分配一个线程去解析JS，所以JS是单线程的」
   + 定时器监听线程
   + 事件监听线程
   + HTTP网络请求线程「同源下，浏览器最多同时分配5~7个HTTP线程」
   + ...

 JS是“单线程”运行的，所以其中大部分代码都是“同步”的（例如：循环...）
   + 所以在JS中千万不要写“死循环”、“死递归”...等操作，这些操作会一直占用JS引擎线程，导致后续其他的程序都无法执行
   + 但是JS中也有部分“异步”操作的代码
     [异步微任务]
       + requestAnimationFrame
       + Promise.then/catch/finally
       + async/await
       + queueMicrotask 手动创建一个异步的微任务
       + MutationObserver
       + IntersectionObserver
       + ...
     [异步宏任务]
       + setTimeout/setInterval
       + 事件绑定/队列
       + XMLHttpRequest/Fetch
       + MessageChannel
       + ...

 JS中的异步操作是：借用浏览器的多线程机制，再基于EventLoop事件循环机制，实现的单线程异步效果！！
 */
/* console.time('AA');
for (let i = 0; i < 99999999;) { }
console.timeEnd('AA');
console.log('OK'); */


/* setTimeout(() => {
    console.log(1);
}, 20);
console.log(2);
setTimeout(() => {
    console.log(3);
}, 10);
console.log(4);
for (let i = 0; i < 90000000; i++) {
    // do soming 80ms左右
}
console.log(5);
setTimeout(() => {
    console.log(6);
}, 8);
console.log(7);
setTimeout(() => {
    console.log(8);
}, 15);
console.log(9); */


/*
 情况1：p.then(onfulfilled,onrejected)，已知实例p的状态和值，也不会立即把 onfulfilled/onrejected 执行，而是创建“异步微任务”「先进入WebAPI中，发现状态是成功，则onfulfilled可以被执行，把其再挪至到EventQueue中排队等着」

 情况2：如果还不知道实例p的状态，则先把onfulfilled/onrejected存储起来「理解为：进入WebAPI去监听，只有知道实例的状态，才可以执行」；resolve/reject执行，立即修改实例的状态和值，也决定了WebAPI中监听的方法(onfulfilled/onrejected)哪一个去执行「挪至到EventQueue中，异步微任务队列」；等待其它同步代码执行完，再拿出来执行！！
 */

/* Promise.resolve(1)
    .then(value => {
        console.log('成功:', value);
        return 2;
    })
    .then(value => {
        console.log('成功:', value);
    }); */

/* let p = new Promise(resolve => {
    setTimeout(() => {
        resolve(10);
        console.log(p, 2);
    }, 1000);
});
p.then(value => {
    console.log('成功:', value);
});
console.log(1);
// 1、实例,2、成功:10 */

/* let p = new Promise(resolve => {
    resolve(10);
});
p.then(value => {
    console.log('成功:', value);
});
console.log(1); */


/*
 遇到await
   + 会立即执行其后面代码，看返回的promise实例（如果不是promise实例也会变为promise实例）是否是成功
   + 会把当前上下文中，await下面代码当做异步的微任务
      + 进入到WebAPI中去监听：只有后面实例的状态是成功的，才可以执行
      + 可执行则进入到EventQueue中排队等着
 */
/* const fn = async () => {
    console.log(1);
    return 10;
};
(async function () {
    let result = await fn();
    console.log(2, result);
})();
console.log(3); */


/* 
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
    console.log('async2');
}
console.log('script start');
setTimeout(function() {
    console.log('setTimeout');
}, 0)
async1();
new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
});
console.log('script end'); 
*/

let body = document.body;
body.addEventListener('click', function () {
    Promise.resolve().then(() => {
        console.log(1);
    });
    console.log(2);
});
body.addEventListener('click', function () {
    Promise.resolve().then(() => {
        console.log(3);
    });
    console.log(4);
});
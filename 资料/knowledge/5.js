/*
 Promise & async/await 中的同步异步机制 
 */

/* 
new Promise(resolve => {
    // EXECUTOR函数会被立即执行「同步」：这里一般是管理异步编程代码，当异步结束，基于resolve/reject执行，控制实例状态的成功或者失败...
    console.log(1);
});
console.log(2); 
*/

/* 
let p1 = new Promise(resolve => {
    /!* 
     resolve/reject执行：
       + 立即修改实例的状态和值「同步」 
    *!/
    resolve(100);
});
// console.log(p1); //=>fulfilled & 100
/!*
 p1.then(onfulfilled,onrejected)
   + 如果此时已知p1实例的状态(不是pending),会根据状态去执行onfulfilled/onrejected;
     + 但并不会立即执行，而是创建一个“异步的微任务”
     + 进入到WebAPI中去监听，但是此时已经知道状态是成功的，则直接在挪至EventQueue中排队
     + 当同步代码执行完，主线程空闲下来了，再去EventQueue中查找
 *!/
p1.then(value => {
    console.log('成功:', value);
}, reason => {
    console.log('失败:', reason);
});
console.log(111); 
*/

/* 
let p1 = new Promise(resolve => {
    setTimeout(() => {
        /!* 
        立即修改实例的状态和值「同步」
        通知之前在集合中存储的方法执行「异步微任务」
          + 把存储的方法扔到WebAPI中去监听，但是发现实例状态已经是成功了，则挪至到EventQueue中排队等着
          + 把此上下文中剩下的代码执行完，再去获取这个异步任务执行
        *!/
        resolve(100);
        console.log(222, p1);
    }, 2000);
});
// console.log(p1); //pending & undefined
/!*
 执行THEN的时候，此时不知道p1实例的状态
   + 把 onfulfilled & onrejected 存储到PROMISE内部的集合中
 *!/
p1.then(value => {
    console.log('成功:', value);
});
console.log(111); 
*/

/* let p1 = Promise.resolve(100);
let p2 = p1.then(value => {
    console.log('成功:', value);
    return value / 10;
});
p2.then(value => {
    console.log('成功:', value);
});
console.log(111); */

/* 
 遇到await
   + 把await后面的东西进行处理「同步」，获取一个promise实例
   + 然后把当前上下文中，await下面的代码，设置为“异步的微任务”
     + 进入WebAPI监听，当await后面的实例是成功的，再挪至EventQueue中排队等着
*/
/* (async () => {
    let num = await Promise.resolve(100);
    console.log(num);
    // ...
})();
console.log(111); */


/* async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
    console.log('async2');
}
console.log('script start');
setTimeout(function () {
    console.log('setTimeout');
}, 0)
async1();
new Promise(function (resolve) {
    console.log('promise1');
    resolve();
}).then(function () {
    console.log('promise2');
});
console.log('script end'); */


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
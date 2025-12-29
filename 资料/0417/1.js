/*
 函数防抖：防止“老年帕金森”，用户频繁触发某个行为的时候，我们只识别“一次”「频繁的定义可以自己管控」
 函数节流：用户频繁操作的时候，不根据用户的频繁操作度来绝定触发多少次，而是根据设定好的频率进行触发，实现“降频”的效果，相对于防抖来讲，节流是允许触发多次的！！
 */

/* const submit = document.querySelector('#submit');

const func = function func(ev) {
    console.log('OK', ev, this);
};
submit.onclick = utils.debounce(func, 500);
// utils.debounce(func, 500, true)
// utils.debounce(func, 500) 
// utils.debounce(func, true)
// utils.debounce(func)
 */

/* 
// 我们假设，只要300MS(规定的高频率触发规则)内触发两次及以上，我们就识别为频繁触发，则最后把需要做的事情只做一次
const func = function func() {
    console.log('OK');
};
let timer = null;
submit.onclick = function () {
    clearTimeout(timer); //清除上一次设置的定时器
    // 再从新设置一个新的定时器来监听：300MS内是否有触发第二次
    //   + 有：则把之前设置的定时器清除掉，再从新设置一个即可
    //   + 没有：到时间后把想要执行的方法执行即可
    timer = setTimeout(() => {
        func();
    }, 300);
}; 
*/

/* 
submit.onclick = function () {
    console.log('OK'); //疯狂点击多少次按钮，方法就会被执行多少次
}; 
*/


/* 
// 场景一：点击按钮，向服务器发送请求（需要一定的时间），在当前请求没有成功之前，再次点击按钮应该什么都不处理才对
//   + submit是提交按钮
//   + this.$api.postInfo() 向服务器发送请求，而account和password是我们要传递给服务器的账号密码
let isRun = false;
submit.onclick = async function () {
    if (isRun) {
        // 如果处于正在请求中，就不要再去做任何的事情了
        return;
    }
    isRun = true; //正在请求中
    await this.$api.postInfo({
        account: 'zhufeng',
        password: '123456'
    });
    // 第一次发送的请求成功了：把isRung回归初始值
    isRun = false;
}; 
*/

const func = function func() {
    console.log('OK');
};

// window.onscroll有一个自己默认的触发频率：浏览器的最快反应时间「谷歌：5~7ms」
// window.onscroll = func;
window.onscroll = utils.throttle(func, 500);
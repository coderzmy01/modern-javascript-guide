/* 
 * Observer [əbˈzɜːrvər]观察者模式
 * Publish [ˈpʌblɪʃ] & Subscribe [səbˈskraɪb] 发布/订阅模式
 * 
 * 设计模式仅仅是“锦上添花”！设计模式是一种思想，基于这种思想可以更好的去管理代码！！
 *   + 单例设计模式
 *   + 工厂设计模式
 *   + 构造函数设计模式
 *   + Promise承诺者设计模式
 *   + 发布/订阅设计模式「自定义事件」
 *   + 观察者设计模式
 *   + ...
 */

/* 
let $plan = $.Callbacks();

// main.js  页面加载完成后做啥事...
window.addEventListener('load', function () {
    $plan.fire(10, 20);
});

// A.js
(function () {
    const fn1 = function fn1(x, y) {
        console.log('fn1', x, y);
    };
    // ...
    $plan.add(fn1);
})();

// B.js
(function () {
    const fn2 = function fn2() {
        console.log('fn2');
    };
    // ...
    $plan.add(fn2);
})();

// C.js
(function () {
    const fn3 = function fn3() {
        console.log('fn3');
    };
    // ...
    $plan.add(fn3);
})(); 
*/

(function () {
    // 自定义事件池
    let listeners = {};

    // 校验的处理
    const checkName = name => {
        if (typeof name !== "string") throw new TypeError('name is not a string!')
    };
    const checkFunc = func => {
        if (typeof func !== "function") throw new TypeError('func is not a function!')
    };

    // 向事件池中加入方法
    const on = function on(name, func) {
        checkName(name);
        checkFunc(func);
        // 判断事件池中是否存在这个事件
        if (!listeners.hasOwnProperty(name)) listeners[name] = [];
        let arr = listeners[name];
        // 去重处理
        if (arr.indexOf(func) >= 0) return;
        arr.push(func);
    };

    // 从事件池中移除方法
    const off = function off(name, func) {
        checkName(name);
        checkFunc(func);
        let arr = listeners[name];
        if (!arr) return;
        for (let i = 0; i < arr.length; i++) {
            let item = arr[i];
            if (item === func) {
                // 把这一项移除掉：为了避免数据塌陷问题，先赋值为null
                // arr.splice(i, 1);
                arr[i] = null;
                break;
            }
        }
    };

    // 通知指定事件池中的方法执行
    const emit = function emit(name, ...params) {
        checkName(name);
        let arr = listeners[name];
        if (!arr) return;
        // 通知集合中的每个方法执行
        for (let i = 0; i < arr.length; i++) {
            let item = arr[i];
            if (item === null) {
                // 此时把为null项从集合中移除掉
                arr.splice(i, 1);
                i--;
                continue;
            }
            item(...params);
        }
    };

    // 暴露API
    window.$sub = {
        on,
        off,
        emit
    };
})();

/* 测试 */
setTimeout(() => {
    $sub.emit('AA', 10, 20);

    setTimeout(() => {
        $sub.emit('AA', 100, 200);
    }, 2000);
}, 2000);

const fn1 = (x, y) => {
    console.log('fn1', x, y);
};
const fn2 = (x, y) => {
    console.log('fn2', x, y);
    // 第一次执行到FN2的时候，从事件池中移除FN1/FN2
    $sub.off('AA', fn1);
    $sub.off('AA', fn2);
};
const fn3 = () => console.log('fn3');
const fn4 = () => console.log('fn4');
const fn5 = () => console.log('fn5');
const fn6 = () => console.log('fn6');
$sub.on('AA', fn1);
$sub.on('AA', fn2);
$sub.on('AA', fn3);
$sub.on('AA', fn2);
$sub.on('AA', fn3);
$sub.on('AA', fn4);
$sub.on('AA', fn5);
$sub.on('AA', fn6);
$sub.on('BB', fn1);
$sub.on('BB', fn2);
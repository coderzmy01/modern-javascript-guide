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

(function () {
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
        if (!listeners.hasOwnProperty(name)) listeners[name] = [];
        let arr = listeners[name];
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
        for (let i = 0; i < arr.length; i++) {
            let item = arr[i];
            if (item === null) {
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
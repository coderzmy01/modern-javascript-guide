/* 
    在函数式编程当中有一个很重要的概念就是函数组合，实际上就是把处理数据的函数像管道一样连接起来，然后让数据穿过管道得到最终的结果。 例如：
    const add1 = (x) => x + 1;
    const mul3 = (x) => x * 3;
    const div2 = (x) => x / 2;
    div2(mul3(add1(add1(0)))); //=>3   把上一个函数执行的结果，作为下一个函数执行的实参值，以此实现多函数共同处理需求！
​
    而这样的写法可读性明显太差了，我们可以构建一个compose函数，它接受任意多个函数作为参数（这些函数都只接受一个参数），然后compose返回的也是一个函数，达到以下的效果：
    const operate = compose(div2, mul3, add1, add1)
    operate(0) //=>相当于div2(mul3(add1(add1(0)))) 
    operate(2) //=>相当于div2(mul3(add1(add1(2))))
​
    简而言之：compose可以把类似于f(g(h(x)))这种写法简化成compose(f, g, h)(x)，请你完成 compose函数的编写 
*/
const add1 = x => x + 1;
const mul3 = x => x * 3;
const div2 = x => x / 2;

/* 
// redux源码中的
const compose = function compose(...funcs) {
    if (funcs.length === 0) return x => x;
    if (funcs.length === 1) return funcs[0];
    // 假如funcs=[div2, mul3, add1]
    //   第一轮: a=div2  b=mul3  返回：x=>div2(mul3(x)) “@1”
    //   第二轮：a=“@1”  b=add1  返回：x=>@1(add1(x))  ===> operate
    // operate(0)
    //   div2(mul3(add1(0))) 
    return funcs.reduce((a, b) => {
        return (...args) => {
            return a(b(...args));
        }
    });
}; 
*/

/* 
// 我自己想出来的
const compose = function compose(...funcs) {
    // EC(COMPOSE)闭包：funcs=[div2, mul3, add1, add1]
    let len = funcs.length;
    if (len === 0) return x => x;
    if (len === 1) return funcs[0];
    return function operate(x) {
        // 第一个函数执行的初始实参值 x=0
        return funcs.reduceRight((x, func) => {
            return func(x);
        }, x);
    };
};
const operate = compose(div2, mul3, add1, add1);
console.log(operate(0)); //3
console.log(operate(2)); //6 
*/
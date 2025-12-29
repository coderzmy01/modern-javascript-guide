/*
 从知识的底层原理/机制上去学习和运用
   + 不仅仅是知识的深入
   + 价值观/格局 打开
   + 优秀的思想和经验
   ====知其然而知其所以然====
 */

/*
 Symbol 创建一个唯一值
   + 给对象设置“唯一值”的属性名
     + 字符串
     + Symbol类型
     + Map新的数据结构：可以允许属性名是对象
   + Symbol.asyncIterator/iterator/hasInstance/toPrimitive/toStringTag...是某些JS知识底层实现的机制
   + 在派发行为标识统一进行管理的时候，可以基于symbol类型的值，保证行为标识的唯一性
   + ...
 */
// let a1 = Symbol('AA');
// let a2 = Symbol('AA');
// let a3 = a1;
// console.log(a1 === a2); //false
// console.log(a1 === a3); //true

/* let key = Symbol('BB');
let obj = {
    n: 10,
    10: 100,
    true: 200,
    [Symbol('AA')]: 300,
    [Symbol('AA')]: 600,
    [key]: 400
};
console.log(obj[Symbol('AA')]); //undefined
console.log(obj[key]); //400 */


/*
 BigInt 大数类型 
    Number.MAX_SAFE_INTEGER  9007199254740991 JS中的最大安全数
    Number.MIN_SAFE_INTEGER  -9007199254740991 最小安全数
    超过安全数后，进行运算或者访问，结果会不准确！！！

 解决方案：
   1. 服务器返回给客户端的大数，按照“字符串”格式返回！
   2. 客户端把其变为 BigInt ，然后按照BigInt进行运算
   3. 最后把运算后的BigInt转换为字符串，在传递给服务器即可
 */
// console.log(BigInt('90071992547409912434234') + BigInt(12345));
// console.log((90071992547409912446579n).toString());


/*
 平时项目中会涉及数据类型的检测
   + typeof 
   + instanceof 
   + constructor
   + Object.prototype.toString.call
   ----
   + Array.isArray()
   + isNaN
   + ...

 typeof检测数据类型
   + 所有的数据类型值，在计算机底层都是按照 “64位” 的二进制值进行存储的！
   + typeof是按照二进制值进行检测类型的
     + 二进制的前三位是零，认为是对象，然后再去看有么有实现call方法，如果实现了，返回 'function'，没有实现，则返回 'object'
     + null是64个零  typeof null -> 'object' 「局限性」
     + ...
   + 检测未被声明的变量，值是'undefined'
 */
// console.log(a); //Uncaught ReferenceError: a is not defined
// console.log(typeof a); //'undefined'

/* // 场景一：检测当前值是否是一个对象
const fn = options => {
    let type = typeof options;
    if (options !== null && (type === "object" || type === "function")) {
        // 是个对象
    }
};
fn({
    x: 10,
    y: 20
});
fn(10); */

/* // 场景二：支持更多的模块导入方案
(function () {
    let utils = {};

    if (typeof window !== "undefined") window.utils = utils;
    if (typeof module === "object" && typeof module.exports === "object") module.exports = utils;
})(); */
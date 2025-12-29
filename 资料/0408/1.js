/* 
@1 十进制转换为二进制的计算 n.toString(2)
    + 整数部分
    + 小数部分
@2 JS使用Number类型表示数字（整数和浮点数），遵循IEEE-754标准 通过64位二进制值来表示一个数字
    https://babbage.cs.qc.cuny.edu/IEEE-754.old/Decimal.html
    第0位：符号位，0表示正数，1表示负数 S
    第1位到第11位「11位指数」：储存指数部分 E
    第12位到第63位「52位尾数」：储存小数部分（即有效数字）F
    注：尾数部分在规约形式下第一位默认为1（省略不写）
@3 最大安全数字「16位」 Number.MAX_SAFE_INTEGER === Math.pow(2,53)-1
@4 怎么解决精度问题？
    + 将数字转成整数「扩大系数」
    + 三方库：Math.js 、decimal.js、big.js ...
*/
// JS中有关于小数(浮点数)的计算会出现精准度丢失的问题
//   + JS中所有值都是以2进制在计算机底层进行存储的{浮点数转为二进制，可能出现无限循环的情况}
//   + 在计算机底层存储的时候，最多存储64位「舍弃了一些值，值本身就失去了精准度」
// 浮点数计算的解决方案：
//   @1 toFixed保留小数点后面N位，他自己会四舍五入
//   @2 扩大系数法
const coefficient = function coefficient(num) {
    num = num + '';
    let [, char = ''] = num.split('.'),
        len = char.length;
    return Math.pow(10, len); //-> 10**len
};
const plus = function plus(num1, num2) {
    num1 = +num1;
    num2 = +num2;
    if (isNaN(num1) || isNaN(num2)) return NaN;
    let max = Math.max(coefficient(num1), coefficient(num2));
    return (num1 * max + num2 * max) / max;
};
console.log(plus(0.1, 0.2));
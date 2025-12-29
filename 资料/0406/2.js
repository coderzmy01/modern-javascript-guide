// let time = new Date();
// console.log(Number(time));
/*
 首先检测 Symbol.toPrimitive 有没有，结果：有，而且是个函数
   time[Symbol.toPrimitive]('number')
*/

// let arr = [10];
// console.log(Number(arr));
/*
 首先 arr[Symbol.toPrimitive] -> undefined
 其次 arr.valueOf() 获取原始值 -> [10] 不是原始值
 再此 arr.toString() 转换为字符串 -> '10'
 最后 再把字符串‘10’转化为数字 -> 10
 */

// let num = new Number(10);
// console.log(Number(num));
/*
 首先 num[Symbol.toPrimitive] -> undefined
 其次 num.valueOf() -> 10
 */

//==================
/*
 parseInt([val],[radix])
   + [val]必须是字符串，如果不是，要先隐式转换为字符串 String([val])
   + [radix]进制
     + 如果不写，或者写零：默认是10（特殊情况：如果字符串是以0x开始的，默认值是16）
     + 有效范围：2~36之间（如果不在这个区间，结果直接是NaN）
   + 从[val]字符串左侧第一个字符开始查找，查找出符合[radix]进制的值(遇到不符合的则结束查找，不论后面是否还有符合的)；把找到的内容，按照[radix]进制，转换为10进制！！
 */
/* console.log(parseInt('10102px13', 2)); //10
// 找到符合二进制的 '1010'
// 把这个二进制的值转换为10进制 “按权展开求和”
// 1*2^3+0*2^2+1*2^1+0*2^0 => 8+0+2+0 => 10 */

// let arr = [27.2, 0, '0013', '14px', 123];
// arr = arr.map(parseInt);
// console.log(arr); //[27, NaN, 1, 1, 27]
/*
 parseInt(27.2,0) -> parseInt('27.2',10)
   '27' 把其当做10进制转换为10进制 => 27
 parseInt(0,1)
    NaN
 parseInt('0013',2)
    '001' 当做2进制转换为10进制
    0*2^2+0*2^1+1*2^0 -> 0+0+1 => 1
 parseInt('14px',3)
    '1' 当做3进制转换为10进制
    1*3^0 -> 1
 parseInt(123,4) -> parseInt('123',4)
    '123' 当做4进制转换为10进制
    1*4^2+2*4^1+3*4^0 -> 16+8+3 => 27
*/
// JS中遇到以0开始“数字”，会默认把其按照8进制转为10进制，然后在进行其他操作
// parseInt(0013,2) 
//   先8转10  0*8^3+0*8^2+1*8^1+3*8^0 -> 0+0+8+3 => 11
// parseInt('11',2)
//   '11'
//   在2转10  1*2^1+1*2^0 -> 2 + 1 -> 3
//===========
// parseInt([val],10)

//=================
/*
 “+” 出现左右“两边”，其中一边是字符串，或者是某些对象：会以字符串拼接的规则处理
 “+” 出现在一个值的左边，转换为数字
 */
// let num = '10';
// console.log(+num); //10

/* let i = '10';
i++; //一定是数学运算
console.log(i); //11

i = '10';
i += 1;
console.log(i); //'101'

i = '10';
i = i + 1;
console.log(i); //'101' */

/* let result = 100 + true + 21.2 + null + undefined + "Tencent" + [] + null + 9 + false;
// NaN+"Tencent" -> "NaNTencent"
// 都是字符串拼接
console.log(result); //"NaNTencentnull9false" */

/* console.log(10 + "10"); //"1010"
console.log(10 + new Number(10)); //20
// new Number(10)[Symbol.toPrimitive] -> undefined
// new Number(10).valueOf() -> 10
// 10+10 => 20
console.log(10 + new Date()); //'10Wed Apr 06 2022 22:01:38 GMT+0800 (中国标准时间)'
// new Date()[Symbol.toPrimitive]('default') -> 'Wed Apr 06 2022 22:01:38 GMT+0800 (中国标准时间)'
console.log(10 + [10]); //'1010'
// [10].toString() -> '10'  => 10+'10'  */

//================
/* 
const fn = (num) => {
    if (num == null) {
        // num是null或者undefined
    }
}; 
*/

// console.log(NaN == NaN);//false
// console.log(Object.is(NaN, NaN)); //true

/* //==========
console.log([] == false); //都转换为数字  0==0  => true
console.log(![] == false); //先处理 ![]=>false  false==false => true */


//==============
/* let num = 10;
console.log(num.toFixed(2)); //10.00
// num是原始值，不是对象，按常理来讲，是不能做“成员访问”
// 默认装箱操作：new Number(num) 变为非标准特殊对象，这样就可以调用toFixed了 */

/* let num = new Number(10);
console.log(num + 10); //20
// 在操作的过程中，浏览器会把num这个非标准特殊对象变为原始值「Symbol.toPrimitive->valueOf...」,这个操作叫做拆箱 */
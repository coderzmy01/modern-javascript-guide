/* 
1.数字类型转换
1.1.Number()
1.2.parseInt()
1.3.parseFloat()
1.4 隐式转换
*/
// isNaN
// console.log(isNaN("12"));
// console.log(isNaN("12px"));
// console.log(isNaN(NaN));
// console.log(isNaN(undefined));
// console.log(isNaN(""));
// console.log(isNaN(true));
// Number()的转换规则：
/* 
1. 如果参数是数字，则返回该数字
2. 如果参数是字符串，返回字符串对应的数字，如果出现非有效字符，则返回NaN
3. 如果参数是布尔值，则返回1或者0
4. 如果参数是null，返回0
5. 如果参数是undefined，返回NaN
*/
// console.log(Number("12"));

// 对象转成数字规则
/* 
1.如果有 Symbol.toPrimitive() 方法，则调用该方法，返回对应的原始值
2.如果有 valueOf() 方法，则调用该方法，返回对应的原始值
3.如果有 toString() 方法，则调用该方法，返回对应的原始值
*/
// console.log(new Date());
// console.log(Number(new Date()));
// // console.log(Number(Symbol()));
// console.log(Number([1]));

/* 
parseInt()
*/
// const arr = [1, 2, 3];
// arr.map((m, n) => parseInt(m, n + 2)).forEach(console.log);

/* 2.字符串类型转换 
基本类型转换
对象类型转换
*/
// console.log(String([1, 35, , 5454]));
// console.log(String(new Date()));
// console.log(String(new RegExp()));
// console.log(String({}));

// + 转换
console.log(1 + new Date());
console.log(10 + [10]);
console.log(10 + [10, 29]);

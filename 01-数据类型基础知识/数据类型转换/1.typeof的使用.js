// // 1. typeof 基础语法
// console.log(typeof NaN);
// console.log(typeof Infinity);
// console.log(typeof -Infinity);

// console.log(typeof null); // object
// console.log(typeof undefined);

// console.log(typeof Symbol("xx"));
// console.log(typeof 123n);

// 2. typeof 检测对象类型
console.log(typeof {});
console.log(typeof []);
console.log(typeof function () {});
console.log(typeof new Date());
console.log(typeof new RegExp());
console.log(typeof new Error());
console.log(typeof new Map());
console.log(typeof new Set());
console.log(typeof new String());

// 3. typeof 判断是不是对象
const isPlainObject = (value) =>
  value !== null && typeof value === "object" && value.constructor === Object;
// 4. typeof 检测环境
console.log(typeof window === "object" && typeof document === "object");

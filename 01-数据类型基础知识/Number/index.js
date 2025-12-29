// console.log(isNaN(1));
// console.log(isNaN(NaN));
// console.log(isNaN(Infinity));
// // 字符串
// console.log(isNaN('AA'));
// console.log(isNaN('12.5'));
// console.log(isNaN('12.5a'));
// // 数组
// console.log(isNaN([]));
// console.log(isNaN([10]));
// console.log(isNaN([10, 20]));
// // 对象
// console.log(isNaN({}));
// console.log(isNaN({ a: 1 }));
// // null
// console.log(isNaN(null));
// // undefined
// console.log(isNaN(undefined));
// // 布尔
// console.log(isNaN(true));
// // Symbol
// // console.log(isNaN(Symbol(1)))

// // 1. 数组转数字过程
// /*
// 1. 先将数组转成字符串，再转成数字
// */
// const a = 1 + [];
// console.log(+[]);
// console.log(+[1, 3, 4]);
// // 2. 函数转成数字
// console.log(+function () {});

// // parseInt 和 parseFloat；
// console.log(Number('12px'));
// console.log(parseInt('12px'));
// console.log(parseInt('12.5px'));
// console.log(parseInt('width:12.5px'));
// console.log(parseFloat('12px'));
// console.log(parseFloat('12.5px'));
// // 与Number处理的区别；
// console.log(parseInt(NaN));
// console.log(Number(null));
// console.log(parseInt(null));

const plus = (a, b) => {
  const aDecimal = (a.toString().split('.')[1] || '').length;
  const bDecimal = (b.toString().split('.')[1] || '').length;
  const decimal = Math.max(aDecimal, bDecimal);
  return (a * Math.pow(10, decimal) + b * Math.pow(10, decimal)) / Math.pow(10, decimal);
};
// 基础小数加法测试
// console.log(plus(0.1, 0.2)); // 期望输出: 0.3
// console.log(plus(0.2, 0.4)); // 期望输出: 0.6
// console.log(plus(1.5, 2.25)); // 期望输出: 3.75
// console.log(plus(0.1, 0.3)); // 期望输出: 0.4
// console.log(plus(0.01, 0.05)); // 期望输出: 0.06
// 整数加法测试
console.log(plus(1, 2)); // 期望输出: 3
console.log(plus(10, 20)); // 期望输出: 30
console.log(plus(0, 0)); // 期望输出: 0

// 不同精度小数测试
console.log(plus(1.11, 2.222)); // 期望输出: 3.332
console.log(plus(1.111, 2.22)); // 期望输出: 3.331
console.log(plus(1.123456, 2.789)); // 期望输出: 3.912456

// 零小数测试
console.log(plus(1.0, 2.0)); // 期望输出: 3
console.log(plus(0.0, 5.5)); // 期望输出: 5.5

console.log(isNaN(1))
console.log(isNaN(NaN))
console.log(isNaN(Infinity))
// 字符串
console.log(isNaN('AA'))
console.log(isNaN('12.5'))
console.log(isNaN('12.5a'))
// 数组
console.log(isNaN([]))
console.log(isNaN([10]))
console.log(isNaN([10,20]))
// 对象
console.log(isNaN({}))
console.log(isNaN({a:1}))
// null
console.log(isNaN(null))
// undefined
console.log(isNaN(undefined))
// 布尔
console.log(isNaN(true))
// Symbol
// console.log(isNaN(Symbol(1)))

// 1. 数组转数字过程
/* 
1. 先将数组转成字符串，再转成数字
*/
const a =1+ [];
console.log(+[])
console.log(+[1,3,4])
// 2. 函数转成数字
console.log(+function(){})


// parseInt 和 parseFloat；
console.log(Number('12px'))
console.log(parseInt('12px'))
console.log(parseInt('12.5px'))
console.log(parseInt('width:12.5px'))
console.log(parseFloat('12px'))
console.log(parseFloat('12.5px'))
// 与Number处理的区别；
console.log(parseInt(NaN))
console.log(Number(null))
console.log(parseInt(null))
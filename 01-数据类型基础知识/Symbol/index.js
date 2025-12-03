const symbol1 = Symbol("1");
const symbol2 = Symbol("2");
console.log(symbol1 === symbol2);

// 1.作为唯一属性的键
let mySymbol = Symbol("xxx");
let a = {};
a[mySymbol] = "Hello!";
a[Symbol("xxx")] = "World!";

console.log(a[mySymbol]);

// 2.定义对象的属性名
let s = Symbol("foo");
let obj = {
  [s]: "bar",
};
console.log(obj[s]);

// 3.定义函数参数
function getValue(...args) {
  let sym = Symbol.for("foo");
}

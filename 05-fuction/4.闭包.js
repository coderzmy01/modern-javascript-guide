// (function fn() {
//   console.log('xx');
// })();
// console.log(fn);
// var b = 10;
// (function b() {
//   b = 20;
//   console.log(b);
// })();
// console.log(b);
// let x = 5;
// const fn = function fn(x) {
//   return function (y) {
//     console.log(y + ++x);
//   };
// };
// let f = fn(6);
// f(7);
// fn(8)(9);
// f(10);
// console.log(x);

let a = 0,
  b = 0;
let A = function (a) {
  A = function (b) {
    console.log(a + b++);
  };
  console.log(a++);
};
A(1);
A(2);

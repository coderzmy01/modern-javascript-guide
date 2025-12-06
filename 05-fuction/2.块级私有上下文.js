// console.log(foo); //undefined
// if (1 == 1) {
//   console.log(foo); //fn
//   function foo() {
//     console.log('hello world');
//   }
//   foo = 1;
//   console.log(foo); //1
// }
// console.log(foo); //undefined

// debugger;
// console.log(foo); // undefined

// if (true) {
//   console.log(foo); // ƒ foo() {}

//   function foo() {
//     return 'first';
//   }

//   foo = 1;
//   console.log(foo); // 1

//   // 第二个function声明不会触发同步！
//   function foo() {
//     return 'second';
//   }

//   console.log(foo); // ƒ foo() { return 'second'; }
// }

// console.log(foo); // ƒ foo() { return 'first'; }
// 注意：同步的是第一个函数声明时的值！

console.log(foo); // undefined
if (true) {
  console.log(foo); // undefined（）
  if (true) {
    console.log(foo); // ƒ foo() {}（继承外层块级）
    function foo() {
      return 'inner';
    }
    // 同步给上一级块级作用域，不是全局！
    foo = 'modified';
  }
  console.log(foo); // f foo(){}
}

console.log(foo); // f foo(){}

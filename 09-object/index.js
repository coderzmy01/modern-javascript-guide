// Function.prototype.defer = function (delay) {
//   let fn = this;
//   return function (...args) {
//     setTimeout(() => {
//       fn.apply(this, args);
//     }, delay);
//   };
// };

// let obj = {
//   name: "coderwhy",
//   fn() {
//     console.log(this.name);
//   },
// };

// function f() {
//   console.log("Hello!");
// }
// // f.defer(1000)(); // shows "Hello!" after 1 second
// obj.fn = obj.fn.defer(1000);
// obj.fn();

// create创建一个原型为xx的对象
// function Animal(name, age) {
//   this.age = age;
//   this.name = name;
//   this.run = () => {
//     console.log("run run run");
//   };
// }
// Animal.prototype.name = "aaa";
// Animal.prototype.age = 12;
// Animal.prototype.run = function () {
//   console.log(this);
//   console.log(this.name + "run");
// };
// Animal.prototype.jump = () => {
//   console.log(this);
//   console.log(this.name + "jump");
// };

// let rabbit = Object.create(Animal.prototype);
// // console.log(Object.getPrototypeOf(rabbit) === Animal.prototype);
// console.log(rabbit.name);
// console.log(rabbit.age);
// rabbit.run();
// rabbit.jump();

// let dictionary = Object.create(null);

// // your code to add dictionary.toString method
// Object.defineProperty(dictionary, "toString", {
//   enumerable: false,
//   value() {
//     return Object.keys(this).join("<");
//   },
// });

// // add some data
// dictionary.apple = "Apple";
// dictionary.__proto__ = "test"; // __proto__ is a regular property key here

// // only apple and __proto__ are in the loop
// for (let key in dictionary) {
//   alert(key); // "apple", then "__proto__"
// }

// // your toString in action
// alert(dictionary); // "apple,__proto__"

// function Rabbit(name) {
//   this.name = name;
// }
// Rabbit.prototype.sayHi = function () {
//   alert(this.name);
// };

// let rabbit = new Rabbit("Rabbit");

// rabbit.sayHi();
// Rabbit.prototype.sayHi();
// Object.getPrototypeOf(rabbit).sayHi();
// rabbit.__proto__.sayHi();

class User {
  constructor(params) {
    this.name = params;
  }
  sayHi() {}
}
// console.log(typeof User);
// console.log(User === User.prototype.constructor);
// console.log(User.prototype.sayHi);
// console.log(Object.getOwnPropertyNames(User.prototype));

// function User2(params) {
//   this.name = params;
// }
// User2.prototype.sayHi = function () {
//   console.log(this.name);
// };
// let user = new User("name");

/* 
与普通函数区别：
1. 内部属性：[[IsClassConstructor]]
2. 

*/
// 1. 必须与new关键字一起用;
// User();
// 2. string 表现: class开头;
// console.log(User);
// 3. class 声明的属性都是不可枚举的
// const u1 = new User("coderwhy");
// const u2 = new User2("coderzmy");
// for (const key in u1) {
//   const element = u1[key];
//   console.log(element);
// }
// for (const key in u2) {
//   const element = u2[key];
//   console.log(element);
// }

// 具名class
// let user = class User2 {
//   constructor(params) {
//     console.log(User2);
//   }
// };
// const u1 = new user();
// 动态创建class
// function makeClass() {
//   return class {
//     sayHi() {
//       console.log("hello");
//     }
//   };
// }
// const user2 = makeClass();
// new user2().sayHi();

// class中的this绑定
class Button {
  constructor(name) {
    this.name = name;
  }
  click() {
    console.log(this.name + "clicked!");
  }
}
const btn = new Button("btn10");
setTimeout(() => {
  btn.click();
});

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

function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype.sayHi = function () {
  alert(this.name);
};

let rabbit = new Rabbit("Rabbit");

rabbit.sayHi();
Rabbit.prototype.sayHi();
Object.getPrototypeOf(rabbit).sayHi();
rabbit.__proto__.sayHi();

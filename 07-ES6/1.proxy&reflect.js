// const proxy = new Proxy(
//   {},
//   {
//     get(target, key, receiver) {
//       console.log(`getting ${key}`);
//       return 35;
//     },
//   }
// );
// let obj = Object.create(proxy);
// console.log(obj.time);

// 同一个拦截器函数，可以设置拦截多个操作。
// const handler = {
//   get(target, key, receiver) {
//     // console.log(`getting ${key}`);
//     // return Reflect.get(target,key,receiver);
//     if (key === "prototype") {
//       return Object.prototype;
//     }
//     return "hello";
//   },
//   apply(target, thisArg, argumentsList) {
//     return argumentsList[0];
//   },
//   construct(target, argumentsList) {
//     return { value: 42 };
//   },
// };
// const fn = new Proxy(function (x) {
//   return x;
// }, handler);
// console.log(fn(3, 4));
// console.log(new fn(1));
// console.log(fn.prototype === Object.prototype);
// console.log(fn.x);

// 拦截对象属性的读取。
// const handler = {
//   get(target, key) {
//     if (key in target) {
//       return target[key];
//     } else {
//       throw new ReferenceError(`Property "${key}" does not exist.`);
//     }
//   },
// };
// const obj = new Proxy(
//   {
//     a: 1,
//   },
//   handler
// );
// console.log(obj.a);
// console.log(obj.b);

// 实现数组读取负数的索引
// const createArray = (...args) => {
//   const arr = [];
//   let handler = {
//     get(target, key) {
//       let index = Number(key);
//       if (index < 0) {
//         index = target.length + index;
//       }
//       return target[index];
//     },
//   };
//   arr.push(...args);
//   return new Proxy(arr, handler);
// };
// const a = createArray("x", "xss", "sss");
// console.log(a[-1]);
// 属性名链式调用
// const pipe = (value) => {
//   let fnArr = [];
//   const oProxy = new Proxy(
//     {},
//     {
//       get(target, key) {
//         if (key === "get") {
//           return fnArr.reduce((val, fn) => {
//             return fn(val);
//           }, value);
//         }
//         fnArr.push(window[key]);
//         return oProxy;
//       },
//     }
//   );
//   return oProxy;
// };
// var double = (x) => x * 2;
// var pow = (n) => Math.pow(n, n);
// console.log(pipe(3).double.pow.get);

// dom通用函数的实现
// const dom = new Proxy(
//   {},
//   {
//     get(target, key) {
//       return (property, ...children) => {
//         const el = document.createElement(key);
//         for (let key of Object.keys(property)) {
//           el.setAttribute(key, property[key]);
//         }
//         for (const child of children) {
//           if (typeof child === "string") {
//             el.appendChild(document.createTextNode(child));
//           } else {
//             el.appendChild(child);
//           }
//         }
//         return el;
//       };
//     },
//   }
// );

// const el = dom.div(
//   {},
//   "Hello, my name is ",
//   dom.a({ href: "//example.com" }, "Mark"),
//   ". I like:",
//   dom.ul(
//     {},
//     dom.li({}, "The web"),
//     dom.li({}, "Food"),
//     dom.li({}, "…actually that's it")
//   )
// );
// document.body.appendChild(el);
// const a = {
//   name: "ss",
//   age: 19,
// };
// console.log(Object.getOwnPropertyDescriptor(a, "name"));
// Object.defineProperty(a, "name", {
//   value: "friend",
//   enumerable: false,
// });
// console.log(Object.getOwnPropertyDescriptor(a, "name"));
// for (const key in a) {
//   if (!Object.hasOwn(a, key)) continue;

//   const element = a[key];
//   console.log(element);
// }
// reflect


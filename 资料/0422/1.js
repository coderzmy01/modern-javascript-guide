/* 
function C1(name) {
    if (name) {
        this.name = name;
    }
}
function C2(name) {
    this.name = name;
}
function C3(name) {
    this.name = name || 'join';
}
C1.prototype.name = 'Tom';
C2.prototype.name = 'Tom';
C3.prototype.name = 'Tom';
alert(
    (new C1().name) +
    (new C2().name) +
    (new C3().name)
);
// "Tomundefinedjoin" 
*/

/* function Foo() {
    getName = function () {
        console.log(1);
    };
    return this;
}
Foo.getName = function () {
    console.log(2);
};
Foo.prototype.getName = function () {
    console.log(3);
};
var getName = function () {
    console.log(4);
};
function getName() {
    console.log(5);
}
Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName(); */


/* 
 鸭子类型「鸭子辨型」
   + 类数组
   + 类promise
   + ...
 
 类数组的结构和数组类似，但是不是数组「不是Array的实例」，所以无法直接使用Array.prototype原型上的方法，如果想用该如何处理：
   + 把类数组转换为数组
   + 直接借用
     + 基于改变THIS
     + 赋值为私有属性
   + 修改原型指向
   ...
 */
let obj = {
    0: 10,
    1: 20,
    2: 30,
    length: 3
};
// obj.push(100); //Uncaught TypeError: obj.push is not a function

/* 4.修改类数组的原型指向 */
// Object.setPrototypeOf(obj, Array.prototype); //obj.__proto__===Array.prototype IE中只兼容IE11
// obj.push(100);
// console.log(obj);

/* 3.赋值为私有属性 */
/*
Array.prototype.push = function push(val) {
    this[this.length] = val;
    this.length++;
    return this.length;
};
*/
/* let obj = {
    2: 3, //1
    3: 4, //2
    length: 2, //3 4
    push: Array.prototype.push
};
obj.push(1); //this->obj val->1
// obj[obj.length] = 1; => obj[2]=1;
// obj.length++;
obj.push(2);//this->obj val->2
// obj[obj.length] = 2; => obj[3]=2;
// obj.length++;
console.log(obj); */

/* 2.借用数组原型上方法实现对类数组的操作*/
// [].forEach.call(obj, (item, index) => {
//     console.log(item, index);
// });

/* 1.把类数组转换为数组 */
// let arr = Array.from(obj); //不兼容IE
// console.log(arr);

// let arr = [...obj]; //Uncaught TypeError: obj is not iterable 具备迭代器规范的类数组(例如:arguments)可以只用这种方式
// console.log(arr);

// let arr = Array.prototype.slice.call(obj);
// arr = [].slice.call(obj);
// console.log(arr);

/* 
// ====> 之所以可以借用，是因为类数组的结构和数组几乎一样，那么操作数组的相关方法（尤其是代码），同样也适合于操作类数组，此时我们只要把方法执行，让方法中的this改变为类数组，这样就相当于直接操作的是类数组 => “借用数组原型上方法实现对类数组的操作”
// 把类数组obj转数组
// let arr = [];
// for (let i = 0; i < obj.length; i++) {
//     arr.push(obj[i]);
// }
// console.log(arr);

// 重写Array.prototype.slice，实现数组克隆
Array.prototype.slice = function slice() {
    // this:arr
    let result = [];
    for (let i = 0; i < this.length; i++) {
        result.push(this[i]);
    }
    return result;
};
let arr = [10, 20, 30];
let arr2 = arr.slice();
console.log(arr2, arr2 === arr); 
*/
/* 
function Fn(x, y) {
    let sum = 10;
    this.total = x + y;
    this.say = function () {
        console.log(`我计算的和是:${this.total}`);
    };
}
let res = Fn(10, 20); //普通函数执行
let f1 = new Fn(10, 20); //构造函数执行
let f2 = new Fn;
console.log(f1.sum);
console.log(f1.total);
console.log(f1.say === f2.say); 
*/

/* function Fn() {
    this.x = 100;
    this.y = 200;
    this.getX = function () {
        console.log(this.x);
    }
}
Fn.prototype.getX = function () {
    console.log(this.x);
};
Fn.prototype.getY = function () {
    console.log(this.y);
};
let f1 = new Fn;
let f2 = new Fn;
console.log(f1.getX === f2.getX);
console.log(f1.getY === f2.getY);
console.log(f1.__proto__.getY === Fn.prototype.getY);
console.log(f1.__proto__.getX === f2.getX);
console.log(f1.getX === Fn.prototype.getX);
console.log(f1.constructor);
console.log(Fn.prototype.__proto__.constructor);
f1.getX();
f1.__proto__.getX();
f2.getY();
Fn.prototype.getY(); */

function Dog(name) {
    this.name = name;
}
Dog.prototype.bark = function () {
    console.log('wangwang');
}
Dog.prototype.sayName = function () {
    console.log('my name is ' + this.name);
}
/* 
let sanmao = new Dog('三毛');
sanmao.sayName();
sanmao.bark(); 
*/

/* function _new(ctor, ...params) {
    // ctor:Dog  params:['三毛']
    // @1 创建一个空实例对象  对象.__proto__===ctor.prototype
    let obj = {};
    obj.__proto__ = ctor.prototype;

    // @2 像普通函数一样执行，但是需要让函数中的this指向创建的实例对象（实参值也要传递进去）
    let result = ctor.call(obj, ...params);

    // @3 监听方法执行的返回值，如果返回的是原始值类型，则把创建的实例返回...
    if (result !== null && /^(object|function)$/.test(typeof result)) return result;
    return obj;
} */

function _new(ctor, ...params) {
    let obj, result;
    if (!ctor.prototype || ctor === Symbol || ctor === BigInt) throw new TypeError('ctor is not a constructor');
    obj = Object.create(ctor.prototype);
    result = ctor.call(obj, ...params);
    if (result !== null && /^(object|function)$/.test(typeof result)) return result;
    return obj;
}
let sanmao = _new(Dog, '三毛');
sanmao.bark(); //=>"wangwang"
sanmao.sayName(); //=>"my name is 三毛"
console.log(sanmao instanceof Dog); //=>true
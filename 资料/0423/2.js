const class2type = {};
const toString = class2type.toString; //Object.prototype.toString  检测数据类型的
const hasOwn = class2type.hasOwnProperty; //Object.prototype.hasOwnProperty 检测是否为私有属性

// 检测数据类型的通用方法:返回所属类型的字符串
const toType = function toType(obj) {
    let reg = /^\[object ([\w\W]+)\]$/;
    if (obj == null) return obj + "";
    return typeof obj === "object" || typeof obj === "function" ?
        reg.exec(toString.call(obj))[1].toLowerCase() :
        typeof obj;
};

// 检测是否为函数
const isFunction = function isFunction(obj) {
    return typeof obj === "function" &&
        typeof obj.nodeType !== "number" &&
        typeof obj.item !== "function";
};

// 检测是否为window对象
const isWindow = function isWindow(obj) {
    return obj != null && obj === obj.window;
};

// 检测是否为数组或者类数组
const isArrayLike = function isArrayLike(obj) {
    let length = !!obj && "length" in obj && obj.length,
        type = toType(obj);
    if (isFunction(obj) || isWindow(obj)) return false;
    return type === "array" || length === 0 ||
        typeof length === "number" && length > 0 && (length - 1) in obj;
};

// 检测是否为“纯粹对象/标准普通”对象:obj.__proto__===Object.prototype
const isPlainObject = function isPlainObject(obj) {
    let proto, Ctor;
    if (!obj || toString.call(obj) !== "[object Object]") return false;
    proto = Object.getPrototypeOf(obj);
    if (!proto) return true; //匹配 Object.create(null)
    Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
    return typeof Ctor === "function" && Ctor === Object;
};

// 检测是否为空对象
const isEmptyObject = function isEmptyObject(obj) {
    let keys = Object.getOwnPropertyNames(obj);
    if (typeof Symbol !== "undefined") keys = keys.concat(Object.getOwnPropertySymbols(obj));
    return keys.length === 0;
};

// 检测是否为有效数字:支持数字字符串
const isNumeric = function isNumeric(obj) {
    var type = toType(obj);
    return (type === "number" || type === "string") &&
        !isNaN(obj - parseFloat(obj));
};


/* Object.prototype.AA = 100;
let obj = {
    0: 10,
    name: 'xxx',
    [Symbol('@1')]: 200,
    1: 20
};
Object.defineProperty(obj, 'age', {
    enumerable: false,
    value: 13
}); */
/*
 for in 循环非常“恶心”，项目中尽可能不用它
   + 优先迭代数字属性，按照从小到大「对象本身的特征，我们解决不了这个问题」 
   + 会迭代“私有”以及“原型链上(公有)”所有“可枚举”的属性：它的循环会去原型链上找，非常消耗性能
     for (let key in obj) {
        if (!obj.hasOwnProperty(key)) break;
        console.log(key); //都是私有属性
     }
   + 只能迭代“可枚举”的属性，不可枚举的拿不到
   + 不能迭代“Symbol类型”的属性
   + ... 

  如果迭代对象中的每一项，我们可以先获取所有"私有"属性，再依次迭代
    + Object.keys(obj) 获取对象 “非Symbol类型”、“可枚举的”、“私有属性” 「结果:包含属性名的数组」
    + Object.getOwnPropertyNames(obj) 获取对象 “非Symbol类型”、“私有属性”，不论是否是可枚举的
    + Object.getOwnPropertySymbols(obj) 获取对象 “Symbol类型”、“私有属性”，不论是否是可枚举的
    ----
    我们想获取所有的私有属性：
      let keys = Object.getOwnPropertyNames(obj);
      if (typeof Symbol !== "undefined") keys = keys.concat(Object.getOwnPropertySymbols(obj));
    ----
    Reflect.ownKeys(obj) ES6中新增Reflect对象，其中ownKeys就是获取obj所有私有属性，不论类型或者是否可枚举
 */
/* let keys = Object.getOwnPropertyNames(obj);
if (typeof Symbol !== "undefined") keys = keys.concat(Object.getOwnPropertySymbols(obj)); */

/* let keys = Reflect.ownKeys(obj);
console.log(keys); */
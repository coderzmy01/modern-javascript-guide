/*
 JS中检测数据类型：
   1. typeof [value]
     + 底层机制：按照数据在计算机底层存储的“二进制”值进行检测，效率比较快
     + 局限性：
       + typeof null -> "object"   null的二进制值是64个零，而typeof认为前三位是零的都是object
       + typeof 除了能够区分函数对象，其余对象无法细分
         + typeof 函数 -> "function"
         + typeof [] -> "object"
         + typeof /^\d+$/ -> "object"
         + ...
     应用场景：检测除null以外的其他原始值类型、笼统的检测是否为对象
       if(obj!==null && /^(object|function)$/.test(typeof obj)){
           //obj是一个对象类型
       }

   2. instanceof 本意是检测某个实例是否属于这个类，“临时”拉来检测数据类型，可以用于“细分对象”
     + 无法处理原始值类型，返回结果都是false
       1 instanceof Number -> false
       new Number(1) instanceof Number -> true
     + 任何对象基于 instanceof 检测是否为Object实例，结果都是true，所以无法区分是否为“标准普通对象「纯粹对象」”
       arr instanceof Array -> true
       arr instanceof Object -> true
       obj instanceof Object -> true
     + 底层机制：
       实例 instanceof 构造函数
       @1 先检测 构造函数 是否拥有 Symbol.hasInstance 方法「ES6+之后，Function.prototype设置了Symbol.hasInstance这个方法，所以函数都具备这个属性」;
       如果有这个方法：构造函数[Symbol.hasInstance](实例) 返回的值就是我们要的结果!
         + 我们正常情况下重写是无效的 -> Array[Symbol.hasInstance]=function(){...}
         + 但是基于class创建的自定义类，可以重写其Symbol.hasInstance方法
       @2 如果没有这个方法，则按照原型链进行查找：按照实例的__proto__一直向上找，直到找到Object.prototype为止，只要在原型链上出现了 “构造函数.prototype”，说明当前实例率属于它，结果返回true；如果没找到，结果就是false；

     总结：基于instanceof检测数据类型，其实“不是很靠谱”；
       + 无法检测原始值类型
       + 无法区分是否为“标准普通对象”
       + 一但原型链被重构，检测的结果是不准确
       + ...
     真实项目中，偶尔用于初步检测是否为特殊对象，例如：检测是否为正则、日期对象等...

   3. constructor
      if(对象.constructor === 构造函数){...}
      + 不准确：因为constructor可以被“肆意”重写
      + 相当于instanceof来讲，可以检测原始值类型，也可以判断是否为“标准普通对象”
        let arr=[],
            obj={},
            num=10;
        arr.constructor -> Array
        obj.constructor -> Object
        num.constructor -> Number

   4. Object.prototype.toString.call([value])
     + 内置构造函数的原型对象上，基本上都有toString这个方法，基本都是用来把值转换为字符串的，除Object.prototype.toString外，它是用来检测数据类型的；
     + 只需要把Object.prototype.toString执行，方法中的this是谁，就是检测谁的数据类型
       + 返回结果 “[object ?]”
       + ?一般是自己所属的构造函数
       + 首先会看[value]值是否有 Symbol.toStringTag 属性，有这个属性，属性值是啥，检测出来的?就是啥；如果没有这个属性，才一般是按照自己所属的构造函数返回！！
         具备这个属性的值
         + Math[Symbol.toStringTag]:'Math'
         + Promise.prototype[Symbol.toStringTag]:'Promise'
         + Generator函数原型链上有
         + Set.prototype[Symbol.toStringTag]:'Set'
         + Set.prototype[Symbol.toStringTag]:'Map'
         + ...
     + 优势：基本上属于检测最准确、最全面的方式了，能够区分null、能够检测原始值类型、能够细分对象、即便重构原型对象检测也是准确的...
     + 弊端：写起来比较长
     let obj={}; //obj.__proto__===Object.prototype
     obj.toString(); //=>'[object Object]'
   ----
   isNaN([value]):检测是否为有效数字
   Array.isArray([value]):检测是否为数组
   ...
 */

//=================================
/*
let toString = Object.prototype.toString;
class Fn {

}
Fn.prototype[Symbol.toStringTag] = 'Fn';
let f = new Fn;
console.log(toString.call(f)); //“[object Fn]”  不设置之前是 “[object Object]”
*/


//=================================
/* 
 instance_of：对内置instanceof的重写
   @params
     obj:要检测的实例
     ctor:要检测的构造函数/类
   @return
     boolean
 */
/* var instance_of = function instance_of(obj, ctor) {
    // 检测值类型的校验：校验ctor的格式
    if (ctor === null || !/^(object|function)$/.test(typeof ctor)) throw new TypeError('Right-hand side of instanceof is not an object');
    if (typeof ctor !== 'function') throw new TypeError('Right-hand side of instanceof is not callable');
    if (!ctor.prototype) throw new TypeError('Function has non-object prototype undefined in instanceof check');
    // 检测值类型的校验：不支持原始值类型
    if (obj === null || !/^(object|function)$/.test(typeof obj)) return false;
    // 首先检测ctor是否拥有Symbol.hasInstance方法
    if (typeof Symbol !== "undefined") {
        var hasInstance = ctor[Symbol.hasInstance];
        if (typeof hasInstance === "function") {
            return hasInstance.call(ctor, obj); //=> ctor[Symbol.hasInstance](obj);
        }
    }
    // 按照原型链进行查找，看是否会出现ctor.prototype
    var proto = Object.getPrototypeOf(obj);
    while (proto) {
        if (proto === ctor.prototype) return true;
        proto = Object.getPrototypeOf(proto);
    }
    return false;
};
var arr = [10, 20];
console.log(instance_of(arr, Array)); //true
console.log(instance_of(arr, RegExp)); //false
console.log(instance_of(arr, Object)); //true */


/* class Fn {
    constructor(name) {
        if (name) {
            this.name = name;
        }
    }
    sayName() {
        console.log(this.name);
    }
    // 静态私有属性方法
    static [Symbol.hasInstance](obj) {
        return obj.hasOwnProperty('name');
    }
}
let f1 = new Fn('珠峰');
console.log(f1 instanceof Fn, f1);  //=>Fn[Symbol.hasInstance](f1)

let f2 = new Fn;
console.log(f2 instanceof Fn, f2); //=>Fn[Symbol.hasInstance](f2) */

/* 
let arr = [10, 20];
Array[Symbol.hasInstance] = function (arr) {
    return false;
};
console.log(arr instanceof Array);
// console.log(Array[Symbol.hasInstance](arr)); 
*/

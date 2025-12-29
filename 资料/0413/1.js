/* 
const fn = function fn(...params) {
    // params:[1,2]
    return function anonymous(...args) {
        // args:[3]
        return params.concat(args).reduce((res, item) => res + item);
    };
}; 
*/
/* 
const fn = (...params) => (...args) => params.concat(args).reduce((res, item) => res + item);
let res = fn(1, 2)(3);
console.log(res); //=>6  1+2+3  
*/

/* // curring:柯理化函数
// 它是一种思想，一种“预先存储”的思想，也是闭包的进阶应用「保存」：我们让函数执行产生闭包，把一些后续要用到的值，存储到闭包的某个私有变量中，那么其下级上下文想用的时候直接拿来用即可！！
const curring = function curring() {
    // EC(CURRING)会产生闭包
    let params = [];
    const add = (...args) => {
        // 把每次执行add函数传递的实参值，都存储到闭包的params中
        params = params.concat(args);
        return add;
    };
    // 在把对象转换为数字的时候，我们对params进行求和即可
    add[Symbol.toPrimitive] = () => {
        return params.reduce((res, item) => res + item);
    };
    return add;
};
let add = curring();
let res = add(1)(2)(3);
console.log(+res); //->6  把res(add函数)转换为数字会经历:Symbol.toPrimitive->valueOf->toString...

add = curring();
res = add(1, 2, 3)(4);
console.log(+res); //->10

add = curring();
res = add(1)(2)(3)(4)(5);
console.log(+res); //->15 */



/* 数组求和 https://caniuse.com/ */
// let arr = [1, 2, 3, 4];

/* let total = arr.reduce((res, item, index) => {
    // 第一次: res=100  item=1  index=0  从数组第一项开始迭代  返回:101
    // ...
    return res + item;
}, 100);
console.log(total); */

/* // reduce:迭代/循环数组中的每一项，每一次迭代都会触发回调函数执行，但是此方法可以实现每次处理结果的累计
let total = arr.reduce((res, item, index) => {
    // 第一次: res=1  item=2  index=1  从数组第二项开始迭代  返回:3
    // 第二次: res=3(上一次迭代处理的结果) item=3 index=2  返回:6
    // 第三次: res=6  item=4  index=3  返回:10  迭代完成，把最后一次返回的值，当做reduce最后的返回值
    return res + item;
});
console.log(total); */

/* 
let total = 0;
arr.forEach(item => {
    total += item;
});
console.log(total); 
*/

/* 
arr.join('+') //'1+2+3+4'
eval('1+2+3+4') //10  eval可以把字符串变为JS表达式去执行 
//-----
console.log(eval(arr.join('+')));
*/
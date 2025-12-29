let arr = [
    [1, 2, 2],
    [3, 4, 5, 5],
    [6, 7, 8, 9, [11, 12, [12, 13, [14]]]],
    10
];

/* 方案4：基于递归实现 */
Object.defineProperty(Array.prototype, 'myFlat', {
    writable: true,
    configurable: true,
    enumerable: false,
    value: function myFlat() {
        var result = [];
        var next = function next(arr) {
            arr.forEach(function (item) {
                if (Array.isArray(item)) {
                    next(item);
                    return;
                }
                result.push(item);
            });
        };
        next(this);
        return result;
    }
});
var flatArr = arr.myFlat();
console.log(flatArr);

/* 方案1：基于ES10中新增的flat实现扁平化处理 */
// let flatArr = arr.flat(Infinity);
// console.log(flatArr);

/* 方案2：基于concat方式进行逐级降维 */
/* while (
    arr.some(function (item) {
        return Array.isArray(item);
    })
) {
    // arr = [].concat(...arr);
    arr = [].concat.apply([], arr);
}
console.log(arr); */

/* 方案3：执行toString变为字符串的时候就已经扁平化了「不适合某一项是对象，因为对象会变为“[object Object]”」 */
/* arr = arr.toString().split(',').map(function (item) {
    return +item;
});
console.log(arr); */
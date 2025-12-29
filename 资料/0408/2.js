// 利用==比较会转换数据类型，而对象转数字会经历一个详细步骤「Symbol.toPrimitive->valueOf->toString...」
/* 
var a = {
    i: 0,
    [Symbol.toPrimitive]() {
        // this->a
        return ++this.i;
    }
};
if (a == 1 && a == 2 && a == 3) {
    console.log('OK');
} 
*/
/* 
var a = [1, 2, 3];
a.toString = a.shift;
if (a == 1 && a == 2 && a == 3) {
    console.log('OK');
} 
*/

/* 
// 全局上下文中，获取a的值：首先看VO(G)中有没有，没有再继续去GO(window)中查找
var i = 0;
Object.defineProperty(window, 'a', {
    get() {
        return ++i;
    }
});
if (a === 1 && a === 2 && a === 3) {
    console.log('OK');
} 
*/
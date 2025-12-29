/* var btnList = document.querySelectorAll('button');
for (var i = 0; i < btnList.length; i++) {
    btnList[i].onclick = function () {
        console.log(`当前点击按钮的索引：${i}`);
    };
}
// 这样操作实现不了我们的需求
//   + 事件绑定属于异步编程、而循环是同步编程:每一轮循环做了事件绑定后，不需要等点击，直接下一轮循环...所以当我们点击按钮的时候，循环早已结束了「全局的i已经变为5了」！！
//   + 循环中用var声明变量，不会产生块级私有上下文:所以i是全局上下文中的 */

// 解决方案：闭包「弊端：性能消耗比较大」
/* var btnList = document.querySelectorAll('button');
for (var i = 0; i < btnList.length; i++) {
    (function (i) {
        // i是私有上下文中“私有”变量：循环五轮会产生5个私有上下文，每个私有上下文中都有一个私有的i，分别存储 0 1 2 3 4
        btnList[i].onclick = function () {
            console.log(`当前点击按钮的索引：${i}`);
        };
    })(i);
    //私有上下文1  实参:0  私有i:0  创建一个小函数(堆 [[scope]]:私有上下文1)，我们把小函数堆赋值给了某个按钮(全局)的onclick => 小函数堆不能被释放，对应的私有上下文1也不会被释放，闭包就产生了！！
    //...
} */

/* var btnList = document.querySelectorAll('button');
for (var i = 0; i < btnList.length; i++) {
    btnList[i].onclick = (function (i) {
        return function () {
            console.log(`当前点击按钮的索引：${i}`);
        };
    })(i);
} */

/*
let btnList = document.querySelectorAll('button');
for (let i = 0; i < btnList.length; i++) {
    // 基于let声明：每一轮循环都会产生一个“块级私有上下文”，因为这里创建的小函数依然被外部的按钮占用了，所以也产生了闭包！！
    btnList[i].onclick = function () {
        console.log(`当前点击按钮的索引：${i}`);
    };
}
*/

//------------------
/* // 解决方案：自定义属性
let btnList = document.querySelectorAll('button'),
    i = 0;
for (; i < btnList.length; i++) {
    // 循环过程中，把索引(i)赋值给按钮对象的“自定义属性index”(写入其堆内存中)；
    // 后期需要的时候，直接去按钮对象的堆中找自定义属性值即可！
    btnList[i].index = i;
    btnList[i].onclick = function () {
        // this:当前点击的元素对象
        console.log(`当前点击按钮的索引：${this.index}`);
    };
} */


/* //------------------
// 终极方案：事件委托
document.body.onclick = function (ev) {
    let target = ev.target;
    if (target.tagName === "BUTTON") {
        // 点击是按钮
        console.log(`当前点击按钮的索引：${target.getAttribute('index')}`);
    }
}; */


/* 
// 课后思考题：能否实现每间隔1秒输出 0 1 2?
for (var i = 0; i < 3; i++) {
    setTimeout(function () {
        console.log(i);
    }, (i+1) * 1000);
} 
*/
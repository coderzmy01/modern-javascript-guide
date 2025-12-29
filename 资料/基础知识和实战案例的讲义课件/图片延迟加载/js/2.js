/*
 offsetTop/offsetLeft：获取元素距离其父级参照物的距离「上边距/左边距  元素的外边框->父参照物的内边框」
 offsetParent：获取元素的父级参照物「同一个平面(文档流)中，最外层元素是内层所有元素的父级参照物」
   + 默认情况下，元素的父级参照物都是body「body.offsetParent===null」
   + 想要修改父级参照物，可以修改元素的“定位规则”「目的：让其脱离文档流」

 ==============
 总结：
 1. 只有scrollTop/Left是“可读写的”，其余属性都是“只读”的
 2. clientWidth/Height、clientTop/Left、offsetWidth/Height、scrollWidth/Height 都是获取元素本身的样式（例如：宽高和边框等）; 而offsetTop/Left/Parent获取的都是元素距离别人的距离；
 3. 操作浏览器的盒模型都是基于 document.documentElement（HTML元素）进行操作的；
 4. 获取到的样式值都是经过四舍五入的整数值，不会出现小数！！
 */

// 获取元素距离BODY的左偏移/上偏移「不论元素父参照物是谁」
const offset = function offset(ele) {
    // 先获取本身的偏移
    let left = ele.offsetLeft,
        top = ele.offsetTop,
        parent = ele.offsetParent;
    // 只要父参照物还在，并且不是BODY，则重复下述步骤
    while (parent && parent.tagName !== "BODY") {
        // 在之前的基础上把父参照物的边框和偏移加上
        let { clientLeft, offsetLeft, clientTop, offsetTop } = parent;
        left += clientLeft + offsetLeft;
        top += clientTop + offsetTop;
        // 获取父参照物的父参照物
        parent = parent.offsetParent;
    }
    return {
        left,
        top
    };
};

const box = document.querySelector('.box'),
    outer = document.querySelector('.outer'),
    inner = document.querySelector('.inner');
box.style.position = "relative";
outer.style.position = "relative";
// console.log(box.offsetParent); //body
// console.log(outer.offsetParent); //box
// console.log(inner.offsetParent); //box

console.log(offset(inner));
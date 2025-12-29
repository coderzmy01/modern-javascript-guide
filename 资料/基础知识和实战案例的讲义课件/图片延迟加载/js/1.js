/*
 JS设置元素的样式：
    box.style.xxx=xxx  写在元素的行内样式上
    box.style.cssText="width:100px;height:100px;"

    box.className=xxx  给元素设置样式类名，从而让其拥有某些样式
    box.classList.add(xxx)
    box.classList.remove/replace/contains/toggle...
 
 JS获取元素的样式：
    console.log(box.style.xxx)  获取写在元素“行内”上的样式「特点：样式只有写在行内上才可以获取」
    window.getComputedStyle([element],[伪类 after/before]) 返回的是包含当前元素所有“经过浏览器计算后”的样式对象「但凡元素经过浏览器渲染，所有样式都是被计算的；所以不论写在行内还是样式表中，或者写或者不写，样式都可以获取到」
    ele.getBoundingClientRect()  返回一个对象,包含当前元素和可视窗口的位置信息
      + left/right  盒子左边框/右边框距离可视窗口“左边”的距离
      + top/bottom  盒子上边框/下边框距离可视窗口“上边”的距离
    -----JS盒子模型属性：获取元素的相关样式
    + clientWidth/clientHeight：获取元素可视区域的宽高「真实内容+padding」，不受内容溢出的影响
    + clientTop/clientLeft：获取元素上边框和左边框的宽度
    + offsetWidth/offsetHeight：clientWidth/clientHeight基础上“加上”左右/上下边框
    + scrollWidth/scrollHeight：
      在没有内容溢出的情况下，获取的值和clientWidth/clientHeight相同
      有内容溢出的情况：获取的是真实宽高(包含溢出的内容)，获取是约等于的值「因为根据设置overflow的值不同，获取的结果也不尽相同；而且不同浏览器下获取的值也不尽相同」

    + scrollTop/scrollLeft：获取盒子(或者页面)卷去的高度和宽度「这两个属性是13个属性中唯一“可读写”的，其余的11个属性都是“只读”的」

    + offsetTop/offsetLeft
    + offsetParent
    
 */
let box = document.querySelector('.box');
// console.log(getComputedStyle(box)['width']);
// console.log(box.getBoundingClientRect());



(function () {
    const HTML = document.documentElement,
        link = document.querySelector('.link');

    const scrollMove = function scrollMove() {
        let { scrollTop, clientHeight } = HTML;
        link.style.display = scrollTop >= clientHeight ? 'block' : 'none';
    };
    window.onscroll = scrollMove;

    /* 
    固定时间的匀速运动公式：计算当前的位置
      + t:time 已经运动的时间
      + b:begin 起始位置
      + c:change 总距离
      + d:duration 总时间 
    */
    const linear = (t, b, c, d) => t / d * c + b;

    link.onclick = function () {
        let time = 0,
            begin = HTML.scrollTop,
            change = 0 - begin,
            duration = 1000,
            timer = null;
        // 开始运动之前，立即隐藏按钮&移除onscroll事件
        this.style.display = 'none';
        window.onscroll = null;
        // 设置定时器开始运动
        timer = setInterval(() => {
            time += 16;
            if (time >= duration) {
                // 运动结束:恢复scroll事件
                HTML.scrollTop = 0;
                clearInterval(timer);
                window.onscroll = scrollMove;
                return;
            }
            // 根据公式计算当前的位置
            let cur = linear(time, begin, change, duration);
            HTML.scrollTop = cur;
        }, 16);
    };
})();

/* 
(function () {
    /!* 回到顶部 *!/
    const HTML = document.documentElement,
        link = document.querySelector('.link');
    // 根据浏览器卷去的高度，计算Link的显示隐藏「window.onscroll监听浏览器滚动条滚动事件」
    window.onscroll = function () {
        let { scrollTop, clientHeight } = HTML;
        link.style.display = scrollTop >= clientHeight ? 'block' : 'none';
    };

    // 点击回到顶部
    link.onclick = function () {
        HTML.scrollTop = 0;
    };
})(); 
*/
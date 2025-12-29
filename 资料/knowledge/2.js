const box = document.querySelector('#box');

box.onclick = function () {
    // 样式修改直接会走过渡效果
    box.style.transform = 'translate(500px,300px)';
};
box.ontransitionend = function () {
    // 监测CSS3中的transition动画运动结束
    box.style.background = 'orange';
};

/* 
// “固定步长”的匀速运动
const step = 10;
const move = () => {
    //获取当前所在位置，在此基础上加“步长”
    let curTop = box.offsetTop,
        curLeft = box.offsetLeft;
    curTop += step;
    curLeft += step;
    //运动到边界
    if (curTop >= 300 && curLeft >= 500) {
        box.style.left = '500px';
        box.style.top = '300px';
        return;
    }
    //运动到最新的位置
    if (curTop >= 300) curTop = 300;
    if (curLeft >= 500) curLeft = 500;
    box.style.left = curLeft + 'px';
    box.style.top = curTop + 'px';
    //本次运动完，还要开启下一次的运动「间隔“屏幕刷新率”的时间」
    requestAnimationFrame(move);
};
box.onclick = move; 
*/

/* 
// “固定时间”的匀速运动
// 匀速运动公式
const linear = (t, b, c, d) => t / d * c + b;
let time = 0,
    autoTimer = null;
autoTimer = setInterval(() => {
    time += 17;
    if (time >= 1000) {
        clearInterval(autoTimer);
        box.style.left = `500px`;
        box.style.top = `300px`;
        return;
    }
    box.style.left = `${linear(time, 0, 500, 1000)}px`;
    box.style.top = `${linear(time, 0, 300, 1000)}px`;
}, 17); 
*/
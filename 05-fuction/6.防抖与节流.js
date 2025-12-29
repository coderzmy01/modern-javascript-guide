function debounce(func, delay, immediate = false) {
  let timer = null;
  return function (...args) {
    const context = this;
    // 如果有定时器，清除
    if (timer) clearTimeout(timer);
    if (immediate) {
      // 立即执行模式
      const callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, delay);
      if (callNow) {
        func.apply(context, args);
      }
    } else {
      // 延迟执行模式
      timer = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    }
  };
}
const throttleWithTimeStamp = function (func, delay) {
  let prev = 0;
  return function (...args) {
    if (Date.now() - prev > delay) {
      func.apply(this, args);
      prev = Date.now();
    }
  };
};
const throttleWithTimer = function (func, delay) {
  let timer = null;
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(this, args);
        timer = null;
      }, delay);
    }
  };
};

const throttleWithHybrid = function (func, delay) {
  let timer = null;
  let prev = 0;
  return function (...args) {
    const now = Date.now();
    const remain = delay - (now - prev);
    // 剩余时间小于等于0，立即执行
    if (remain <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      func.apply(this, args);
      prev = +Date.now();
    } else if (!timer) {
      timer = setTimeout(() => {
        previous = +new Date();
        timeout = null;
        func.apply(context, args);
      }, remain);
    }
  };
};
// 测试debounce
const btn = document.getElementById('btn');
btn.addEventListener(
  'click',
  throttleWithHybrid(() => {
    console.log('click');
  }, 5000),
);

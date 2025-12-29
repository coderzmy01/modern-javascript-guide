/* 
 const b = new B3([container],[options])
   [container]：轮播图容器{可以是DOM节点也可以是选择器}
   [options]：相关配置项
     + initial:0 默认展示项索引「number」
     + interval:3000 自动轮播的间隔时间「number」，设置为0则不开启自动轮播
     + click:'change' 点击每一个SLIDE的行为「string」 
       + change切换选中
       + link跳转到指定连接：自定义属性link存储的值
       + none啥都不做
     + navigation:{} 导航按钮指定的元素「object/null」
       + prevEl:'.b3-navigation.prev'
       + nextEl:'.b3-navigation.next'
     + on:null 钩子函数「object/null」
       + init(实例) 初始化完成
       + changeEnd(实例) 切换完成
  具备的方法：
    + slideTo([index]) 切换到指定索引项
    + refresh() 刷新(重新计算位置大小)
 */
(function () {
    /* 工具类方法 */
    const class2type = {},
        toString = class2type.toString,
        hasOwn = class2type.hasOwnProperty;
    const toType = function toType(obj) {
        let reg = /^\[object ([\w\W]+)\]$/;
        if (obj == null) return obj + "";
        return typeof obj === "object" || typeof obj === "function" ?
            reg.exec(toString.call(obj))[1].toLowerCase() :
            typeof obj;
    };
    const isPlainObject = function isPlainObject(obj) {
        let proto, Ctor;
        if (!obj || toString.call(obj) !== "[object Object]") return false;
        proto = Object.getPrototypeOf(obj);
        if (!proto) return true;
        Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
        return typeof Ctor === "function" && Ctor === Object;
    };
    const clearTimer = function clearTimer(timer) {
        if (timer) clearTimeout(timer);
        return null;
    };
    const throttle = function throttle(func, wait) {
        if (typeof func !== "function") throw new TypeError("func is not a function!");
        wait = +wait;
        if (isNaN(wait)) wait = 300;
        let timer = null,
            previous = 0;
        return function operate(...params) {
            let now = +new Date(),
                remaining = wait - (now - previous);
            if (remaining <= 0) {
                func.call(this, ...params);
                previous = +new Date();
                timer = clearTimer(timer);
            } else if (!timer) {
                timer = setTimeout(() => {
                    func.call(this, ...params);
                    previous = +new Date();
                    timer = clearTimer(timer);
                }, remaining);
            }
        };
    };
    const queryElement = function queryElement(ele, context) {
        context = context || document;
        if (ele == null || (ele.nodeType !== 1 && typeof ele !== 'string')) return null;
        if (ele.nodeType === 1) return ele;
        return context.querySelector(ele);
    };
    const error = function error(message) {
        throw new TypeError(message);
    };

    /* 核心方法 */
    const defaultOptions = {
        initial: {
            type: 'number',
            value: 0
        },
        interval: {
            type: 'number',
            value: 3000
        },
        click: {
            type: 'string',
            value: 'change'
        },
        navigation: {
            type: 'object|null',
            value: {
                prevEl: '.b3-navigation.prev',
                nextEl: '.b3-navigation.next'
            }
        },
        on: {
            type: 'object|null',
            value: null
        }
    };
    const initParams = function initParams(container, options) {
        let wrapper, navigationPrev, navigationNext, slides;

        // 参数初始化&校验
        if (!isPlainObject(options)) options = {};
        Reflect.ownKeys(defaultOptions).forEach(key => {
            let { type, value, required } = defaultOptions[key],
                typeRules = type.split('|'),
                optionsValue = options[key],
                optionsType = toType(optionsValue);
            // @1要求传递但是没有传递
            if (required && optionsType === 'undefined') error(`${key} must be required!`);
            // @2传递值但是不符合格式
            if (optionsType !== 'undefined' && !typeRules.includes(optionsType)) error(`${key} must be an ${type}!`);
            // @3传递值按照传递的为主,没传递值按照默认值处理
            options[key] = optionsType !== 'undefined' ? optionsValue : value;
        });
        this.options = options;

        // 获取需要的DOM元素
        container = queryElement(container);
        if (container === null) error(`container must be an DOM/selector!`);
        wrapper = queryElement('.b3-wrapper', container);
        if (wrapper === null) error(`missing wrapper!`);
        slides = Array.from(wrapper.querySelectorAll('.b3-slide'));
        if (options.navigation) {
            let { prevEl, nextEl } = options.navigation;
            navigationPrev = queryElement(prevEl, container);
            navigationNext = queryElement(nextEl, container);
        }
        this.$container = container;
        this.$wrapper = wrapper;
        this.$slides = slides;
        this.$navigationPrev = navigationPrev;
        this.$navigationNext = navigationNext;
    };
    const init = function init() {
        // 开始处理
        let { $slides, options } = this,
            { initial } = options;
        if ($slides.length === 0) return;
        this.step = initial;
        this.count = $slides.length;
        computed.call(this);
        rotation.call(this);
        handler.call(this);
    };
    const computed = function computed() {
        // 计算每一个SLIDE的位置
        let { step, count, $slides, $wrapper } = this;
        if (count < 5) {
            // 如果数据不足五个,需要补齐
            while (count < 5) {
                let diff = 5 - count,
                    frag = document.createDocumentFragment();
                new Array(diff).fill(null).forEach((_, index) => {
                    let $slide = $slides[index];
                    if ($slide) {
                        frag.appendChild($slide.cloneNode(true));
                        count++;
                    }
                });
                $wrapper.appendChild(frag);
                frag = null;
            }
            $slides = Array.from($wrapper.querySelectorAll('.b3-slide'));
            this.$slides = $slides;
            this.count = count;
        }
        let temp1 = step - 2,
            temp2 = step - 1,
            temp3 = step,
            temp4 = step + 1,
            temp5 = step + 2;
        if (temp1 < 0) temp1 = count + temp1;
        if (temp2 < 0) temp2 = count + temp2;
        if (temp4 > count - 1) temp4 = temp4 - count;
        if (temp5 > count - 1) temp5 = temp5 - count;
        $slides.forEach(($slide, index) => {
            let className = 'b3-slide',
                sty = 'z-index:0;transform:translate(-50%,-50%) scale(0.55);';
            switch (index) {
                case temp3:
                    className = 'b3-slide active';
                    sty = 'z-index:3;transform:translate(-50%,-50%) scale(1);';
                    break;
                case temp1:
                    sty = 'z-index:1;transform:translate(-195%,-50%) scale(0.7);';
                    break;
                case temp2:
                    sty = 'z-index:2;transform:translate(-130%,-50%) scale(0.85);';
                    break;
                case temp4:
                    sty = 'z-index:2;transform:translate(30%,-50%) scale(0.85);';
                    break;
                case temp5:
                    sty = 'z-index:1;transform:translate(95%,-50%) scale(0.7);';
                    break;
            }
            $slide.className = className;
            $slide.style.cssText = sty;
            $slide.setAttribute('index', index);
        });
        // 钩子函数
        let callback = this.options.on?.changeEnd;
        if (typeof callback === "function") callback.call(this, this);
    };
    const moveNext = function moveNext() {
        this.step++;
        if (this.step > this.count - 1) this.step = 0;
        computed.call(this);
    };
    const movePrev = function movePrev() {
        this.step--;
        if (this.step < 0) this.step = this.count - 1;
        computed.call(this);
    };
    const rotation = function rotation() {
        // 自动轮播的处理
        let { options, $container } = this,
            { interval } = options,
            timer = null;
        if (interval === 0) return;
        if (!timer) timer = setInterval(moveNext.bind(this), interval);
        $container.onmouseenter = () => {
            clearInterval(timer);
            timer = null;
        };
        $container.onmouseleave = () => {
            if (!timer) timer = setInterval(moveNext.bind(this), interval);
        };
        // 页卡显示隐藏的时候，也控制轮播暂停和开启
        if (!this.flag) {
            this.flag = true;
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    clearInterval(timer);
                    timer = null;
                    return;
                }
                if (!timer) timer = setInterval(moveNext.bind(this), interval);
            });
        }
    };
    const handler = function handler() {
        // 点击行为的处理
        let { $navigationPrev, $navigationNext, $container, options } = this,
            { click } = options;
        $container.onclick = throttle(ev => {
            let target = ev.target,
                $slide;
            if ($navigationNext && target === $navigationNext) {
                moveNext.call(this);
                return;
            }
            if ($navigationPrev && target === $navigationPrev) {
                movePrev.call(this);
                return;
            }
            // 点击的是SLIDE
            $slide = checkSlide.call(this, target);
            if (click !== 'none' && $slide) {
                if (click === 'change') {
                    let index = +$slide.getAttribute('index');
                    if (index === this.step) return;
                    this.slideTo(index);
                    return;
                }
                let link = $slide.getAttribute('link');
                if (link) window.open(link);
            }
        });
    };
    const checkSlide = function checkSlide(target) {
        // 校验点击的是否是SLIDE或者其后代
        let { $wrapper } = this;
        if (!target) return false;
        if (target.className && target.className.includes('b3-slide')) return target;
        let p = target.parentNode;
        while (p && p !== $wrapper) {
            if (p.className && p.className.includes('b3-slide')) return p;
            p = p.parentNode;
        }
        return false;
    };

    class B3 {
        constructor(container, options) {
            initParams.call(this, container, options);
            init.call(this);
            // 钩子函数
            let callback = this.options.on?.init;
            if (typeof callback === "function") callback.call(this, this);
        }
        refresh() {
            let { $wrapper } = this;
            this.$slides = Array.from($wrapper.querySelectorAll('.b3-slide'));
            init.call(this);
        }
        slideTo(index) {
            index = +index;
            if (isNaN(index)) error(`index must be an number!`);
            this.step = index;
            computed.call(this);
        }
    }

    /* 暴露API */
    if (typeof window !== "undefined") window.B3 = B3;
    if (typeof module === "object" && typeof module.exports === "object") module.exports = B3;
})();
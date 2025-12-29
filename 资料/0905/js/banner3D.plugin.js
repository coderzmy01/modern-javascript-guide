/*
 new Banner3D([selector],[dataSource],[config]) 
    [selector]:录播图容器的选择器
    [dataSource]:轮播图的数据{要求是一个数组}
    [config]:配置项
       + step:0 初始展示的索引
       + interval:3000 间隔多久切换一次
       + speed:500 每一次切换动画的时间
       + auto:true 是否自动切换「如果支持自动切换，则鼠标进入离开容器会默认的控制自动切换开启和暂停」
       + navigation:true 是否有导航切换
       + slideClick:true 是否支持点击slide切换
         slideClick:(item)=>{} 可以传一个函数，这样点击slide不是切换，而是执行函数「item是当前slide数据」
       + template:item=>{  return ''; } 自定义slide中呈现的内容
       + onTranstionEnd:(step,item)=>{}  每一次切换完成触发的回调函数
       + ...
 */
(function () {
    "use strict";

    const isPlainObject = function isPlainObject(obj) {
        let proto, Ctor;
        if (!obj || Object.prototype.toString.call(obj) !== "[object Object]") return false;
        proto = Object.getPrototypeOf(obj);
        if (!proto) return true;
        Ctor = proto.hasOwnProperty('constructor') && proto.constructor;
        return typeof Ctor === "function" && Ctor === Object;
    };

    const toType = function toType(obj) {
        if (obj == null) return obj + "";
        let reg = /^\[object ([a-zA-Z0-9]+)\]$/i;
        return typeof obj === "object" || typeof obj === "function" ?
            reg.exec(Object.prototype.toString.call(obj))[1].toLowerCase() :
            typeof obj;
    };

    // 校验是否为SLIDE下的元素
    const checkSlide = function checkSlide(target, wrapper) {
        if (target.className && target.className.includes('b3-slide')) return target;
        let p = target.parentNode;
        while (p && p !== wrapper) {
            if (p.className && p.className.includes('b3-slide')) return p;
            p = p.parentNode;
        }
        return false;
    };

    /* 核心代码 */
    class Banner3D {
        constructor(selector, dataSource, config) {
            let container = document.querySelector(selector);
            if (!container) throw new TypeError('container is not found');
            let wrapper = container.querySelector('.b3-wrapper'),
                slides = [],
                navPrev = container.querySelector('.b3-navigation.prev'),
                navNext = container.querySelector('.b3-navigation.next');
            this.$container = container;
            this.$wrapper = wrapper;
            this.$slides = slides;
            this.$navPrev = navPrev;
            this.$navNext = navNext;
            this.dataSource = dataSource;
            config.autoTimer = null;
            config.count = 0;
            this.config = config;

            // 完成数据绑定
            this.binding(true);

            // 自动轮播
            if (this.config.auto) {
                this.config.autoTimer = setInterval(this.autoMove.bind(this), this.config.interval);
                // 鼠标进去离开控制自动录播
                this.$container.addEventListener('mouseenter', () => clearInterval(this.config.autoTimer));
                this.$container.addEventListener('mouseleave', () => {
                    this.config.autoTimer = setInterval(this.autoMove.bind(this), this.config.interval);
                });
            }

            // 点击操作
            this.handle();
        }
        binding(isInitial) {
            let {
                $slides,
                $wrapper,
                $navPrev,
                $navNext,
                dataSource,
                config: {
                    step,
                    speed,
                    template,
                    navigation,
                    onTranstionEnd,
                    count
                }
            } = this;

            // 控制每一个SLIDE的样式
            if (dataSource.length === 0) return;
            while (dataSource.length < 5) {
                let diff = 5 - dataSource.length,
                    clone = dataSource.slice(0, diff);
                dataSource = dataSource.concat(clone);
            }
            this.config.count = count = dataSource.length;
            this.dataSource = dataSource;
            let temp1 = step - 2,
                temp2 = step - 1,
                temp3 = step,
                temp4 = step + 1,
                temp5 = step + 2;
            if (temp1 < 0) temp1 = count + temp1;
            if (temp2 < 0) temp2 = count + temp2;
            if (temp4 > count - 1) temp4 = temp4 - count;
            if (temp5 > count - 1) temp5 = temp5 - count;
            dataSource = dataSource.map((item, index) => {
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
                item.className = className;
                sty += `transition: transform ${speed}ms;`;
                item.sty = sty;
                return item;
            });

            // 如果不是第一次执行，目的是修改现有SLIDE的样式，而不是创建SLIDE
            if (!isInitial) {
                dataSource.forEach((item, index) => {
                    let {
                        className,
                        sty
                    } = item;
                    $slides[index].className = className;
                    $slides[index].style.cssText = sty;
                });
                onTranstionEnd.call(this, step, dataSource[step]);
                return;
            }

            // 动态创建SLIDE
            let str = ``;
            dataSource.forEach((item, index) => {
                let {
                    className,
                    sty
                } = item;
                str += `<div class="${className}" style="${sty}" index="${index}">
                    ${template.call(this,item)}
                </div>`;
            });
            $wrapper.innerHTML = str;
            this.$slides = Array.from($wrapper.querySelectorAll('.b3-slide'));
            if (navigation && $navNext && $navPrev) {
                $navNext.style.display = $navPrev.style.display = 'block';
            }
        }
        autoMove() {
            this.config.step++;
            if (this.config.step > this.config.count - 1) this.config.step = 0;
            this.binding();
        }
        handle() {
            this.$container.addEventListener('click', ev => {
                let target = ev.target,
                    targetClass = target.className;
                // 点击左右按钮
                if (targetClass.includes('b3-navigation') && this.config.navigation) {
                    if (targetClass.includes('prev')) {
                        this.config.step--;
                        if (this.config.step < 0) this.config.step = this.config.count - 1;
                        this.binding();
                        return;
                    }
                    this.autoMove();
                    return;
                }

                // 点击的SLIDE
                let slide = checkSlide(target, this.$wrapper);
                if (slide) {
                    let index = +slide.getAttribute('index') || 0;
                    let slideClick = this.config.slideClick;
                    if (typeof slideClick === "boolean" && slideClick) {
                        if (this.config.step === index) return;
                        this.config.step = index;
                        this.binding();
                        return;
                    }
                    if (typeof slideClick === "function") {
                        slideClick.call(this, this.dataSource[index]);
                        return;
                    }
                }
            });
        }
    }

    /* 暴露API */
    const rules = {
        step: 'number',
        interval: 'number',
        speed: 'number',
        auto: 'boolean',
        navigation: 'boolean',
        slideClick: ['boolean', 'function'],
        template: 'function',
        onTranstionEnd: 'function'
    };
    const proxy = (selector, dataSource, config) => {
        if (typeof selector !== "string") throw new TypeError('selector must be a string');
        if (!Array.isArray(dataSource)) throw new TypeError('dataSource must be a array');
        if (!isPlainObject(config)) config = {};
        // 合并默认配置项
        config = Object.assign({
            step: 0,
            interval: 3000,
            speed: 500,
            auto: true,
            navigation: true,
            slideClick: true,
            template: item => {
                let {
                    pic,
                    descript: {
                        name,
                        identity,
                        dream
                    }
                } = item;
                return `<img src="${pic}" alt="">
                <div class="b3-mark"></div>
                <div class="b3-desc">
                    <p>${name}</p>
                    <p>身份:${identity}</p>
                    <p>梦想:${dream}</p>
                </div>`;
            },
            onTranstionEnd: (step, item) => {}
        }, config);
        // 校验配置项中每一项的格式要求
        Reflect.ownKeys(rules).forEach(key => {
            let rule = rules[key],
                type = toType(config[key]);
            if (!rule.includes(type)) throw new TypeError(`config[${key}] must be a ${rule}`);
        });
        return new Banner3D(selector, dataSource, config);
    };
    if (typeof window !== "undefined") window.banner3D = proxy;
    if (typeof module === "object" && typeof module.exports === "object") module.exports = proxy;
})();
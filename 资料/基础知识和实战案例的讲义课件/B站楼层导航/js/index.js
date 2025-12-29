/*
 * debounce：实现函数的防抖（目的是频繁触发中只执行一次）
 *  @params
 *     func:需要执行的函数
 *     wait:检测防抖的间隔频率
 *     immediate:是否是立即执行（如果为TRUE是控制第一次触发的时候就执行函数，默认FALSE是以最后一次触发为准）
 *  @return
 *     可被调用执行的函数
 */
function debounce(func, wait = 100, immediate = false) {
    let timer = null;
    return function anonymous(...params) {
        let now = immediate && !timer;
        clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
            // 执行函数:注意保持THIS和参数的完整度
            !immediate ? func.call(this, ...params) : null;
        }, wait);
        now ? func.call(this, ...params) : null;
    };
}

/*
 * throttle：实现函数的节流（目的是频繁触发中缩减频率）
 *   @params
 *      func:需要执行的函数
 *      wait:自己设定的间隔时间(频率)
 *   @return
 *      可被调用执行的函数
 */
function throttle(func, wait = 100) {
    let timer = null,
        previous = 0; //记录上一次操作时间
    return function anonymous(...params) {
        let now = new Date(), //当前操作的时间
            remaining = wait - (now - previous);
        if (remaining <= 0) {
            // 两次间隔时间超过频率：把方法执行即可
            clearTimeout(timer);
            timer = null;
            previous = now;
            func.call(this, ...params);
        } else if (!timer) {
            // 两次间隔时间没有超过频率，说明还没有达到触发标准呢，设置定时器等待即可（还差多久等多久）
            timer = setTimeout(() => {
                clearTimeout(timer);
                timer = null;
                previous = new Date();
                func.call(this, ...params);
            }, remaining);
        }
    };
}

/*
 * 获取元素距离BODY的偏移值 
 */
function offset(element) {
    let parent = element.offsetParent,
        top = element.offsetTop,
        left = element.offsetLeft;
    while (parent) {
        if (!/MSIE 8/.test(navigator.userAgent)) {
            left += parent.clientLeft;
            top += parent.clientTop;
        }
        left += parent.offsetLeft;
        top += parent.offsetTop;
        parent = parent.offsetParent;
    }
    return {
        top,
        left
    };
}

/* 基于单例设计模式实现模块化开发 */
let navigationModule = (function () {
    // 获取需要操作的DOM元素 
    let navigation = document.querySelector('.navigation'),
        navigationModal = document.querySelector('.navigation-modal'),
        list = navigation.querySelector('.list'),
        markBox = navigation.querySelector('.mark-box'),
        sortBtn = navigation.querySelector('.sort-btn'),
        topBtn = navigation.querySelector('.top-btn'),
        container = document.querySelector('.container'),
        HTML = document.documentElement,
        isEdit = false; //控制是否处于编辑状态

    // 构建数据映射模型
    let sourceMap = [{
        id: 'guochuang',
        text: '国创',
        top: 0,
        active: false
    }, {
        id: 'yinyue',
        text: '音乐',
        top: 0,
        active: false
    }, {
        id: 'fanju',
        text: '番剧',
        top: 0,
        active: false
    }, {
        id: 'manhua',
        text: '漫画',
        top: 0,
        active: false
    }, {
        id: 'wudao',
        text: '舞蹈',
        top: 0,
        active: false
    }, {
        id: 'donghua',
        text: '动画',
        top: 0,
        active: false
    }, {
        id: 'zixun',
        text: '资讯',
        top: 0,
        active: false
    }];

    // 计算每个板块的TOP值
    const computedTop = function computedTop() {
        sourceMap = sourceMap.map(item => {
            let element = document.querySelector(`#${item.id}`);
            item.top = offset(element).top;
            return item;
        });
    };

    // 根据映射数据控制列表项及内容板块的样式
    const renderList = function renderList() {
        let str = ``;
        sourceMap.forEach(item => {
            let {
                active,
                text,
                id
            } = item;
            str += `<li class="${active?'active':''}" data-id="${id}">
                ${text}
            </li>`;
        });
        list.innerHTML = str;
    };
    const renderContainer = function renderContainer() {
        let frag = document.createDocumentFragment();
        sourceMap.forEach(item => {
            let element = document.querySelector(`#${item.id}`);
            frag.appendChild(element);
        });
        container.appendChild(frag);
        frag = null;
    };

    // 滚动中计算哪一个选中
    const computedActive = function computedActive() {
        if (isEdit) return;
        let top = HTML.scrollTop;
        sourceMap = sourceMap.map(item => {
            item.active = false;
            return item;
        });
        if (top >= sourceMap[sourceMap.length - 1].top) {
            sourceMap[sourceMap.length - 1].active = true;
        } else if (top >= sourceMap[0].top) {
            for (let i = 0; i < sourceMap.length; i++) {
                let item = sourceMap[i],
                    next = sourceMap[i + 1];
                if (top >= item.top && top < next.top) {
                    item.active = true;
                    break;
                }
            }
        }
        renderList();
    };

    // 初始化导航的位置信息
    const initPosition = function initPosition() {
        // 1.计算导航距离右侧的位置
        let n = (HTML.clientWidth - 1000) / 2 - 75;
        if (n < 0) {
            navigation.style.display = 'none';
            return;
        }
        navigation.style.display = 'block';
        navigation.style.right = `${n}px`;

        // 2.随着页面滚动，控制它的定位
        if (HTML.scrollTop >= 230) {
            navigation.style.position = 'fixed';
            navigation.style.top = '20px';
            return;
        }
        navigation.style.position = 'absolute';
        navigation.style.top = '250px';
    };

    // 点击操作的事件委托
    const clickDelegate = function clickDelegate() {
        navigation.addEventListener('click', function (ev) {
            let target = ev.target,
                targetTag = target.tagName,
                targetClass = target.classList;

            // 合并事件源 I->A
            if (targetTag === "I") {
                target = target.parentNode;
                targetTag = target.tagName;
                targetClass = target.classList;
            }

            // 回到顶部
            if (targetTag === 'A' && targetClass.contains('top-btn')) {
                HTML.scrollTop = 0;
                return;
            }

            // 编辑状态的处理 
            if (targetTag === 'A' && targetClass.contains('sort-btn')) {
                if (isEdit) {
                    // 当前处于编辑状态:退出编辑状态
                    isEdit = false;
                    markBox.style.display = 'none';
                    navigationModal.style.display = 'none';
                    sortBtn.classList.remove('active');
                    // 再次根据滚动的高度计算出选中谁
                    computedActive();
                    return;
                }
                // 当前非编辑状态:进入编辑状态
                isEdit = true;
                markBox.style.display = 'block';
                navigationModal.style.display = 'block';
                sortBtn.classList.add('active');
                // 清除所用选中的样式
                sourceMap = sourceMap.map(item => {
                    item.active = false;
                    return item;
                });
                renderList();
                return;
            }

            // 点击列表项
            if (targetTag === "LI") {
                if (isEdit) return;
                let data_id = target.getAttribute('data-id'),
                    result = sourceMap.find(item => item.id === data_id);
                if (result) {
                    HTML.scrollTop = result.top;
                }
            }
        });

        navigationModal.addEventListener('click', function () {
            // 退出编辑状态
            isEdit = false;
            markBox.style.display = 'none';
            navigationModal.style.display = 'none';
            sortBtn.classList.remove('active');
            computedActive();
        });
    };

    // 拖拽处理
    const dragHandle = function dragHandle() {
        let itemList;
        const start = function start(ev) {
            let target = ev.target;
            if (!isEdit || target.tagName !== "LI") return;

            // 让所有的LI相对于LIST盒子定位
            itemList = Array.from(list.querySelectorAll("li"));
            itemList.forEach((item, index) => {
                item.style.position = 'absolute';
                item.style.zIndex = 0;
                item.style.transitionDuration = '0s';
                item.classList.remove('active');
                item.style.top = `${index*28}px`;
                // 为了实现碰撞检测，我们给每一个LI设置索引属性
                item.index = index;
            });
            // 按下的LI需要有特殊样式
            target.style.zIndex = 10;
            target.classList.add('active');

            // 记录LI及鼠标初始位置
            target.startT = parseFloat(target.style.top);
            target.startY = ev.pageY;
            target.previousY = ev.pageY; //记录上一次鼠标的位置

            // 为了防止鼠标焦点丢失,把move和up绑定给document
            document.onmousemove = move.bind(target);
            document.onmouseup = up.bind(target);
        };
        const move = function move(ev) {
            let curT = ev.pageY - this.startY + this.startT,
                minT = 0,
                maxT = list.offsetHeight - 28;
            curT = curT < minT ? minT : (curT > maxT ? maxT : curT);
            this.style.top = `${curT}px`;

            // 碰撞检测
            let n = Math.round(curT / 28);
            if (n === this.index) return;
            this.old_index = this.index;
            this.index = n;

            // 计算上移还是下移
            let curY = ev.pageY;
            if (curY > this.previousY) {
                // 下移
                itemList.forEach(item => {
                    if (item.index <= this.index && item.index >= this.old_index && item !== this) {
                        item.index--;
                        item.style.transitionDuration = '.2s';
                        item.style.top = `${item.index*28}px`;
                    }
                });
            } else if (curY < this.previousY) {
                // 上移
                itemList.forEach(item => {
                    if (item.index >= this.index && item.index <= this.old_index && item !== this) {
                        item.index++;
                        item.style.transitionDuration = '.2s';
                        item.style.top = `${item.index*28}px`;
                    }
                });
            }
            this.previousY = curY;
        };
        const up = function up(ev) {
            // 松开的时候按照每一项的索引，给映射表排序
            let arr = [];
            itemList.sort((a, b) => a.index - b.index).forEach((item, index) => {
                let data_id = item.getAttribute('data-id'),
                    result = sourceMap.find(item => item.id === data_id);
                arr[index] = result;
            });
            sourceMap = arr;
            renderList();
            renderContainer();
            computedTop();
            
            document.onmousemove = null;
            document.onmouseup = null;
        };

        list.onmousedown = start;
    };

    return {
        init() {
            // 命令模式：控制业务功能执行的先后顺序
            initPosition();
            computedTop();
            renderList();
            renderContainer();

            clickDelegate();
            dragHandle();

            // 窗口改变/滚动监听
            window.addEventListener('resize', function () {
                initPosition();
                computedTop();
            });
            window.addEventListener('scroll', throttle(function () {
                initPosition();
                computedActive();
            }));
        }
    };
})();

window.addEventListener('load', navigationModule.init);
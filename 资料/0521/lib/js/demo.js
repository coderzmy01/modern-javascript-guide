(async function () {
    let b1 = new B3('#container1', {
        interval: 0,
        // click: 'none',
        on: {
            init(self) {
                console.log('轮播1初始化完成：', self);
            }
        }
    });

    // 获取数据 & 数据绑定
    let data1 = await jsonp('https://zxt_team.gitee.io/opensource/b3-data.js', { jsonp: 'b3func' });
    let data2 = data1.slice(0, 3);
    (() => {
        let str = ``;
        data1.forEach(item => {
            let { id, link, pic, descript: { dream, name, identity } } = item;
            str += `<div class="b3-slide" link="${link}">
                <img src="${pic}" alt="">
                <div class="b3-mark"></div>
                <div class="b3-desc">
                    <p>${name}</p>
                    <p>身份:${identity}</p>
                    <p>梦想:${dream}</p>
                </div>
            </div>`;
        });
        document.querySelector('#container1 .b3-wrapper').innerHTML = str;

        str = ``;
        data2.forEach(item => {
            let { id, link, pic } = item;
            str += `<div class="b3-slide" link="${link}">
                <img src="${pic}" alt="">
            </div>`;
        });
        document.querySelector('#container2 .b3-wrapper').innerHTML = str;
    })();

    // 使用插件实现效果
    b1.refresh();


    let b2 = new B3('#container2', {
        interval: 1000,
        click: 'link',
        on: {
            changeEnd(self) {
                console.log('轮播2切换完成：', self);
            }
        }
    });
})();
(function () {
    let $headerBox = $('.headerBox'),
        $mainBox = $('.mainBox'),
        $footerBox = $('.footerBox'),
        $musicBtn = $('.musicBtn'),
        $wrapper = $('.wrapper'),
        $progress = $('.progress'),
        $current = $progress.find('.current'),
        $duration = $progress.find('.duration'),
        $already = $progress.find('.already');
    let musicAudio = document.querySelector('#musicAudio'),
        autoTimer = null,
        step = 0;
    // 基于发布订阅设计模式管理我们要做的事情
    let $plain = $.Callbacks();

    // @1:绑定歌词信息
    $plain.add(lyric => {
        // 把代表内容的特殊符号替换为相关内容
        lyric = lyric.replace(/&#(32|40|41|45);/g, (_, $1) => {
            // $1是每一次匹配到内容中的分组信息
            let text = "";
            switch (+$1) {
                case 32:
                    text = " ";
                    break;
                case 40:
                    text = "(";
                    break;
                case 41:
                    text = ")";
                    break;
                case 45:
                    text = "-";
                    break;
            }
            return text;
        });

        // 在歌词中捕获到每一句歌词的内容、时间等信息
        let arr = [];
        lyric.replace(/\[(\d+)&#58;(\d+)&#46;(?:\d+)\]([^&#;]+)(&#10;)?/g, (_, minutes, seconds, text) => {
            arr.push({
                text,
                minutes,
                seconds
            });
        });

        // 动态拼接内容
        let str = ``;
        arr.forEach(item => {
            let { text, minutes, seconds } = item;
            str += `<p minutes="${minutes}" seconds="${seconds}">
                ${text}
            </p>`;
        });
        $wrapper.html(str);
    });

    // @2:点击按钮控制音乐的暂停/播放
    $plain.add(lyric => {
        $musicBtn.tap(() => {
            if (musicAudio.paused) {
                // 当前是暂停，我们让其播放
                musicAudio.play();
                $musicBtn.addClass('move');
                // 如果检测到部分资源请求回来，我们开始执行HANDLER，且间隔1秒继续执行...
                musicAudio.oncanplay = handler;
                autoTimer = setInterval(handler, 1000);
                return;
            }
            // 当前是播放，我们让其暂停
            musicAudio.pause();
            $musicBtn.removeClass('move');
            clearInterval(autoTimer);
        });
    });
    // 计算播放进度条&&歌词位置
    const format = time => {
        let minutes = Math.floor(time / 60),
            seconds = Math.round(time - minutes * 60);
        if (minutes < 10) minutes = '0' + minutes;
        if (seconds < 10) seconds = '0' + seconds;
        return `${minutes}:${seconds}`;
    };
    const handler = function handler() {
        let { currentTime, duration } = musicAudio,
            curTime = format(currentTime),
            durTime = format(duration);
        if (currentTime >= duration) {
            // 播放结束
            clearInterval(autoTimer);
            $musicBtn.removeClass('move');
            // 回到头部
            $wrapper.css('top', 0);
            $wrapper.find('p').removeClass('active');
            step = 0;
            $already.css('width', '0%');
            $current.html("00:00");
            return;
        }
        // 计算播放进度条
        $already.css('width', currentTime / duration * 100 + '%');
        $current.html(curTime);
        $duration.html(durTime);

        // 计算歌词位置：控制歌词的选中样式
        let [minutes, seconds] = curTime.split(':'),
            $item = $wrapper.find(`[minutes='${minutes}'][seconds='${seconds}']`);
        if ($item.length <= 0) return;
        $item.addClass('active').siblings().removeClass('active');
        step++;
        if (step > 4) {
            // 开始让WRAPPER向上动
            let curTop = parseFloat($wrapper.css('top')),
                pH = $wrapper.find('p')[0].offsetHeight;
            curTop -= pH;
            $wrapper.css('top', curTop);
        }
    };

    // 动态计算MAIN区域的高度
    const computedMain = function computedMain() {
        let HTML = document.documentElement,
            H = HTML.clientHeight,
            F = parseFloat(HTML.style.fontSize);
        $mainBox.css(
            'height',
            H
            - $headerBox[0].offsetHeight
            - $footerBox[0].offsetHeight
            - 0.8 * F
        );
    };
    computedMain();
    window.addEventListener('resize', computedMain);

    // 首先从服务器获取数据
    $.ajax({
        url: './json/lyric.json',
        cache: false,
        success(result) {
            // 获取数据后，通知计划表中的方法执行
            $plain.fire(result.lyric);
        }
    });
})();
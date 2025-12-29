/* 
现有一个POST接口：https://xxx.com/students，每次请求只能返回10个学生的课程成绩，如下：
[
    { name: '张三', score: 99, time: '2021-12-22' },
    { name: '李四', score: 60, time: '2021-12-12' },
    { name: '王五', score: 77, time: '2021-11-08' },
    ...
]
该接口有一定概率请求失败，不可忽略，Response Status Code 500，Body为空
要求：
实现一个函数，总共需获得100个成绩大于90分，且时间在2021年12月03日之后的学生的课程成绩，并按各自成绩从大到小排列返回（可直接使用fetch 或axios）

提示：
浏览器最多可以有6个并行的网络请求
尽可能在更短的时间内，运行完成得到结果
尽可能用最少的请求次数
*/

/* 模拟数据请求的办法 */
const source = axios.CancelToken.source();
const query = function query() {
    return axios.post('https://xxx.com/students', null, { cancelToken: source.token })
        .then(response => response.data);
};
const fetchStudents = function fetchStudents() {
    return new Promise(resolve => {
        // 创建6个工作区同时进行
        let works = new Array(6).fill(null),
            values = [],
            flag = false;
        works.forEach(() => {
            // 每个工作区都是获取学生信息；当此任务执行完（不论成功还是失败），继续去获取学生信息..
            const next = async () => {
                if (flag) return;
                // 当values存储的结果够100个后，就无需再发请求(取消正在发送的请求)
                if (values.length >= 100) {
                    resolve(values.slice(0, 100));
                    source.cancel();
                    flag = true;
                    return;
                }
                try {
                    let value = await query();
                    value = value.filter(item => {
                        return item.score >= 90 && (new Date(item.time) - new Date('2021-12-03')) > 0;
                    });
                    values = values.concat(value);
                } catch (_) { }
                next();
            };
            next();
        });
    });
};
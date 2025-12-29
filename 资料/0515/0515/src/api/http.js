import axios from "axios";
import baseConfig from "./base";
import qs from 'qs';
import utils from '@/assets/utils';
const { isPlainObject } = utils;

const http = axios.create();
baseConfig(http);
http.defaults.baseURL = '/api';
http.defaults.transformRequest = data => {
    if (isPlainObject(data)) data = qs.stringify(data);
    return data;
};

export default http;


/* import axios from "axios";
import qs from 'qs';
import utils from '@/assets/utils';
import { ElMessage } from 'element-plus';
const { isPlainObject, storage } = utils;

// 创建和axios类似的一个实例，之前基于axios.xxx()发送请求，现在也可以基于http.xxx()发送请求，语法一致；
const http = axios.create({
    baseURL: '/api',
    timeout: 60000
});

// 只针对于POST系列请求的，请求主体内容进行格式化处理；按照后台的要求处理；不设置transformRequest，会把DATA对象转换为JSON字符串传递给服务器；Axios内部会识别常用的数据格式，自动设置请求头中的Content-Type；
http.defaults.transformRequest = data => {
    if (isPlainObject(data)) data = qs.stringify(data);
    return data;
};

http.defaults.validateStatus = status => {
    return status >= 200 && status < 400;
};

// 请求拦截器:在所有配置项处理完，即将按照配置项向服务器发送请求之前，先执行请求拦截器，我们在请求拦截器中，可以对处理好的配置项再进行修改！！
http.interceptors.request.use(config => {
    // config:目前处理好的配置项
    let token = storage.get('token');
    if (token) config.headers.authorzation = token;
    // 最后会按照RETURN的配置项发送请求
    return config;
});

// 响应拦截器:请求结束(返回一个promise实例)，再即将执行我们设定的THEN/CATCH之前，触发响应拦截器
http.interceptors.response.use(response => {
    // 请求成功后:我们返回响应主体信息
    return response.data;
}, reason => {
    // 请求失败后:根据不同的失败情况,做不同的提示
    let status = reason?.response?.status,
        code = reason?.code;
    if (status) {
        // 服务器有返回结果,但是状态码没有经过validateStatus的校验
        switch (+status) {
            case 404:
                ElMessage.error('请求地址不存在，请更正~~');
                break;
            case 500:
                ElMessage.error('服务器发生未知错误，请联系管理员~~');
                break;
            // ...
        }
    } else if (code === 'ECONNABORTED') {
        // 请求超时
        ElMessage.error('当前请求已超时，请稍后再试~~');
    } else if (axios.isCancel(reason)) {
        // 请求中断
        ElMessage.error('当前请求被中断了，请检查代码~~');
    } else {
        // 断网处理
        ElMessage.error('当前网络繁忙，请稍后再试~~');
    }
    // 提示过后,还是继续执行用户自己设定的CATCH方法
    return Promise.reject(reason);
});

export default http; */
/* 提取多套配置项公共的部分 */
import utils from '@/assets/utils';
import { ElMessage } from 'element-plus';
const { storage } = utils;

export default function baseConfig(instance) {
    // 基础配置
    instance.defaults.baseURL = "";
    instance.defaults.timeout = 60000;
    instance.defaults.validateStatus = status => {
        return status >= 200 && status < 400;
    };
    // 拦截器
    instance.interceptors.request.use(config => {
        let token = storage.get('token');
        if (token) config.headers.authorzation = token;
        return config;
    });
    instance.interceptors.response.use(response => {
        return response.data;
    }, reason => {
        let status = reason?.response?.status,
            code = reason?.code;
        if (status) {
            switch (+status) {
                case 404:
                    ElMessage.error('请求地址不存在，请更正~~');
                    break;
                case 500:
                    ElMessage.error('服务器发生未知错误，请联系管理员~~');
                    break;
            }
        } else if (code === 'ECONNABORTED') {
            ElMessage.error('当前请求已超时，请稍后再试~~');
        } else if (axios.isCancel(reason)) {
            ElMessage.error('当前请求被中断了，请检查代码~~');
        } else {
            ElMessage.error('当前网络繁忙，请稍后再试~~');
        }
        return Promise.reject(reason);
    });
};
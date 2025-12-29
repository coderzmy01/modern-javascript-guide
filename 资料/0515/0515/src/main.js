import { createApp } from 'vue'
import App from './App.vue'
import _ from '@/assets/utils'
import md5 from 'blueimp-md5'
import http from './api/http'
import http2 from './api/http2'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.mount('#app')

// const source = axios.CancelToken.source();
// cancelToken: source.token,
// source.cancel('我取消了请求');

http.post('/user/login', {
    account: '18310612838',
    password: md5('1234567890')
}).then(value => {
    console.log('登录成功-->', value);
    _.storage.set('token', value.token);

    // 登录后获取员工列表
    return http.get('/user/list', {
        params: {
            departmentId: 0,
            search: ''
        }
    });
}).then(value => {
    console.log('请求成功-->', value);
});

// 简书
http2.get('/subscriptions/recommended_collections').then(value => {
    console.log('请求成功-->', value);
});
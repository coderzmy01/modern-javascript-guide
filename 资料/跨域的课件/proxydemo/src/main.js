import { createApp } from 'vue';
import App from './App.vue';

import axios from 'axios';

// 真实发送请求的地址：http://127.0.0.1:3000/api/subscriptions/recommended_collections
//   + 不加pathRewrite：向简书这样发送请求  https://www.jianshu.com/asimov/api/subscriptions/recommended_collections
//   + 设置了pathRewrite：https://www.jianshu.com/asimov/subscriptions/recommended_collections
axios.get('/api/subscriptions/recommended_collections')
    .then(response => {
        console.log('简书:', response.data);
    });

axios.get('/zhihu/news/latest')
    .then(response => {
        console.log('知乎:', response.data);
    });

const app = createApp(App);
app.mount('#app');
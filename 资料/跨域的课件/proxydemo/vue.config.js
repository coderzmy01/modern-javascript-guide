const ENV = process.env.NODE_ENV;
module.exports = {
    lintOnSave: ENV !== 'production',
    publicPath: './',
    productionSourceMap: false,
    // 对webpack-dev-server的配置
    devServer: {
        // 配置跨域代理「可以配置对多台服务器的代理」
        proxy: {
            // 所有以“/api”开始的请求，都发送到代理服务器「走这个配置」
            "/api": {
                target: "https://www.jianshu.com/asimov",
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ""
                }
            },
            // 所有以“/zhihu”开始的请求，都代理到知乎服务器
            "/zhihu": {
                target: "https://news-at.zhihu.com/api/4",
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    "^/zhihu": ""
                }
            }
        }
    }
};
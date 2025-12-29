const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave: false,
  publicPath: './',
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:9988',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/jianshu': {
        target: 'https://www.jianshu.com/asimov',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/jianshu': ''
        }
      }
    }
  }
})

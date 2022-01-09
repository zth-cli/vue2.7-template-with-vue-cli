module.exports = {
  devServer: {
    proxy: {
      '/': {
        target: 'http://127.0.0.1:8095', // 目标地址
        ws: true, // 是否代理websockets
        changeOrigin: true // 设置同源 默认false，是否需要改变原始主机头为目标URL,
      }
    }
  },
  // 基本路径
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/variables.scss` 这个文件
        prependData: '@import "@/assets/scss/mixin.scss";'
      }
    }
  },
  lintOnSave: false
}

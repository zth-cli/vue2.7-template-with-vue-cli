const AutoImport = require('unplugin-auto-import/webpack') // 自动导入相关插件 api
const Components = require('unplugin-vue-components/webpack')
const { ElementUiResolver } = require('unplugin-vue-components/resolvers')
module.exports = {
  configureWebpack: {
    plugins: [
      AutoImport({
        imports: ['vue', 'vue-router', 'vuex'], // 自动导入vue和vue-router等相关函数
        eslintrc: {
          enabled: false, // 若没此json文件，先开启，生成后在关闭
          filepath: './.eslintrc-auto-import.json', // 默认
          globalsPropValue: true,
        },
        resolvers: [ElementUiResolver({ importStyle: false })],
        // dts: "src/auto-import.d.ts" // 生成 `auto-import.d.ts` 全局声明
      }),
      Components({
        dirs: ['src/components', 'src/widgets'], // 扫描目录
        deep: true,
        resolvers: [ElementUiResolver({ importStyle: false })], // 自动引入element-ui组件
      }),
    ],
  },
  devServer: {
    port: 8088,
    proxy: {
      '/': {
        target: 'http://10.172.246.227:8095/', // 目标地址
        ws: true, // 是否代理websockets
        changeOrigin: true, // 设置同源 默认false，是否需要改变原始主机头为目标URL,
      },
    },
  },
  // 基本路径
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/variables.scss` 这个文件
        prependData: '@import "@/assets/scss/mixin.scss";',
      },
    },
  },
  lintOnSave: false,
}

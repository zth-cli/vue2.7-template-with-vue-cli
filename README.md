## vue2.7 + elementui + eslint 的项目模板

**语法高亮提示推荐使用`Volar`, 代替之前的`Vetur`**

- [升级 vue 版本到 2.7](https://juejin.cn/post/7115361618774622216), 可以提前体验 vue3 的新特性, 包括 vue3 的`conposition-api`, `<setup>`语法等,
  当然你也继续使用 vue2 的 options 语法。

- `elementui`升级到`2.15.7`版本,暂时没有遇到兼容问题

- 重新配置`eslint`, 统一代码规范, 提升代码的质量

- 添加`unplugin-vue-component`插件, 自动按需导入组件

- 修改优化样式,默认调控云配色风格, 细节打磨提升体验

- `utils/index.js`文件中整理添加了一些常用工具方法, 可以方便的使用

- 重新组织`axios`请求库, 易用拓展

## 依赖安装

```
npm install
# or
yarn
```

### 本地开发

```
npm run serve
#or
yarn serve
```

### 构建生产版本

```shell
npm run build
#or
yarn build
```

### Lints and fixes files

```
npm run lint
```

#### 快速构建部署命令

自动部署测试环境

```
npm run build:auto
```

需在`autoDeploy.js`配置部署路径

#### 系统配置

```shell
src/contants/settings.js
包含一些项目的基础设置,如项目名称, 是否默认侧边栏布局等.
```

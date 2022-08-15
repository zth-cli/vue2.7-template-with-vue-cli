## vue2.7 + elementui + eslint 的项目模板

- 升级vue版本到2.7, 可以提前体验vue3的新特性, 包括vue3的`conposition-api`, `<setup>`语法等,
当然你也继续使用vue2的options语法。

- `elementui`升级到`2.15.7`版本,暂时没有遇到兼容问题

- 重新配置`eslint`, 统一代码规范, 提升代码的质量

- 添加`unplugin-vue-component`插件, 自动按需导入组件

- 修改优化样式, 提升体验


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
  src/settings.js
  包含一些项目的基础设置,如项目名称, 是否默认侧边栏布局等.
  ```
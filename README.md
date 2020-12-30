# 基于Vue+Element的项目模板

## 依赖安装
```
npm install
```

### 本地开发
```
npm run serve
```

### 构建生产
```shell
npm run build
```

### 测试
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

#### 构建命令变更

发布(武汉)测试环境
``` 
npm run build:dev
```
发布网宿云环境

``` 
npm run build:build
```
> 这两个命令会自动替换接口IP地址，无需发布不同环境是手动更改ipconfig.js

之前的命令依然有效

``` 
npm run build:auto
```

## 目录结构
```
├─.vscode
├─public          
|      ├─theme               ---Element编译成css后的主题文件      
└─src
    ├─api               ---http封装
    ├─assets            ---静态资源
    │  └─less
    │      └─variables.less     ---自定义css变量
    ├─components        ---公共组件
    │  └─DynamicComponents
    ├─router            ---路由
    ├─mock              ---路由和导航list集合
    ├─utils             ---工具类
    ├─store             ---状态管理，管理布局主题
    └─views             ---视图页面
        ├─data-standrand
        │  └─dmg-xydy
        │      ├─components
        │      └─g6_config
        └─Home
            └─components
            
```

## CURD 布局组件

>封装业务相似代码，减少重复编码

最终目的时通过简单的几项配置，完成经常遇到的curd的表格业务

#### 1.使用案例
```js

<template>
  <CurdView
    :tableOptions="tableOptions"
    @selection-change="onTableselected"
    @change="getInputParams"
    @row-dblclick="rowDblclick"
    @row-click="rowClick"
  >
    <template v-slot:tool>
      <el-button type="default">新增</el-button>
    </template>
    <template v-slot:pannel>
      <el-button type="default" shape="circle" icon="ios-build">日志推送</el-button>
    </template>
    <template v-slot:action="Props">
      <el-button type="error" size="small" @click="remove(Props)">Delete</el-button>
    </template>
    <template v-slot:operation="Props">
      <el-button type="error" size="small" @click="remove(Props)">删除</el-button>
    </template>
  </CurdView>
</template>

<script>
const tableOptions = {
  pageSize: 20,
  dataUrl: "/data-project-management-service/project/getProject",
  param: {},
  columns: [
    { type: "selection", width: 60, align: "center" },
    { key: "creator", title: "角色名", align: "center", width: 180 },
    { key: "id", title: "角色名ID", align: "center", width: 180 },
    { key: "projectName", title: "项目名", align: "center", width: 180 },
    { key: "createDate", title: "创建时间", align: "center", width: 180 },
    { key: "description", title: "角色描述", align: "center" },
    { title: "Action", slot: "action", width: 150, align: "center" },
    { title: "操作", slot: "operation", width: 150, align: "center" }
  ],
  searchDynamic: [
    { name: "name", type: "text", span: 6, label: "角色名" },
    { name: "description", label: "角色描述", span: 6, type: "text" }
  ]
};
import CurdView from "@/components/CurdView/index";
export default {
  data() {
    return {
      tableOptions
    };
  },
  components: { CurdView },
  methods: {
    onTableselected(selection) {
      console.log(selection);
    },
    getInputParams(params) {
      console.log(params);
    },
    rowDblclick(selection) {
      console.log(selection);
    },
    rowClick(selection) {
      console.log(selection);
    },
    remove(obj) {
      alert(obj.rowData.index);
    }
  }
};
</script>
<style lang='less'>
</style>
```
显示如下(样式颜色可能会有不一样):
![image](./images/demo.png)
#### 2. API

 > CurdView props 

 
 ```js
 tableOptions:{ //Object类型，包含组件所有属性的集合
    pageAlign:'center', //String类型,分页布局位置，默认center，可选，left，right
    tableSize:'small', //String类型,表格尺寸，可选值为 large、small、default 或者不填
    pageSize:10, //Number类型,分页条数
    showOpratingToolbar:true, //Boolean类型，是否显示表格操作栏，true为显示。false为不显示
    showSettingToolbar:true, //Boolean类型，是否显示表格操作栏，true为显示。false为不显示
    showPage:true, // Boolean类型，是否显示分页，默认为true显示，false不显示
    lazy:false, // Boolean类型，初始化时，时候调用业务接口,默认false
    columns:[], // Arrary类型,表格列的配置描述，具体参照Element文档
    dataUrl:'',//String类型,表格列表查询接口地址,
    param:{}, //Object类型,dataUrl接口的参数,默认参数包含currentPage,pageSize,相同参数会自动合并
    height:400, //Number | String类型，表格高度，单位 px，设置后，如果表格内容大于此值，会固定表头
    searchDynamic:[], //Arrary类型,是一个包含查询条件得集合，具体可看使用案例，name属性及为v-model绑定属性。也应和查询参数名称保持一致
 }
//  暂时只有这么多，慢慢完善
 ```
 > CurdView events 

```js
selection-change // 在多选模式下有效，只要选中项发生变化时就会触发,返回值selection：已选项数据
row-dblclick // 双击表格ROW时触发,返回值selection：已点击数据
row-click // 单击表格ROW时触发,返回值selection：已点击数据
change // 查询条件发生改变时触发，返回值params:查询条件得集合
```

 >Slot 插槽

提供自定义功能
* 查询条件操作栏自定义,名称为tool得具名插槽,如下,添加一个**新增**按钮
```js
 <template v-slot:tool>
    <el-button type="default">新增</el-button>
</template>
```
显示如下(样式颜色可能会有不一样):
![image](./images/tool.png)

* 表格操作按钮，除了添加，编辑，删除外，可自定义其他内容，名称为panel得具名插槽,如下,添加一个**日志推送**按钮

```js
<template v-slot:pannel>
    <el-button type="default" shape="circle" icon="ios-build">日志推送</el-button>
</template>
```
显示如下(样式颜色可能会有不一样):
![image](./images/oprate.png)

* table的**Render 写法不变**，slot插槽主要使用了作用域插槽，`v-slot:action="Props"`,`action`即为插槽name，和clunms项的`slot: 'action'`必须保持一致(可看例子),
`Props`当前行数据 `row`，当前行序号 `index`。
>因为进行了封装，所以table自定义列模板和Element有点不一样，但是**Render 写法不变**，可按照Element官方文档书写，

```js
 <template v-slot:action="Props">
    <el-button type="default" size="small" @click="getRow(Props)">刷新</el-button>
 </template>
 <template v-slot:operation="Props">
    <el-button type="error" size="small" @click="getRow(Props)">删除</el-button>
 </template>
```
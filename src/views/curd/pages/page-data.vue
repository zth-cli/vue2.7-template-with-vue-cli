<template>
  <div class="primary-border-color">
    <CurdView
      :tableOptions="tableOptions"
      :fromOptions="fromOptions"
      :treeOptions="treeOptions"
      :beforeQuery="beforeQuery"
      @row-click="rowClick"
      @row-dblclick="rowDblclick"
      @selection-change="selectionChange"
      @node-click="nodeClick"
      @node-expand="nodeExpand"
      @tab-click="tabClick"
      @row-add="close = true"
    >
      <template v-slot:action="Props">
        <el-button size="small" @click="getRow(Props)">action</el-button>
      </template>
      <template v-slot:proflies="Props">
        <el-button size="small" @click="getRow(Props)">proflies</el-button>
      </template>
      <template v-slot:operation="Props">
        <el-button size="small" @click="getRow(Props)">operation</el-button>
      </template>
    </CurdView>
    <overlay :close.sync="close" owidth="70%" oheight="70vh" title="分时底码">
      <from-data v-if="close" :fromItem="fromItem" :before-submit="subFunc" :title="statusTitle" :postParams="postParams" :postUrl="postUrl1" />
    </overlay>
  </div>
</template>

<script>
import FromData from '@/components/FromData/index.vue'
const tableOptions = {
  pageSize: 20,
  showPanelTool: true,
  params: {},
  dataUrl: '/data-project-management-service/project/getProject',
  columns: [
    { type: 'index', label: '序号', align: 'center', width: 80 },
    { type: 'selection', width: 70, align: 'center' },
    { prop: 'creator', label: '采集点名称', align: 'center' },
    { prop: 'creator', label: '用户名称', align: 'center' },
    {
      label: '初冻结',
      align: 'center',
      headerAlign: 'center',
      children: [
        { prop: 'creator', label: '正向有功', align: 'center' },
        { prop: 'creator', label: '反向有功', align: 'center' },
        { prop: 'creator', label: '反向无功', align: 'center' },
        { prop: 'creator', label: '正向无功', align: 'center' }
      ]
    },
    {
      label: '末冻结',
      align: 'center',
      headerAlign: 'center',
      children: [
        { prop: 'creator', label: '正向有功', align: 'center' },
        { prop: 'creator', label: '反向有功', align: 'center' },
        { prop: 'creator', label: '反向无功', align: 'center' },
        { prop: 'creator', label: '正向无功', align: 'center' }
      ]
    },
    {
      label: '采集电量',
      align: 'center',
      headerAlign: 'center',
      children: [
        { prop: 'creator', label: '正向有功', align: 'center' },
        { prop: 'creator', label: '反向有功', align: 'center' },
        { prop: 'creator', label: '反向无功', align: 'center' },
        { prop: 'creator', label: '正向无功', align: 'center' }
      ]
    }
  ]
}
const fromOptions = [
  { name: 'description', label: '角色描述', span: 6, type: 'text' },
  {
    name: 'occurTime',
    label: '日期',
    span: 6,
    type: 'date',
    format: 'YYYY-MM-DD'
  },
  {
    name: 'code',
    label: '电压等级',
    type: 'select',
    options: []
  }
]
const treeOptions = {
  lazy: true,
  dataUrlArr: [
    {
      name: 'OMS档案',
      value: 'oms',
      urlArr: [
        { url: '/systemService/archive/getMeterTree?type=1', params: {} },
        {
          url: '/systemService/archive/getMeterTree?type=2',
          params: { subNo: '' }
        }
      ]
    },
    {
      name: '用采档案',
      value: 'audit',
      urlArr: [
        { url: '/dataservice/query/v1/getOrgTree?type=1', params: {} },
        {
          url: '/dataservice/query/v1/getOrgTree?type=2',
          params: { orgNo: '' }
        }
      ]
    }
  ]
}
const fromItem = [
  {
    name: 'breakerName',
    label: '开关名称',
    type: 'text',
    prepend: 'breaker',
    rules: [
      {
        required: true,
        message: '请输入名称',
        trigger: 'blur'
      }
    ]
  },
  {
    name: 'stId',
    label: '所属厂站',
    type: 'select',
    options: []
  },
  {
    name: 'date',
    label: '日期',
    type: 'date',
    format: 'yyyy-MM-dd',
    span: 12
  },
  {
    name: 'details',
    label: '所属厂站',
    type: 'editTable',
    span: 24,
    columns: [
      {
        name: 'username',
        label: '用户',
        type: 'text',
        with: 200
      },
      {
        name: 'username1',
        label: '用户1',
        type: 'textarea',
        with: 200,
        maxlength: 100
      },
      {
        name: 'content',
        label: '评价',
        type: 'select',
        multiple: true,
        options: [
          { label: '好评', value: '1' },
          { label: '中评', value: '2' }
        ],
        with: 200
      }
    ],
    // default: [{ username: 'rzx', username1: '认真细致', content: ['1'] }]
  }
]
export default {
  data() {
    return {
      close: false,
      tableOptions,
      fromOptions,
      treeOptions,
      tableData1: [],
      tabIndex: 0,
      fromItem,
      postParams: { details: [{ username: 'rzx', username1: '认真细致', content: ['1'] }] },
      statusTitle: '测试',
      postUrl1: './qw/12'
    }
  },
  components: { FromData },
  methods: {
    nodeClick({ data, node }) {
      console.log(data, node)
      if (node.level === 1) {
        this.treeOptions.dataUrlArr[this.tabIndex].urlArr[1].params.subNo = data.id
      }
    },
    rowClick(row) {
      console.log(row)
    },
    rowDblclick(row) {
      console.log(row)
    },
    selectionChange(selection) {
      console.log(selection)
    },
    getRow(row) {
      console.log(row)
    },
    nodeExpand(data, node) {
      console.log('expand==', data, node)
      if (node.level === 1) {
        if (this.tabIndex == 0) {
          this.treeOptions.dataUrlArr[this.tabIndex].urlArr[1].params.subNo = data.id
        }

        if (this.tabIndex == 1) {
          this.treeOptions.dataUrlArr[this.tabIndex].urlArr[1].params.orgNo = data.id
        }
      }
    },
    tabClick(val) {
      this.tabIndex = val
    },
    subFunc(data) {
      data['user'] = 'rzx'
      return data
    },
    beforeQuery(params) {
      const newParams = {testId:1, ...params}
      return newParams
    } 
  }
}
</script>

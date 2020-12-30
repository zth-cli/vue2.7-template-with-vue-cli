<template>
  <div class="primary-border-color">
    <CurdView
      :tableOptions="tableOptions"
      :fromOptions="fromOptions"
      :treeOptions="treeOptions"
      @row-click="rowClick"
      @row-dblclick="rowDblclick"
      @selection-change="selectionChange"
      @node-click="nodeClick"
      @node-expand="nodeExpand"
      @tab-click="tabClick"
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
    <overlay :close.sync="close" owidth="70%" oheight="7vh" title="分时底码">
      <div class="overlay_table">
        <el-table :data="tableData1" border style="width: 100%" size="mini">
          <el-table-column type="index" label="序号" width="80"></el-table-column>
          <el-table-column prop="username" label="时间" width="180"></el-table-column>
          <el-table-column prop="id" label="电表名称"></el-table-column>
          <el-table-column prop="id" label="采集点名称"></el-table-column>
          <el-table-column prop="id" label="正向有功"></el-table-column>
          <el-table-column prop="id" label="反向有功"></el-table-column>
        </el-table>
      </div>
    </overlay>
  </div>
</template>

<script>
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
        }]
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
export default {
  data () {
    return {
      close: false,
      tableOptions,
      fromOptions,
      treeOptions,
      tableData1: [],
      tabIndex: 0
    }
  },

  methods: {
    nodeClick ({ data, node }) {
      console.log(data, node)
      if (node.level === 1) { this.treeOptions.dataUrlArr[this.tabIndex].urlArr[1].params.subNo = data.id }
    },
    rowClick (row) {
      console.log(row)
    },
    rowDblclick (row) {
      console.log(row)
    },
    selectionChange (selection) {
      console.log(selection)
    },
    getRow (row) {
      console.log(row)
    },
    nodeExpand (data, node) {
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
    tabClick (val) {
      this.tabIndex = val
    }
  }
}
</script>

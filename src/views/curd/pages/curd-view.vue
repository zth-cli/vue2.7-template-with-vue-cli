<template>
  <div class="content">
    <CurdView
      :tableOptions="tableOptions"
      :fromOptions="fromOptions"
      :treeOptions="treeOptions"
      @selection-change="selectionChange"
      @node-click="treeNodeClick"
      @row-add='rowAdd'
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
    <overlay :close.sync='close' owidth='60vw' oheight='50vh' title="新增">
      <StepsFromData :stepsForm='stepsForm' :stepsLabel='stepsLabel'></StepsFromData>
    </overlay>
  </div>
</template>

<script>
import CurdView from '@/components/CurdViews/index.vue'
import StepsFromData from '@/components/StepsFromData/index.vue'
const tableOptions = {
  pageSize: 20,
  showPanelTool: true,
  params: {}, // params的改变都会触发，表格的重新查询
  dataUrl: '/data-project-management-service/project/getProject',
  columns: [
    { type: 'selection', width: 70, align: 'center' },
    { type: 'index', label: '序号', align: 'center', width: 80 },
    {
      label: '用户信息',
      align: 'center',
      headerAlign: 'center',
      children: [
        { prop: 'creator', label: '角色名', align: 'center', width: 180 },
        { prop: 'creator', label: '用户年龄', align: 'center' },
        { label: '用户', slot: 'proflies', align: 'center' },
        { label: '操作', slot: 'operation', width: 150, align: 'center' }
      ]
    },
    { label: 'Action', slot: 'action', width: 150, align: 'center' }
  ]
}
const fromOptions = [
  { name: 'description', label: '角色描述', span: 6, type: 'text' },
  {
    name: 'occurTime',
    label: '日期',
    span: 6,
    type: 'date',
    format: 'yyyy-MM-dd'
  },
  {
    name: 'code',
    label: '电压等级',
    type: 'select',
    options: []
  }
]
const treeOptions = {
  dataUrl: '/data-project-management-service/project/getProject'
}
export default {
  data () {
    return {
      tableOptions,
      fromOptions,
      treeOptions,
      stepsForm: [
        [{ name: 'description', label: '角色描述', type: 'text' }],
        [{
          name: 'code',
          label: '电压等级',
          type: 'select',
          options: []
        }],
        [{ name: 'des', label: '角色描述', type: 'text' }]
      ],
      stepsLabel: ['步骤一', '步骤二', '步骤三'],
      close: false
    }
  },
  components: { CurdView, StepsFromData },
  methods: {
    rowAdd () {
      this.close = true
    },
    selectionChange (selection) {
      console.log(selection)
    },
    getRow (row) {
      console.log(row)
    },
    treeNodeClick ({ data, node }) {
      console.log(data, node)
      //  合并操作，强制触发响应反应
      this.tableOptions.params = Object.assign({}, this.tableOptions.params, {
        stId: 1
      })
    }
  }
}
</script>
<style lang='scss'>
</style>

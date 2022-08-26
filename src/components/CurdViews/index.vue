<template>
  <div class="curd_view">
    <div class="curd_tree_view" v-if="treeOptions">
      <lazy-tree
        v-if="treeOptions.isLazyLoad"
        @changeSatus="trigger"
        @nodeClick="treeNodeClick"
        @node-expand="nodeExpand"
        @tab-click="tabClick"
        :renderFunction="treeOptions.renderContent"
        :dataUrlArr="treeOptions.dataUrlArr"
        :search="treeOptions.search"
        :isLazyLoad="treeOptions.isLazyLoad"
        :defaultExpandedNodes="treeOptions.defaultExpandedNodes"
        ref="lazyTree"
      >
        <template v-slot:searchselect>
          <slot name="searchselect"></slot>
        </template>
      </lazy-tree>
      <Tree
        v-else
        @changeSatus="trigger"
        @nodeClick="treeNodeClick"
        :renderFunction="treeOptions.renderContent"
        :dataUrl="treeOptions.dataUrl"
        :search="treeOptions.search"
        :defaultProps="treeOptions.defaultProps"
      ></Tree>
    </div>

    <div class="curd_table_view">
      <ConditionBar
        v-if="showSearchDynamic"
        :width="fromWidth"
        :mode="tableOptions.mode"
        :searchDynamic="fromOptions"
        :beforeQuery="beforeQuery"
        :title="title"
        @query="query"
        @params-change="paramsChange"
      >
        <template v-slot:tool>
          <slot name="tool"></slot>
        </template>
        <template v-slot:rtool>
          <slot name="rtool"></slot>
        </template>
        <template v-slot:ltool>
          <slot name="ltool"></slot>
        </template>
      </ConditionBar>
      <CurdTable
        ref="tableView"
        v-bind="tableOptions"
        @row-click="rowClick"
        @row-dblclick="rowDblclick"
        @row-add="addRow"
        @row-edit="editRow"
        @row-delete="deleteRows"
        @selection-change="selectionChange"
        @getTableData="getTableData"
        @current-change="handleCurrentChange"
      >
        <!-- 自定义表格slot -->
        <template v-for="item in slotArr" v-slot:[item.slot]="Props">
          <!--  父组件调用  老版本为：slot-scope="{ row, index }" -->
          <slot :name="item.slot" :rowData="Props.rowData"></slot>
        </template>
        <template v-for="item in headerSlotArr" v-slot:[item.headerSlot]="Props">
          <slot :name="item.headerSlot" :rowData="Props.rowData"></slot>
        </template>
        <template v-slot:panel>
          <slot name="panel"></slot>
        </template>
        <template v-slot:panel-gap>
          <slot name="panel-gap"></slot>
        </template>
      </CurdTable>
    </div>
  </div>
</template>

<script>
import Tree from './Tree'
import LazyTree from './LazyTree'
import CurdTable from './CurdTable'
import ConditionBar from './ConditionBar'

export default {
  name: 'CurdViews',
  data() {
    return {
      slotArr: [],
      headerSlotArr: [],
      toggle: true,
    }
  },
  props: {
    treeOptions: {},
    tableOptions: {},
    fromOptions: {
      type: Array,
      default: function () {
        return []
      },
    }, // 查询条件item，Array类型
    beforeQuery: {
      type: Function,
      default: function (formData) {
        return formData
      },
    }, // 查询前,请求前参数钩子
    fromWidth: {}, // 查询框得长度，String类型
    title: {}, // 当前页面标题，String类型
    showSearchDynamic: {
      // 是否显示查询框，提供某些情况下查询完全自定义
      type: Boolean,
      default: true,
    },
  },
  components: {
    CurdTable,
    Tree,
    ConditionBar,
    LazyTree,
  },
  created() {
    this.getSlot()
    this.getHeaderSlot()
  },
  methods: {
    // 获取table数据,推荐此做法获取tableData
    getTableData(rows) {
      this.$emit('getTableData', rows)
    },
    tableData() {
      // 此方法会直接暴露tableData，可对表格数据直接增删操作，建议在getTableData事件之后获取数据
      return this.$refs.tableView.tableData
    },
    rowClick(row) {
      this.$emit('row-click', row)
    },
    rowDblclick(row) {
      this.$emit('row-dblclick', row)
    },
    selectionChange(selection) {
      if (selection) {
        this.$emit('selection-change', selection)
      }
    },
    toggleRowSelection(rows) {
      this.$refs.tableView.toggleRowSelection(rows)
    },
    toggleAllSelection() {
      // 全选
      this.$refs.tableView.toggleAllSelection()
    },
    handleCurrentChange(row) {
      this.$emit('current-change', row)
    },
    deleteRows(rows) {
      this.$emit('row-delete', rows)
    },
    editRow(row) {
      this.$emit('row-edit', row)
    },
    addRow(bool) {
      this.$emit('row-add', bool)
    },
    paramsChange(params) {
      this.$emit('params-change', params)
      // eslint-disable-next-line vue/no-mutating-props
      this.tableOptions.params = Object.assign({}, this.tableOptions.params, params)
    },
    trigger(toggle) {
      this.toggle = toggle
    },
    treeNodeClick({ data, node }) {
      this.$emit('node-click', { data, node })
    },
    query() {
      this.$refs.tableView.queryData()
    },
    refresh() {
      this.$refs.tableView.queryData()
    },
    getSlot() {
      const that = this
      const mColumns = this.tableOptions.columns
      function Maps(mColumns) {
        mColumns.forEach((item) => {
          const keys = Object.keys(item)
          if (keys.includes('slot')) {
            that.slotArr.push(item)
            // console.log("slot=", that.slotArr);
          }
          if (item.children && item.children.length > 0) {
            Maps(item.children)
          }
        })
      }
      Maps(mColumns)
    },
    getHeaderSlot() {
      const that = this
      const mColumns = this.tableOptions.columns
      function Maps(mColumns) {
        mColumns.forEach((item) => {
          const keys = Object.keys(item)
          if (keys.includes('headerSlot')) {
            that.headerSlotArr.push(item)
          }
          if (item.children && item.children.length > 0) {
            Maps(item.children)
          }
        })
      }
      Maps(mColumns)
    },
    nodeExpand(data, node) {
      this.$emit('node-expand', data, node)
    },
    tabClick(val) {
      this.$emit('tab-click', val)
    },
  },
}
</script>
<style lang="scss">
.curd_view {
  display: flex;
  height: 100%;
}
.curd_tree_view {
  width: auto;
  min-height: 100%;
  border-radius: 0 4px 4px 0;
}
.curd_table_view {
  overflow: auto;
  padding: 12px;
  box-sizing: border-box;
  flex: 1;
  padding-top: 0;
  /* padding-right: 0; */
  .boxShadow {
    @include box-shadow();
  }
  .mb {
    margin-bottom: 12px;
  }
}
</style>

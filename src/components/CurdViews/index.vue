<template>
  <div class="curd_view">
    <div class="curd_tree_view" v-if="treeOptions">
      <lazy-tree v-if="treeOptions.lazy" @changeSatus="toggler" @nodeClick="treeNodeClick" @node-expand="nodeExpand"
        @tab-click="tabClick" :renderFunction="treeOptions.renderContent" :dataUrlArr="treeOptions.dataUrlArr"
        :search="treeOptions.search"></lazy-tree>
      <Tree v-else @changeSatus="toggler" @nodeClick="treeNodeClick" :renderFunction="treeOptions.renderContent"
        :dataUrl="treeOptions.dataUrl" :search="treeOptions.search"></Tree>
    </div>
    <div class="curd_table_view">
      <FromDynamic v-if="fromOptions" :searchDynamic="fromOptions" @query="query" @params-change="paramsChange"
        @select-form-change="handleSelectChange">
        <template v-slot:tool>
          <slot name="tool"></slot>
        </template>
      </FromDynamic>
      <CurdTable ref="table" :highlightCurrentRow="tableOptions.highlightCurrentRow" :columns="tableOptions.columns"
        :lazy="tableOptions.lazy" :dataUrl="tableOptions.dataUrl" :pageSize="tableOptions.pageSize"
        :params="tableOptions.params" :local="tableOptions.local" :height="tableOptions.height"
        :showPage="tableOptions.showPage" :showPanelTool="tableOptions.showPanelTool"
        :defaultPanel='tableOptions.defaultPanel' :border="tableOptions.border" :showSummary='tableOptions.showSummary'
        :showSettingTool="tableOptions.showSettingTool" @row-click="rowClick" @row-dblclick="rowDblclick"
        @row-add='addRow' @row-edit='editRow' @row-delete="deleteRows" @selection-change="selectionChange"
        @current-change="handleCurrentChange">
        <!-- 自定义表格slot -->
        <template v-for="(item) in slotArr" v-slot:[item.slot]="Props">
          <!--  父组件调用  老版本为：slot-scope="{ row, index }" -->
          <slot :name="item.slot" :rowData="Props.rowData"></slot>
        </template>
        <template v-slot:panel>
          <slot name="panel"></slot>
        </template>
      </CurdTable>
    </div>
  </div>
</template>

<script>
import Tree from './Tree'
import LazyTree from './LazyTree'
import CurdTable from './CurdTable'
import FromDynamic from './FromDynamic'

export default {
  data () {
    return {
      slotArr: [],
      toggle: true
    }
  },
  props: {
    treeOptions: {},
    tableOptions: {},
    fromOptions: {}
  },
  components: {
    CurdTable,
    Tree,
    FromDynamic,
    LazyTree
  },
  created () {
    this.getSlot()
  },
  methods: {
    rowClick (row) {
      this.$emit('row-click', row)
    },
    rowDblclick (row) {
      this.$emit('row-dblclick', row)
    },
    selectionChange (selection) {
      if (selection) {
        this.$emit('selection-change', selection)
      }
    },
    handleCurrentChange (row) {
      this.$emit('current-change', row)
    },
    deleteRows (rows) {
      this.$emit('row-delete', rows)
    },
    editRow (row) {
      this.$emit('row-edit', row)
    },
    addRow (bool) {
      this.$emit('row-add', bool)
    },
    paramsChange (params) {
      this.$emit('params-change', params)
      this.tableOptions.params = Object.assign({},
        this.tableOptions.params,
        params
      )
      // console.log( this.tableOptions.params);
    },
    toggler (toggle) {
      this.toggle = toggle
    },
    treeNodeClick ({
      data,
      node
    }) {
      this.$emit('node-click', {
        data,
        node
      })
    },
    query () {
      this.$refs.table.queryData()
    },
    refresh () {
      this.$refs.table.queryData()
    },
    getSlot () {
      var that = this
      const mColumns = this.tableOptions.columns

      function Maps (mColumns) {
        mColumns.forEach((item) => {
          const keys = Object.keys(item)
          if (keys.indexOf('slot') > 0) {
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
    nodeExpand (data, node) {
      this.$emit('node-expand', data, node)
    },
    tabClick (val) {
      this.$emit('tab-click', val)
    },
    handleSelectChange (val) {
      this.$emit('select-form-change', val)
    }
  }
}

</script>
<style>
  .curd_view {
    display: flex;
  }

  .curd_tree_view {
    width: auto;
    min-height: 100%;
    border-radius: 0 4px 4px 0;
  }

  .curd_table_view {
    overflow: auto;
    padding:0 12px;
    box-sizing: border-box;
    flex: 1;

  }

</style>

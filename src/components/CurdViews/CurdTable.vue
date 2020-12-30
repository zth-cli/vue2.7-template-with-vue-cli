<template>
  <div class="curd_table">
    <div class="panel_tool_left" v-if="showPanelTool">
      <el-button
        icon="el-icon-plus"
        size="mini"
        v-if="defaultPanel.includes('add')"
        type="primary"
        @click="addRow()"
        >新增</el-button
      >
      <el-button
        icon="el-icon-edit"
        size="mini"
        v-if="defaultPanel.includes('edit')"
        type="primary"
        :disabled="isSingle"
        @click="editRow()"
        >修改</el-button
      >
      <el-popover placement="top" width="160" v-model="visible">
        <p>确定删除吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="visible = false"
            >取消</el-button
          >
          <el-button
            type="primary"
            size="mini"
            @click="
              visible = false;
              deleteRows();
            "
            >确定</el-button
          >
        </div>
        <el-button
          v-if="defaultPanel.includes('delete')"
          icon="el-icon-circle-close"
          slot="reference"
          type="danger"
          class="warning"
          :disabled="isMultiple"
          size="mini"
          >删除
        </el-button>
      </el-popover>
      <slot name="panel"></slot>
    </div>
    <div class="panel_tool_right" v-if="showSettingTool">
      <el-button
        type="primary"
        icon="el-icon-refresh"
        size="mini"
        @click="queryData"
      ></el-button>
      <el-popover type="primary" placement="bottom-end" width="200" trigger="click">
        <div style="margin: 5px 0">
          <div>
            <div v-for="(col, index) in columns" :key="index">
              <el-checkbox
                @change="columnsChange"
                v-if="col.label"
                v-model="col.show"
                :label="col.label"
              >
                {{ col.label }}
              </el-checkbox>
            </div>
          </div>
          <div></div>
        </div>
        <el-button
          slot="reference"
          size="mini"
          icon="el-icon-caret-bottom"
        ></el-button>
      </el-popover>
    </div>
    <div class="curd_table_main">
      <DataTable
        :columns="mColumns"
        :tableData="tableData"
        :border="border"
        :size="tableSize"
        :height="height"
        :showSummary="showSummary"
        :highlight-current-row="highlightCurrentRow"
        @row-click="rowClick"
        @row-dblclick="rowDblclick"
        @selection-change="selectionChange"
        @current-change="handleCurrentChange"
        style="width: 100%"
        v-loading="loading"
        :key="key"
      >
        <template v-for="item in slotArr" v-slot:[item.slot]="Props">
          <slot :name="item.slot" :rowData="Props.rowData"></slot>
        </template>
        <template v-slot:index="Props">
          <slot name="index" v-if="showPage">
            {{
              Props.rowData.index +
              (pageParam.pageIndex - 1) * pageParam.pageSize +
              1
            }}</slot
          >
          <slot name="index" v-else>{{ Props.rowData.index + 1 }}</slot>
        </template>
      </DataTable>
    </div>
    <div v-if="showPage" style="margin: 20px 10px; overflow: hidden">
      <div :style="'text-align: ' + this.pageAlign">
        <el-pagination
          :total="total"
          :page-size="pageParam.pageSize"
          :current-page="pageParam.pageIndex"
          @current-change="changePage"
          @size-change="changePageSize"
          :size="tableSize"
          layout="total, sizes, prev, pager, next"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import DataTable from './DataTable'
import { apiGet } from '@/api'
export default {
  props: {
    defaultPanel: {
      type: Array,
      default: function () {
        return ['add', 'edit', 'delete']
      }
    },
    pageAlign: {
      default: 'right'
    },
    tableSize: {
      default: 'small'
    },
    pageSize: {
      default: 20
    },
    showPage: {
      type: Boolean,
      default: true
    },
    highlightCurrentRow: {
      type: Boolean,
      default: false
    },
    lazy: {
      type: Boolean,
      default: false
    },
    columns: {},
    dataUrl: {},
    params: {},
    height: { default: '53vh' },
    showSummary: { default: false },
    border: {
      type: Boolean,
      default: true
    },
    resizable: {
      type: Boolean,
      default: true
    },
    showSettingTool: {
      type: Boolean,
      default: true
    },
    showPanelTool: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      loading: false,
      visible: false,
      tableData: [
        {
          creator: 'rzx007',
          id: 12,
          projectName: 'name',
          createDate: '12-11',
          description: 'w21'
        }, {
          creator: 'rzx007',
          id: 12,
          projectName: 'name',
          createDate: '12-11',
          description: 'w21'
        }
      ],
      mColumns: [],
      selection: [],
      total: 0,
      pageParam: {
        pageIndex: 1,
        pageSize: 10
      },
      slotArr: [],
      lazyLoad: this.lazy,
      columnList: [],
      key: 0
    }
  },
  components: {
    DataTable
  },
  computed: {
    isSingle () {
      return !(this.selection !== null && this.selection.length === 1)
    },
    isMultiple () {
      return !(this.selection != null && this.selection.length > 0)
    }
  },
  methods: {
    queryData () {
      if (!this.dataUrl || this.loading === true) {
        return
      }
      this.selection = null
      this.$emit('selection-change', null)
      this.loading = true
      const params = this.showPage
        ? Object.assign(
          {},
          JSON.parse(JSON.stringify(this.pageParam)),
          this.params
        )
        : this.params
      apiGet(this.dataUrl, params)
        .then((res) => {
          this.loading = false
          if (!res.data.code === 0) {
          } else {
            this.total = res.data.pojoTotalCount
            this.tableData = res.data.data.list
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    changePage (page) {
      this.pageParam.pageIndex = page
      this.queryData()
    },
    changePageSize (pageSize) {
      this.pageParam.pageIndex = 1
      this.pageParam.pageSize = pageSize
      this.queryData()
    },
    rowClick (row) {
      // this.$refs.table.toggleAllSelection();
      this.$emit('row-click', row)
    },
    rowDblclick (row) {
      this.$emit('row-dblclick', row)
    },
    selectionChange (selection) {
      this.selection = selection
      this.$emit('selection-change', selection)
    },
    handleCurrentChange (row) {
      this.$emit('current-change', row)
    },
    addRow () {
      this.$emit('row-add', true)
    },
    editRow () {
      // 防止修改时，篡改table里的数据
      this.$emit('row-edit', Object.assign({}, this.selection[0]))
    },
    deleteRows () {
      this.$emit('row-delete', this.selection)
    },
    getSlot () {
      var that = this
      const mColumns = this.mColumns

      function Maps (mColumns) {
        mColumns.forEach((item) => {
          const keys = Object.keys(item)
          if (keys.indexOf('slot') > 0) {
            that.slotArr.push(item)
          }
          if (item.children && item.children.length > 0) {
            Maps(item.children)
          }
        })
      }
      Maps(mColumns)
    },
    columnsChange () {
      const list = []
      for (let key = 0; key < this.columns.length; key++) {
        if (this.columns[key] instanceof Object && this.columns[key].show) {
          list.push(this.columns[key])
        }
      }
      this.key = this.key + Math.random()
      this.mColumns = list
      this.$nextTick(() => {
        this.mColumns = list
        // this.$refs.tableView.doLayout();
      })
    }
  },
  created () {
    if (!this.showPage) {
      delete this.pageParam.pageSize
      delete this.pageParam.pageIndex
    }
    this.mColumns = this.columns
    this.getSlot()

    if (this.pageSize != null && this.showPage) {
      this.pageParam.pageSize = this.pageSize
    }
    if (!this.lazyLoad) {
      this.queryData()
    }
    this.columns.forEach((item) => {
      item.show = true
    })
  },
  watch: {
    params: {
      handler (curVal) {
        // console.log(curVal);
        if (this.showPage) {
          this.pageParam.pageIndex = 1
        }
        if (!this.lazyLoad) {
          this.queryData()
        }
        this.lazyLoad = false
      },
      deep: true
    },
    columns: {
      handler (curVal) {
        this.mColumns = curVal
      },
      deep: true
    }
  }
}
</script>
<style lang='scss'>
.curd_table {
  // background-color: #fff;
  @include content-background();
  padding: 10px;
  /* margin-top: 20px; */
  border-radius: 4px;
  @include box-shadow();
  .panel_tool_left {
    float: left;
   color: #666;
    font-size: 14px;
  }
  .el-table--striped .el-table__body tr.el-table__row--striped td{
    @include striped-background();
  }
.panel_tool_right {
  float: right;
  padding-bottom: 8px;
}
button {
    margin-left: 8px;
  }
}
</style>

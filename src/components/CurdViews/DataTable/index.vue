<!--<template>
  <div>
    <template v-for="(item,index) in columns">
      <TableColumn
        v-if="item.type==='selection'"
        type="selection"
        :key="index+'selection'"
        :width="item.width"
        fixed
      ></TableColumn>
      <template v-else>
        <TableColumn
          v-if="!item.slot"
          :type="item.type"
          :prop="item.prop"
          :label="item.label"
          :key="index"
          :width="item.width"
        >
          <template v-if="item.children&&item.children.length > 0">
            <DataTable :columns="item.children"></DataTable>
          </template>
        </TableColumn>
        <TableColumn v-else :label="item.label" :key="index">
          <template slot-scope="scope">
            {{item.slot}}
            <slot :name="item.slot" :rowData="{row:scope.row,index:scope.$index}"></slot>
          </template>
        </TableColumn>
      </template>
    </template>
  </div>
</template>-->

<script>
import { Table as ElTable, TableColumn, Checkbox as ElCheckbox, Tag } from 'element-ui'
export default {
  name: 'DataTable',
  components: { ElTable, TableColumn, ElCheckbox, Tag },
  data() {
    return {}
  },
  props: {
    columns: {
      type: Array,
      required: true,
    },
    tableData: {
      type: Array,
    },
    tableSize: {
      default: 'mini',
    },
    pageSize: {
      default: 20,
    },
    pageIndex: {
      default: 1,
    },
    showSettingToolbar: {
      type: Boolean,
      default: true,
    },
    showPage: {
      type: Boolean,
      default: true,
    },
    highlightCurrentRow: {
      type: Boolean,
      default: false,
    },
    lazy: {
      type: Boolean,
      default: false,
    },
    dataUrl: {},
    params: {},
    height: {
      default: '53vh',
    },
    border: {
      type: Boolean,
      default: true,
    },
    showSummary: {
      type: Boolean,
      default: false,
    },
    summaryMethod: {
      // 合计自定义方法
      type: Function,
    },
    spanMethod: {
      // 合并单元格
      type: Function,
      default: function () {
        return {
          rowspan: 1,
          colspan: 1,
        }
      },
    },
    rowKey: { type: String, default: 'id' }, // 支持树类型的数据的显示,rowKey不为空时生效
    treeProps: {
      type: Object,
      default: function () {
        return { children: 'children', hasChildren: 'hasChildren' }
      },
    },
    stripe: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    renderFunc(columns, h) {
      const that = this
      let children = []
      const elememtArr = columns.map((item) => {
        // 参照elementui Table-column Attributes
        const columnProps = {
          label: item.label,
          width: item.width,
          minWidth: item.minWidth,
          fixed: item.fixed || false,
          renderHeader: item.renderHeader,
          resizable: item.resizable || true,
          align: item.align || 'left',
          headerAlign: item.headerAlign,
          showOverflowTooltip: true,
          sortable: item.sortable || false,
          sortMethod: item.sortMethod,
          sortBy: item.sortBy,
          filters: item.filters,
          filteredValue: item.filteredValue,
        }
        if (item.filters) {
          columnProps.filterMethod = item.filterMethod ? item.filterMethod : that.filterHandler
        }
        if (item.type === 'index') {
          return h('TableColumn', {
            props: { ...columnProps },
            scopedSlots: {
              // scope 就相当于 slot-scope="{title}" 里面的值
              default: (scope) => {
                let index = null
                let indexEle = ''
                // eslint-disable-next-line no-unused-expressions
                that.showPage
                  ? (index = (that.pageIndex - 1) * that.pageSize + scope.$index + 1)
                  : (index = scope.$index + 1)
                if (item.slot) {
                  // type为index 且有slot，提供插槽功能
                  indexEle = that.$scopedSlots[item.slot]({
                    rowData: {
                      row: scope.row,
                      colum: scope.column,
                      index: scope.$index,
                    },
                  })
                }
                return [h('p', [indexEle, h('span', index)])]
              },
            },
          })
        }
        if (item.type === 'selection') {
          return h('TableColumn', {
            props: {
              ...columnProps,
              type: item.type,
            },
          })
        }
        if (item.type === 'expand') {
          return h('TableColumn', {
            props: { ...columnProps, type: item.type },
            scopedSlots: {
              // scope 就相当于 slot-scope="{title}" 里面的值
              default: (scope) => {
                return [
                  h('p', [
                    that.$scopedSlots[item.slot]({
                      rowData: {
                        row: scope.row,
                        colum: scope.column,
                        index: scope.$index,
                      },
                    }),
                  ]),
                ]
              },
            },
          })
        }
        if (item.headerSlot && !item.slot) {
          // slot,自定义列模板
          return h('TableColumn', {
            props: {
              label: item.label,
              width: item.width,
              ...columnProps,
            },
            scopedSlots: {
              // scope 就相当于 slot-scope="{title}" 里面的值
              header: (scope) => {
                return [
                  h('p', [
                    that.$scopedSlots[item.headerSlot]({
                      rowData: {
                        row: scope.row,
                        colum: scope.column,
                        index: scope.$index,
                      },
                    }),
                  ]),
                ]
              },
            },
          })
        }
        if (item.headerSlot && item.slot) {
          // slot,自定义列模板
          return h('TableColumn', {
            props: {
              label: item.label,
              width: item.width,
              ...columnProps,
            },
            scopedSlots: {
              // scope 就相当于 slot-scope="{title}" 里面的值
              default: (scope) => {
                return [
                  h('p', [
                    that.$scopedSlots[item.slot]({
                      rowData: {
                        row: scope.row,
                        colum: scope.column,
                        index: scope.$index,
                      },
                    }),
                  ]),
                ]
              },
              header: (scope) => {
                return [
                  h('p', [
                    that.$scopedSlots[item.headerSlot]({
                      rowData: {
                        row: scope.row,
                        colum: scope.column,
                        index: scope.$index,
                      },
                    }),
                  ]),
                ]
              },
            },
          })
        }
        if (!item.headerSlot && item.slot) {
          // slot,自定义列模板
          return h('TableColumn', {
            props: {
              label: item.label,
              width: item.width,
              ...columnProps,
            },
            scopedSlots: {
              // scope 就相当于 slot-scope="{title}" 里面的值
              default: (scope) => {
                return [
                  h('p', [
                    that.$scopedSlots[item.slot]({
                      rowData: {
                        row: scope.row,
                        colum: scope.column,
                        index: scope.$index,
                      },
                    }),
                  ]),
                ]
              },
            },
          })
        }
        if (item.prop && item.enum) {
          const enums = item.enum

          return h('TableColumn', {
            props: {
              label: item.label,
              width: item.width,
              ...columnProps,
            },
            scopedSlots: {
              default: (scope) => {
                let node = null
                for (let index = 0; index < enums.length; index++) {
                  const element = enums[index]
                  if (element.id === scope.row[item.prop]) {
                    node = h(
                      Tag,
                      {
                        props: {
                          size: 'mini',
                          type: element.type ? element.type : '',
                        },
                      },
                      [element.value]
                    )
                    break
                  }
                }
                return node
              },
            },
          })
        }
        if (item.children && item.children.length > 0) {
          children = that.renderFunc(item.children, h) // 嵌套表头，递归、
        } else {
          children = []
        }
        return h(
          'TableColumn',
          {
            props: {
              prop: item.prop,
              // type: item.type,
              ...columnProps,
            },
          },
          [children]
        )
      })
      return elememtArr
    },
    toggleRowSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          setTimeout(() => {
            this.$refs.tableView.toggleRowSelection(row)
          }, 0)
        })
      } else {
        this.$refs.tableView.clearSelection()
      }
    },
    toggleAllSelection() {
      this.$refs.tableView.toggleAllSelection()
    },
    filterHandler(value, row, column) {
      const property = column.property
      return row[property] === value
    },
  },
  render() {
    const that = this
    const elememtArr = this.renderFunc(that.columns, that.$createElement)
    return this.$createElement(
      ElTable,
      {
        ref: 'tableView',
        props: {
          rowKey: that.rowKey, // 支持树类型的数据的显示,必须要指定 row-key
          treeProps: that.treeProps,
          data: that.tableData,
          border: that.border,
          size: that.tableSize,
          height: that.height,
          maxHeight: that.maxHeight,
          highlightCurrentRow: that.highlightCurrentRow,
          showSummary: that.showSummary,
          summaryMethod: that.summaryMethod,
          spanMethod: that.spanMethod,
          stripe: that.stripe,
        },
        style: {
          width: '100%',
        },
        on: {
          'row-click': (row) => {
            that.$emit('row-click', row)
          },
          'row-dblclick': (row) => {
            that.$emit('row-dblclick', row)
          },
          'selection-change': (selection) => {
            that.$emit('selection-change', selection)
          },
          'current-change': (row) => {
            that.$emit('current-change', row)
          },
        },
      },
      elememtArr
    )
  },
  updated() {
    this.$nextTick(() => {
      this.$refs.tableView.doLayout()
    })
  },
}
</script>
<style></style>

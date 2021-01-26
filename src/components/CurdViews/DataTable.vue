 <!--<template>
  <div>
    <template v-for="(item,index) in columns">
      <el-table-column
        v-if="item.type==='selection'"
        type="selection"
        :key="index+'selection'"
        :width="item.width"
        fixed
      ></el-table-column>
      <template v-else>
        <el-table-column
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
        </el-table-column>
        <el-table-column v-else :label="item.label" :key="index">
          <template slot-scope="scope">
            {{item.slot}}
            <slot :name="item.slot" :rowData="{row:scope.row,index:scope.$index}"></slot>
          </template>
        </el-table-column>
      </template>
    </template>
  </div>
</template>-->

<script>
export default {
  name: 'DataTable',
  data () {
    return {
      user: 'rzx'
    }
  },
  props: {
    columns: {
      type: Array,
      required: true
    },
    tableData: {
      type: Array
    },
    tableSize: {
      default: 'mini'
    },
    pageSize: {
      default: 20
    },
    showSettingToolbar: {
      type: Boolean,
      default: true
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
    dataUrl: {},
    params: {},
    height: {
      default: '53vh'
    },
    border: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    renderFunc (columns, h) {
      var that = this
      let children = []
      const elememtArr = columns.map((item) => {
        const columnProps = {
          label: item.label,
          width: item.width,
          minWidth: item.minWidth,
          fixed: item.fixed || false,
          renderHeader: item.renderHeader,
          resizable: item.resizable || true,
          align: item.align || 'left',
          headerAlign: item.headerAlign,
          showOverflowTooltip: item.showOverflowtooltip
        }
        if (item.slot) {
          // slot,自定义列模板
          return h('el-table-column', {
            props: {
              label: item.label,
              width: item.width,
              ...columnProps
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
                        index: scope.$index
                      }
                    })
                  ])
                ]
              }
            }
          })
        }
        if (item.prop && item.enum) {
          const enums = item.enum

          return h('el-table-column', {
            props: {
              label: item.label,
              width: item.width,
              ...columnProps
            },
            scopedSlots: {
              default: (scope) => {
                let node = null
                for (let index = 0; index < enums.length; index++) {
                  const element = enums[index]
                  if (element.id === scope.row[item.prop]) {
                    node = h(
                      'el-tag',
                      {
                        props: {
                          size: 'mini',
                          type: element.type ? element.type : 'success'
                        }
                      },
                      [element.value]
                    )
                    break
                  }
                }
                return node
              }
            }
          })
        }

        if (item.type === 'index') {
          // return h(
          //   "el-table-column",
          //   {
          //     props: {
          //       type: "index",
          //       label: item.label,
          //       width: item.width,
          //       align: item.align || "left",
          //       fixed: "left",
          //     },
          //   },
          //   [children]
          // );
          return h('el-table-column', {
            props: {
              label: item.label,
              width: item.width,
              ...columnProps
            },
            scopedSlots: {
              // scope 就相当于 slot-scope="{title}" 里面的值
              default: (scope) => {
                return [
                  h('span', [
                    that.$scopedSlots[item.type]({
                      rowData: {
                        row: scope.row,
                        colum: scope.column,
                        index: scope.$index
                      }
                    })
                  ])
                ]
              }
            }
          })
        }
        if (item.type === 'selection') {
          return h(
            'el-table-column',
            {
              props: {
                type: 'selection',
                label: item.label,
                width: item.width,
                fixed: item.fixed
              }
            },
            [children]
          )
        }
        if (item.children && item.children.length > 0) {
          children = that.renderFunc(item.children, h) // 嵌套表头，递归、
        } else {
          children = []
        }
        return h(
          'el-table-column',
          {
            props: {
              prop: item.prop,
              type: item.type,
              sortable: item.sortable || false,
              sortMethod: item.sortMethod,
              sortBy: item.sortBy,
              ...columnProps
            }
          },
          [children]
        )
      })
      return elememtArr
    }
  },
  render (h) {
    var that = this
    const elememtArr = this.renderFunc(that.columns, h)
    return h(
      'el-table',
      {
        props: {
          data: that.tableData,
          border: that.border,
          size: that.tableSize,
          height: that.height,
          highlightCurrentRow: that.highlightCurrentRow,
          showSummary: that.showSummary,
          stripe: true,
          ref: 'tableView'
        },
        style: {
          width: '100%'
        },
        on: {
          'row-click': row => {
            that.$emit('row-click', row)
          },
          'row-dblclick': row => {
            that.$emit('row-dblclick', row)
          },
          'selection-change': selection => {
            that.$emit('selection-change', selection)
          },
          'current-change': row => {
            that.$emit('current-change', row)
          }
        }
      },
      elememtArr
    )
  }
}
</script>
<style>
</style>

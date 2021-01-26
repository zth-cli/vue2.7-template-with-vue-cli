<template>
  <div class="curd_tree_wrap">
    <span class="toggle">
      <i
        :class="[toggle ? 'el-icon-arrow-left' : 'el-icon-arrow-right']"
        @click="changeSatus"
      ></i>
    </span>
    <div class="tree_main" v-show="toggle">
      <!-- {{dataUrlArr}} -->
      <!-- <slot name="treetab"></slot> -->
      <div class="tree_tab" v-if="dataUrlArr.length > 1">
        <el-tabs @tab-click="handleClick" v-model="activeName">
          <el-tab-pane
            v-for="tab in dataUrlArr"
            :label="tab.name"
            :name="tab.value"
            :key="tab.value"
          ></el-tab-pane>
        </el-tabs>
      </div>
      <el-input
        v-if="search"
        placeholder="输入关键字进行过滤"
        size="mini"
        v-model="filterText"
      ></el-input>
      <div class="lazy_tree_list" v-loading="loading">
        <el-tree
          v-if="isShow"
          class="filter-tree"
          :props="defaultProps"
          :filter-node-method="filterNode"
          :render-content="renderFunction"
          @node-click="nodeClick"
          :load="loadNode"
          lazy
          ref="tree"
          @node-expand="nodeExpand"
          :highlight-current="true"
        ></el-tree>
      </div>
    </div>
  </div>
</template>

<script>
import { apiGet } from '@/api'
export default {
  data () {
    return {
      loading: false,
      toggle: true,
      filterText: '',
      isShow: true,
      activeName: this.dataUrlArr[0].value,
      activeIndex: 0
    }
  },
  props: {
    dataUrlArr: {
      type: Array,
      default: function () {
        return []
      }
    },
    param: {},
    search: {
      type: Boolean,
      default: true
    },
    defaultProps: {
      type: Object,
      default: function () {
        return {
          children: 'children',
          label: 'name',
          isLeaf: 'leaf'
        }
      }
    },
    renderFunction: {
      type: Function,
      default: renderContent
    }
  },
  created () {},
  methods: {
    queryData (resolve, index) {
      if (!this.dataUrlArr || this.loading === true) {
        return
      }
      this.loading = true
      //   let params = Object.assign({}, this.dataUrlArr[index].params);
      //   console.log(params);

      return apiGet(this.dataUrlArr[this.activeIndex].urlArr[index].url, {
        params: this.dataUrlArr[this.activeIndex].urlArr[index].params
      })
        .then((res) => {
          this.loading = false
          if (!res.code === 0) {

          } else {
            if (index === this.dataUrlArr[this.activeIndex].urlArr.length - 1) {
              res.data.forEach((item) => {
                item.leaf = true
              })
            }
            return resolve(res.data)
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    changeSatus () {
      this.toggle = !this.toggle
      this.$emit('changeSatus', this.toggle) // 触发自定义事件
    },
    filterNode (value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    nodeClick (data, node) {
      this.$emit('nodeClick', {
        data,
        node
      })
    },
    loadNode (node, resolve) {
      for (
        let index = 0;
        index < this.dataUrlArr[this.activeIndex].urlArr.length;
        index++
      ) {
        if (node.level === index) {
          return this.queryData(resolve, index)
        }

        if (node.level > this.dataUrlArr[this.activeIndex].urlArr.length - 1) {
          return resolve([])
        }
      }
    },
    nodeExpand (data, node) {
      this.$emit('node-expand', data, node)
    },
    handleClick (tab) {
      this.isShow = false
      this.dataUrlArr.forEach((item, index) => {
        if (item.value === tab.name) {
          this.activeIndex = index
          this.$emit('tab-click', index)
          this.$nextTick(() => {
            this.isShow = true
          })
        }
      })
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
    // dataUrlArr: {
    //   handler(val) {
    //     this.$nextTick(() => {
    //       this.loadNode();
    //     });
    //   },
    //   deep: true
    // }
  }
}

function renderContent (h, { node }) {
  // console.log(node);
  // eslint-disable-next-line no-unused-vars
  var icon = 'el-icon-folder'
  switch (node.level) {
    case 1:
      icon = 'el-icon-folder'
      break
    case 2:
      icon = 'el-icon-document'
      break
    case 3:
      icon = 'el-icon-collection-tag'
      break
    case 4:
      icon = 'el-icon-coin'
      break
    default:
      icon = 'el-icon-document'
      break
  }
  return (
    <span class="custom-tree-node">
      <span>
        <i class={icon}> </i> {node.label}{' '}
      </span>{' '}
    </span>
  )
}
</script>
<style lang="scss">
.curd_tree_wrap {
  /* background-color: #fff; */
  @include content-background();
  @include box-shadow();
  height: 100%;
  position: relative;
  border-radius: 0 4px 4px 0;
  .el-tree{
   background-color: transparent;
  }
}

.toggle {
  position: absolute;
  top: 49%;
  right: -12px;
  background-color: #ece9f1;
  width: 12px;
  height: 28px;
  color: #282a29;
  text-align: center;
  cursor: pointer;
  line-height: 28px;
}

.tree_main {
  height: 100%;
  width: 260px;
  box-sizing: border-box;
  padding: 8px;
  overflow: hidden;
}

.lazy_tree_list {
  min-width: 220px;
  font-size: 12px !important;
  height: calc(100% - 84px);
  overflow-y: auto;
}
</style>

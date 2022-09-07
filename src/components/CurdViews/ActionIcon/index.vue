<template>
  <div style="display: inline-block">
    <template v-for="(item, index) in list">
      <el-popover v-if="item === 'delete'" placement="bottom" width="160" v-model="visible" :key="index">
        <p>此操作将删除内容,确定删除吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="visible = false">取消</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="
              visible = false
              deleteHandle()
            "
            >确定</el-button
          >
        </div>
        <el-button
          slot="reference"
          :type="type[item]"
          :icon="'el-icon-' + item"
          circle
          size="mini"
          title="删除"
        ></el-button>
      </el-popover>
      <el-popover v-else-if="item === 'end'" placement="bottom" width="160" v-model="visible" :key="index">
        <p>此操作将中止工单,确定继续吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="visible = false">取消</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="
              visible = false
              endHandle()
            "
            >确定</el-button
          >
        </div>
        <el-button
          slot="reference"
          :type="type[item]"
          :icon="'el-icon-' + 'circle-close'"
          circle
          size="mini"
          title="中止"
        ></el-button>
      </el-popover>
      <el-button
        v-else
        :key="index"
        :type="type[item]"
        :icon="'el-icon-' + item"
        @click="$emit('on-' + item)"
        circle
        size="mini"
        :title="desc[index]"
      ></el-button>
    </template>
  </div>
</template>

<script>
import { apiPost } from '@/api'
export default {
  name: 'ActionIcon',
  emits: ['on-view', 'on-edit', 'on-download', 'on-delete', 'on-end'],
  props: {
    list: {
      type: Array,
      default: () => ['view', 'edit', 'download', 'delete', 'end'],
    },
    deleteUrl: {
      type: String,
      default: '',
    },
    deleteParams: {
      type: Object,
    },
    endUrl: {
      type: String,
      default: '',
    },
    endParams: {
      type: Object,
    },
    downloadUrl: {
      type: String,
      default: '',
    },
    downloadParams: {
      type: Object,
    },
  },
  data() {
    return {
      visible: false,
      desc: ['查看', '编辑', '下载', '删除', '中止'],
      type: { view: '', edit: 'primary', download: 'success', delete: 'danger', end: 'danger' },
    }
  },
  methods: {
    downloadHandle(row) {
      this.$emit('on-download', row)
    },
    deleteHandle() {
      if (this.deleteUrl) {
        apiPost(this.deleteUrl, this.deleteParams).then(() => {
          this.$message.success('删除成功')
          this.$emit('on-delete')
        })
      } else {
        this.$emit('on-delete')
      }
    },
    endHandle() {
      if (this.endUrl) {
        apiPost(this.endUrl, this.endParams).then(() => {
          this.$message.success('已中止！')
          this.$emit('on-end')
        })
      } else {
        this.$emit('on-end')
      }
    },
  },
}
</script>
<style lang="scss"></style>

<template>
  <div class="_Edit_table">
    {{ TableData }}
    <el-table :data="TableData" border stripe>
      <el-table-column v-for="col in columns" :prop="col.name" :key="col.name" :label="col.label">
        <template v-slot="Scope">
          <template v-if="col.type === 'text'">
            <el-input v-model="Scope.row[col.name]" :placeholder="col.label" clearable></el-input>
          </template>
          <template v-if="col.type === 'select'">
            <el-select
              v-model="Scope.row[col.name]"
              :placeholder="col.label"
              clearable
              filterable
              :multiple="col.multiple ? col.multiple : false"
            >
              <el-option v-for="item in col.options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </template>
          <template v-if="col.type === 'textarea'">
            <el-input
              v-model="Scope.row[col.name]"
              :maxlength="col.maxlength"
              show-word-limit
              :placeholder="col.label"
              type="textarea"
              clearable
            ></el-input>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120" align="center">
        <template v-slot="scope">
          <el-button type="danger" size="mini" @click="TableData.splice(scope.$index, 1)">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="add-area" title="新增条目" @click="addInitData()"><i class="el-icon-plus"></i></div>
  </div>
</template>

<script>
export default {
  name: 'EditTable',

  data() {
    return {
      TableData: this.propData,
      rowData: {},
    }
  },
  model: {
    prop: 'propData',
    event: 'change',
  },
  emits: ['change'],
  props: {
    propData: {
      type: Array,
      default: function () {
        return []
      },
    },
    columns: {
      type: Array,
      default: function () {
        return [
          {
            name: 'content',
            label: '评价',
            type: 'textarea',
            with: 200,
          },
        ]
      },
    },
  },
  methods: {
    addInitData() {
      const rowData = Object.assign({}, this.rowData)
      this.TableData.push(rowData)
    },
  },
  created() {
    this.columns.forEach((item) => {
      this.rowData[item.name] = ''
      if (item.type === 'select' && item.multiple) {
        this.rowData[item.name] = []
      }
    })
  },
  watch: {
    TableData: {
      handler: function (data) {
        this.$emit('change', data)
      },
      deep: true,
    },
    propData: {
      handler: function (data) {
        this.TableData = data
      },
      deep: true,
    },
  },
}
</script>
<style lang="scss">
._Edit_table {
  .add-area {
    width: 100%;
    border: 1px dashed transparent;
    @include border-color();
    padding: 10px 0;
    margin-top: 16px;
    border-radius: 10px;
    text-align: center;
    cursor: pointer;
    i {
      @include font_color(null);
      font-size: 28px;
    }
  }
}
</style>

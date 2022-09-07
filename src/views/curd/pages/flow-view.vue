<template>
  <div class="content">
    <flow-bar class="boxShadow" :options="fromOptions" :multiple="false" @query="getTableData">
      <template v-slot:tool> </template>
    </flow-bar>

    <CurdTable ref="tableView" class="boxShadow" style="margin-top: 12px" v-bind="tableOptions"> </CurdTable>
  </div>
</template>

<script>
import CurdTable from '@/components/CurdViews/CurdTable'
import FlowBar from '@/components/CurdViews/FlowBar'
export default {
  components: { FlowBar, CurdTable },
  data() {
    return {
      tableOptions: {
        height: '60vh',
        defaultPanel: [],
        showPanelTool: true,
        params: {
          datetime: this.$day().add(-1, 'day').format('YYYY-MM-DD'),
        },
        responseName: '',
        dataUrl: '/structureAnalysis/purchaseSale/getList',
        columns: [
          { type: 'index', label: '序号', align: 'left', width: 80 },
          { prop: 'orgName', label: '分类', align: 'left' },
          { prop: 'stName', slot: 'stName', label: '厂站', align: 'left' },
          // { prop: 'd5000Id', label: '厂站编号', align: 'left' },
          { prop: 'quantity', slot: 'ele', label: '电量(万千瓦时)', align: 'left' },
          { prop: 'price', slot: 'price', label: '电价(元/千瓦时)', align: 'left' },
          { prop: 'cost', label: '费用(万元)', align: 'left' },
        ],
      },
      fromOptions: [
        {
          name: 'area',
          title: '接入电网',
          disabledAll: true,
          default: '1232213213',
          options: [
            { label: '省调公司', value: '1232213213' },
            { label: '地调公司', value: '12322132123' },
          ],
        },
        { name: 'stName', label: '厂站', type: 'input' },
        {
          name: 'datetime',
          label: '日期',
          type: 'date',
          format: 'yyyy-MM-dd',
          pickerOptions: {
            disabledDate: (time) => {
              // 未来日期不可选
              return time.getTime() > Date.now()
            },
          },
        },
      ],
    }
  },

  methods: {},
}
</script>
<style lang="scss">
.ele-edit {
  cursor: pointer;
}
</style>

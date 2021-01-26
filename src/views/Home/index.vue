
<template>
  <div class="content home_page">
    <div class="header_tool">
      <div class="tool_bar">
        <i class="icon-changzhanzs"></i>
        报装工作台
      </div>
    </div>
    <el-row type="flex" class="panel-group" justify="space-between">
      <el-col :span="7">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon="icon_daiban"></svg-icon>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">待办事宜</div>
            <span class="card-panel-num panel-num-pass">20</span>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-pass">
            <svg-icon icon="tongguo" class></svg-icon>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">已通过</div>
            <span class="card-panel-num panel-num-pass">120</span>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-forbind">
            <svg-icon icon="shibai"></svg-icon>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">未通过</div>
            <span class="card-panel-num panel-num-pass">50</span>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="panel-chart">
      <el-col :xs="24" :sm="12" :lg="12">
        <div class="chart">
          <div class="tool_bar">
            <i class="icon-changzhanzs"></i>
            报装状态分布
          </div>
          <div id="chart1"></div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="12">
        <div class="chart">
          <div class="tool_bar">
            <i class="icon-changzhanzs"></i>
            报装状态分布
          </div>
          <div id="chart2"></div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="panel-table">
      <el-col :xs="24" :sm="24" :lg="11">
        <div class="chart">
          <div class="tool_bar">
            <i class="icon-changzhanzs"></i>
            待办报装
          </div>
          <div class="table-content">
            <el-table
              :data="tableData"
              size="mini"
              border
              style="width: 100%"
              height="300"
            >
              <el-table-column
                type="index"
                label="序号"
                width="80"
              ></el-table-column>
              <el-table-column
                prop="id"
                show-overflow-tooltip="true"
                label="流程单号"
                width="180"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="台区"
                width="180"
              ></el-table-column>
              <el-table-column
                prop="date"
                label="日期"
                width="180"
              ></el-table-column>
              <el-table-column fixed="right" label="操作" width="150">
                <template slot-scope="scope">
                  <el-button type="primary" size="small">查看</el-button>
                  <el-button type="primary" size="small">流程</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="13">
        <div class="chart">
          <div class="tool_bar">
            <i class="icon-changzhanzs"></i>
            未通过报装
          </div>
          <div class="table-content">
            <el-table
              :data="tableData"
              size="mini"
              border
              style="width: 100%"
              height="300"
            >
              <el-table-column
                type="index"
                label="序号"
                width="80"
              ></el-table-column>
              <el-table-column
                prop="id"
                show-overflow-tooltip="true"
                label="流程单号"
                width="180"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="台区"
                width="180"
              ></el-table-column>
              <el-table-column
                prop="date"
                label="日期"
                width="180"
              ></el-table-column>
              <el-table-column
                prop="reason"
                show-overflow-tooltip="true"
                label="驳回原因"
                width="220"
              ></el-table-column>
              <el-table-column label="操作" fixed="right" width="80">
                <template slot-scope="scope">
                  <el-button type="primary" size="small">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { chartColorObj } from '@/assets/scss/_variables'
import bus from '@/utils/bus'
export default {
  data () {
    return {
      tableData: [
        {
          id: '10kV栗马线栗16台区报装申请',
          name: '马集#3S9-30kVA',
          date: '2019-11-17'
        }
      ]
    }
  },
  mounted () {
    this.chart1()
    this.chart2()
    bus.$on('changMenuColor', theme => {
      this.chart1()
      this.chart2()
      console.log(theme)
      console.log(chartColorObj[theme])
    })
  },
  methods: {
    cancel () {
      this.$emit('cancel', false)
    },
    chart1 () {
      var themeStr = document.documentElement.getAttribute('data-theme')
      var chart1 = this.echarts.init(document.getElementById('chart1'))
      var option = {
        color: chartColorObj[themeStr],
        //  backgroundColor:'#fff',
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['待办事宜', '已通过', '未通过']
        },
        series: [
          {
            name: '报装',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '待办事宜' },
              { value: 310, name: '已通过' },
              { value: 234, name: '未通过' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      chart1.setOption(option)
      window.addEventListener(
        'resize',
        function () {
          chart1.resize()
        },
        false
      )
    },
    chart2 () {
      var themeStr = document.documentElement.getAttribute('data-theme')
      var chart2 = this.echarts.init(document.getElementById('chart2'))
      var option = {
        color: chartColorObj[themeStr],
        //  backgroundColor:'#fff',
        legend: {
          data: [
            {
              name: '待办事宜',
              icon: 'circle'
            },
            {
              name: '已通过',
              icon: 'circle'
            },
            {
              name: '未通过',
              icon: 'circle'
            }
          ],
          top: 26,
          right: 10,
          textStyle: {
            color: '#555',
            fontSize: 14
          },
          itemGap: 34,
          itemWidth: 10,
          itemHeight: 10
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: '#fff',
          padding: 10,
          textStyle: {
            color: '#333'
          },
          axisPointer: {
            type: 'line',
            animation: true,
            lineStyle: {
              color: 'transparent'
            }
          },
          extraCssText: 'box-shadow: 0px 0px 10px -4px rgba(3, 3, 3, .4)'
        },
        xAxis: {
          type: 'category',
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#C0C0C5'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            fontSize: 13,
            color: '#5F5F6B'
          },
          data: ['11.1', '11.2', '11.3', '11.4', '11.5', '11.6', '11.7']
        },
        yAxis: {
          name: '',
          type: 'value',
          nameRotate: 1,
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#C0C0C5'
            }
          },
          axisTick: {
            show: true
          },
          axisLabel: {
            fontSize: 13,
            color: '#5F5F6B'
          }
        },
        series: [
          {
            name: '待办事宜',
            type: 'bar',
            stack: 'a',
            barWidth: '30%',
            data: ['20', '30', '30', '20', '20', '30', '18']
          },
          {
            name: '已通过',
            type: 'bar',
            stack: 'a',
            barWidth: '30%',
            data: ['30', '40', '30', '20', '30', '30', '28']
          },
          {
            name: '未通过',
            type: 'bar',
            stack: 'a',
            barWidth: '30%',
            data: ['3', '20', '3', '10', '21', '3', '26']
          }
        ]
      }
      chart2.setOption(option)
      window.addEventListener(
        'resize',
        function () {
          chart2.resize()
        },
        false
      )
    }
  }
}
</script>

<style lang='scss'>
.home_page{
  padding: 18px;
}
.header_tool {
  @include border-color();
}
.tool_bar {
  @include tool-bar-color();
  line-height: 25px;
    padding: 0 4px;
}
.panel-group {
  margin-top: 18px;
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    margin-bottom: 32px;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
    @include content-background();
    @include box-shadow();
    .icon-people {
        background: #40c9c6;
      }
      .icon-pass {
        background: #36a3f7;
      }
      .icon-forbind {
        background: #f4516c;
      }
    &:hover {
      .card-panel-icon-wrapper {
        @include font_color(#fff);
      }
    }

    .icon-people {
      color: #40c9c6;
      font-size: 40px;
    }

    .icon-pass {
      color: #36a3f7;
      font-size: 40px;
    }

    .icon-forbind {
      color: #f4516c;
      font-size: 40px;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        @include font_color(null);
        font-size: 20px;
        margin-bottom: 12px;
      }
      .panel-num-people {
        color: #40c9c6;
      }
      .card-panel-num {
        font-size: 30px;
      }
      .panel-num-pass {
        color: #36a3f7;
      }
      .panel-num-forbind {
        color: #f4516c;
      }
    }
  }
}
.panel-chart {
  margin-top: 18px;
  .chart {
    border: 1px solid transparent;
    @include border-color();
    @include box-shadow();
    #chart1,
    #chart2 {
      width: 100%;
      height: 340px;
    }
  }
}
.panel-table {
  margin-top: 18px;
  .chart {
    @include box-shadow();
    border: 1px solid transparent;
    @include border-color();
    margin-bottom: 18px;
    @include content-background();
    .table-content {
      margin: 18px 8px 8px 8px;
    }
  }
}
</style>

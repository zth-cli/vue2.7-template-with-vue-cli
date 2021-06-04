/*
 * @Author: rzx007
 * @Date: 2021-05-25 18:12:03
 * @LastEditors: rzx007
 * @LastEditTime: 2021-05-30 19:16:28
 * @FilePath: \vue-template-with-elementui\src\mock\moban.js
 * @Description: Do not edit
 */
import day from 'dayjs'
const optionsList = [
  { label: '日前输电通道传输限额', value: 1 },
  { label: '月度预测供需电力差额', value: 2 },
  { label: '月度预测供需电量差额', value: 3 },
  { label: '变电设备投产/退役情况', value: 4 },
  { label: '输电设备投产/退役情况', value: 5 },
  { label: '重要线路实际停运及其影响的发用电设备', value: 6 },
  { label: '市场运营机构采取的任何对市场交易产生影响的操作', value: 7 },
  { label: '电网运行方式安排', value: 8 },
  { label: '考虑所有已知影响的年前系统间联络线输电能力预测', value: 9 },
  { label: '考虑所有已知影响的月前系统间联络线输电能力预测', value: 10 },
  { label: '考虑所有已知影响的周前系统间联络线输电能力预测', value: 11 }

]

const colunmsList = [
  {
    type_id: 1, // 模板ID
    colunms: [
      { prop: 'dataName', label: '数据名称', align: 'center', default: '日前输电通道传输限额', propType: 'title' },
      { prop: 'bvName', label: '输电通道', align: 'center', width: 180, default: '通道一', propType: 'select', options: [{ label: '通道一', value: '通道一' }] },
      { prop: 'td', label: '通道/断面组成', align: 'center', propType: 'text' },
      { prop: 'time', label: '日期', align: 'center', propType: 'date', default: day().format('YYYY-MM-DD') },
      { prop: 'tpe', label: '时间索引', align: 'center', propType: 'timeSelect' },
      { prop: 'pap', label: '限额/MW', align: 'center', propType: 'text' }
    ]
  },
  {
    type_id: 2, // 模板ID
    colunms: [
      { prop: 'dataName', label: '数据名称', align: 'center', default: '月度预测供需电力差额' },
      { prop: 'time', label: '日期', align: 'center', propType: 'date' },
      { prop: 'sum', label: '总差额', align: 'center', propType: 'text', default: 250 }
    ]
  },
  {
    type_id: 3, // 模板ID
    colunms: [
      { prop: 'dataName', label: '数据名称', align: 'center', default: '月度预测供需电力差额' },
      { prop: 'time', label: '日期', align: 'center', propType: 'date' },
      { prop: 'v', label: '总差额', align: 'center', propType: 'text', default: 250 }
    ]
  },
  {
    type_id: 4, // 变电设备投产/退役情况
    colunms: [
      { prop: 'dataName', label: '数据名称', align: 'center', default: '变电设备投产/退役情况' },
      { prop: 'devName', label: '设备名称', align: 'center', default: '新乐变#1主变' },
      { prop: 'bvName', label: '电压等级', align: 'center', default: '220Kv', propType: 'select', options: [{ label: '220Kv', value: '220Kv' }, { label: '750Kv', value: '750Kv' }] },
      { prop: 'time', label: '日期', align: 'center', propType: 'date' },
      { prop: 'isInUse', label: '投产退役类型', align: 'center', width: 180, default: '投产', propType: 'select', options: [{ label: '投产', value: '投产' }, { label: '退役', value: '退役' }] }
    ]
  },
  {
    type_id: 5, // 输电设备投产/退役情况
    colunms: [
      { prop: 'dataName', label: '数据名称', align: 'center', default: '输电设备投产/退役情况' },
      { prop: 'devName', label: '设备名称', align: 'center', default: '30175洪板I线' },
      { prop: 'bvName', label: '电压等级', align: 'center', width: 180, default: '220Kv', propType: 'select', options: [{ label: '220Kv', value: '220Kv' }, { label: '750Kv', value: '750Kv' }] },
      { prop: 'time', label: '日期', align: 'center', propType: 'date' },
      { prop: 'isInUse', label: '投产退役类型', align: 'center', width: 180, default: '投产', propType: 'select', options: [{ label: '投产', value: '投产' }, { label: '退役', value: '退役' }] }
    ]
  },
  {
    type_id: 6, // 重要线路实际停运及其影响的发用电设备
    colunms: [
      { prop: 'dataName', label: '数据名称', align: 'center', default: '重要线路实际停运及其影响的发用电设备' },
      { prop: 'devName', label: '重要线路名称', align: 'center', default: '7015河武I线' },
      { prop: 'bvName', label: '电压等级', align: 'center', width: 180, default: '220Kv', propType: 'select', options: [{ label: '220Kv', value: '220Kv' }, { label: '750Kv', value: '750Kv' }] },
      { prop: 'starttime', label: '实际停役日期', align: 'center', propType: 'date' },
      { prop: 'endtime', label: '实际复役日期', align: 'center', propType: 'date' }
    ]
  },
  {
    type_id: 7, // 市场运营机构采取的任何对市场交易产生影响的操作
    colunms: [
      { prop: 'dataName', label: '数据名称', align: 'center', default: '市场运营机构采取的任何对市场交易产生影响的操作' },
      { prop: 'time', label: '日期', align: 'center', propType: 'date' },
      { prop: 'pretime', label: '干预时间', align: 'center', propType: 'timepicker' },
      { prop: 'personnel', label: '干预人员', align: 'center' },
      { prop: 'operation', label: '干预操作', align: 'center' },
      { prop: 'reason', label: '原因', align: 'center' }
    ]
  },
  {
    type_id: 8, // 电网运行方式安排
    colunms: [
      { prop: 'title', label: '标题', align: 'center', default: '电网运行方式安排' },
      { prop: 'p', label: '内容', align: 'center', default: '', propType: 'textarea' }

    ]
  },
  {
    type_id: 9, // 考虑所有已知影响的年前系统间联络线输电能力预测
    colunms: [
      { prop: 'dataName', label: '数据名称', align: 'center', default: '考虑所有已知影响的年前系统间联络线输电能力预测' },
      { prop: 'acline', label: '标联络线', align: 'center', default: '甘肃-新疆' },
      { prop: 'time', label: '日期', align: 'center', propType: 'year' },
      { prop: 'power', label: '输电能力', align: 'center' }

    ]
  },
  {
    type_id: 10, // 考虑所有已知影响的月前系统间联络线输电能力预测
    colunms: [
      { prop: 'dataName', label: '数据名称', align: 'center', default: '考虑所有已知影响的月前系统间联络线输电能力预测' },
      { prop: 'acline', label: '联络线', align: 'center', default: '甘肃-新疆' },
      { prop: 'starttime', label: '日期', align: 'center', propType: 'date' }
    ]
  },
  {
    type_id: 11, // 考虑所有已知影响的周前系统间联络线输电能力预测
    colunms: [
      { prop: 'dataName', label: '数据名称', align: 'center', default: '考虑所有已知影响的周前系统间联络线输电能力预测' },
      { prop: 'acline', label: '标题', align: 'center', default: '' },
      { prop: 'starttime', label: '日期', align: 'center', propType: 'date' }

    ]
  }
]
export { colunmsList, optionsList }
export default { colunmsList, optionsList }

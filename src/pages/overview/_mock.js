const overview = {
  data: [
    {
      id:1,
      name:'临安区临时管制',
      unit: '市公安局、市卫监委、市交通局、市交警大队',
      devices: '5122台',
      timeZone:{start:'2020年2月12日',end:'无限制'}
    },
    {
      id:2,
      name:'海曙区交通管制',
      unit: '市公安局、市卫监委、市交通局、市交警大队',
      devices: '512台',
      timeZone:{start:'2020年3月12日',end:'2020年4月12日'}
    },
    {
      id:3,
      name:'新冠状病毒防疫管制',
      unit: '市公安局、市卫监委、市交通局、市交警大队',
      devices: '52台',
      timeZone: {start: '2020年6月12日', end: '无限制'}
    },{
      id:4,
      name:'新Sass防疫管制',
      unit: '浙一医院、市医院、市红会医院',
      devices: '521台',
      timeZone: {start: '2020年6月12日', end: '无限制'}
    },{
      id:5,
      name:'H7N9防疫管制',
      unit: '市卫生局',
      devices: '532台',
      timeZone: {start: '2020年6月12日', end: '无限制'}
    },

  ],//方案列表
  devices: 1000,//当前执行设备
  currentProgrammeCount: 3,//当前执行方案
  laterProgrammeCount: 12123//累计执行方案
};
export default {
  'GET /api/overview': {code: 200, msg: "success", data: overview},
}

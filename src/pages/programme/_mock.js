const programmeList = (page) => {
  console.log(page);
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      id: 'ZHEC2020031'+i,
      name: '临安区临时管制' + i,
      unit: '市公安局、市卫监委、市交通局、市交警大队' + i,
      devices: `${100 + i}台`,
      timeZone: {start: `2014.12.23 23:12:${i}`, end: '无限制'},
      type: [
        '名单限制出入',
        '车辆管制',
        i%5===0?'行为监控':'车流监控'
      ],
      status: i % 5 === 0 ? 'ready' : i % 4 === 0 ? 'start' : 'stop'
    });
  }
  return {
    code: 200,
    msg: "success",
    data: {
      list: data,
      total: 100,
      pages: 10,
      pageNum: page
    }
  }

};
export default {
  'GET /api/programmeList': (req, res) => {
    res.send(programmeList(1))
  },

}

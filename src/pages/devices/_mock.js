const getCanteenListByPage = (page) => {
  console.log(page);
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      index: i,
      name: `${i}号餐厅`,
      status: (i % 2 === 0) ? "已上线" : "已下线",
      time: `2014.12.23 23:12:${i}`
    });
  }
  return {
    code: 200,
    msg: "success",
    data: data
  }

};
export default {
  'GET /api/canteen/modify': {code: 200, msg: "success", data: ''},
  'GET /api/canteen/list':getCanteenListByPage(1),

}

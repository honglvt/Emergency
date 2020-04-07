
let page = 0;
const getCardList = (page) => {
  console.log(page);
  const data = [];
  for (let i = page; i < (page + 10); i++) {
    data.push({
      index: i,
      name: `${i}号餐厅`,
      phone: '123412123' + i,
      memberNum: '工号' + i,
      cardNum: '卡号' + i,
      status: (i % 2 === 0) ? "已上线" : "已下线",
      money: '12' + i,
      bu: `部门${i}`,
      key: `${i}${page}`
    });
  }
  return {
    code: 200,
    msg: "success",
    data: data,
    total: 90
  }
};
export default {
  // 'GET /api/canteen/modify': {code: 200, msg: "success", data: ''},
  'GET /api/card/list': getCardList(page),
}

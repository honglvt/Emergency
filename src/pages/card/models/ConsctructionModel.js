import {getCardList, getEmployeeList} from "../service";

/**
 *WebStorm create by chenhong on 2020/3/25
 *
 */
const traverse = (obj) => {
  for (var a in obj) {
    if (typeof(obj[a]) == "object") {
      traverse(obj[a]); //递归遍历
    } else {
      console.log(a + "=" + obj[a]); //如果是值就显示
    }
  }
};
export default {
  namespace: 'constructionModel',
  state: {
    data: [],
    total: 0,
    loading: false
  },
  reducers: {
    'newData'(state, {payload}) {
      return {
        ...state, ...payload
      }
    }
  },
  effects: {
    * getEmployeeList({payload}, {call, put}) {
      const response = yield call(getEmployeeList);
      traverse(response.data);
      yield put({
        type: 'newData',
        payload: response.data
      })
    }

  }

}

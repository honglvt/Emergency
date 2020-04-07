import {getCardList, getEmployeeList} from "../service";

/**
 *WebStorm create by chenhong on 2020/3/25
 *
 */
const delay = (ms) => new Promise((resolve) => {

  setTimeout(resolve, ms);

});
export default {
  namespace: 'cardList',
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
    * nextPage(payload, {call, put}) {
      yield put({
        type: 'newData',
        payload: {
          loading: true
        }
      });
      const response = yield call(getCardList, payload.page);
      yield put({
        type: 'newData',
        payload: {
          data: response.data,
          total: response.total,
          loading: false
        }
      })
    },

  }

}

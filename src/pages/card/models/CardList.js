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
    pages: 0,
    loading: false,
    content: '',
    status: '',
    typeCode: '',
    pageNum: 0
  },
  reducers: {
    'newData'(state, {payload}) {
      return {
        ...state, ...payload
      }
    }
  },
  effects: {
    * nextPage({payload}, {call, put}) {
      yield put({
        type: 'newData',
        payload: {
          loading: true,
          content: payload.content,
          status: payload.status,
          typeCode: payload.typeCode,
        }
      });

      const response = yield call(getEmployeeList, payload);
      response.data.list.forEach((item) => {
        item.key = item.id;
      });
      yield put({
        type: 'newData',
        payload: {
          data: response.data.list,
          total: response.data.total,
          pages: response.data.pages,
          loading: false,
          pageNum: response.data.pageNum
        }
      })
    },

  }

}

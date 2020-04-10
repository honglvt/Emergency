import {getProgrammeList} from "../service";

/**
 *WebStorm create by chenhong on 2020/3/24
 *
 */
export default {
  namespace: 'programmeListModel',
  state: {
    data: [],
    total: 0,
    pages: 0,
    loading: false,
    currentPage: 1
  },
  reducers: {
    'newList'(state, {payload}) {
      return {...state, ...payload};
    },
    'currentPage'(state, {payload}) {
      return {...state, currentPage: payload.currentPage};
    }
  },
  effects: {
    * nextPage({payload}, {call, put}) {
      yield put({
        type: 'newList',
        payload: {
          loading: true
        }
      });
      const response = yield call(getProgrammeList, payload.page);
      response.data.list.forEach((item, index) => {
        item.key = item.id
      });
      yield put({
        type: 'newList',
        payload: {
          data: response.data.list,
          total: response.data.total,
          pages: response.data.pages,
          loading: false
        }
      })
    }
  }
}

import {fetchOverviewData} from "../service";

/**
 *WebStorm create by chenhong on 2020/3/24
 *
 */

export default {
  namespace: 'overviewModel',
  state: {
    data: [],//方案列表
    devices: 0,//当前执行设备
    currentProgrammeCount: 0,//当前执行方案
    laterProgrammeCount: 0//累计执行方案
  },
  reducers: {
    'newData'(state, {payload}) {
      return {...state, ...payload};
    },
  },
  effects: {
    * fetchOverviewData({payload}, {call, put}) {
      const response = yield call(fetchOverviewData);
      yield put({
        type: 'newData',
        payload: {
          ...response.data
        }
      })
    }
  }
}

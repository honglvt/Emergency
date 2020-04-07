import {message} from 'antd';

/**
 *WebStorm create by chenhong on 2020/3/24
 *
 */
export default {
  namespace: 'userModel',
  state: {
    visible: false,
    title: '',
    confirmLoading: false,
    userName: '',
    phone: '',
    memberNum: '',
    cardNum: '',
    bu: '',
    status: ''
  },
  reducers: {
    show(state, {payload}) {
      console.log(payload);
      return {...state, ...payload};
    },
    confirmLoading(state, {payload}) {
      return {...state, confirmLoading: payload.confirmLoading}
    }
  },
  effects: {
    * confirm({payload}, {call, put}) {
      console.log(payload);
      yield  put({
        type: 'confirmLoading',
        payload: {
          confirmLoading: true,
        }
      });
      // const response = yield call(modifyCanteen, payload);
      const response = {
        code: 200
      };
      console.log(response);
      if (response.code === 200) {
        yield  put({
          type: 'show',
          payload: {
            confirmLoading: false,
            show: false
          }
        });
        message.success(payload.title + "成功");
      }

    }
  }
}

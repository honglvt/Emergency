import {message} from 'antd';
import {addStaff} from '../service';

/**
 *WebStorm create by chenhong on 2020/3/24
 *
 */
export default {
  namespace: 'userModel',
  state: {
    visible: false,
    title: '',
    name: '',
    phone: '',
    number: '',
    cardNumber: '',
    options: [],
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
      const response = yield call(addStaff, payload);
      if (response.code === 200) {
        message.success("成功");
      }else {
        console.log('confirm',response);
        message.error(response.msg)
      }
      yield  put({
        type: 'show',
        payload: {
          visible: false
        }
      });
    }
  }
}

import {updateCanteen, addCanteen} from '../../service';
import {message} from 'antd';

/**
 *WebStorm create by chenhong on 2020/3/24
 *
 */
export default {
  namespace: 'modifyModal',
  state: {
    show: false,
    title: '',
    name: '',
    online: false,
    confirmLoading: false,
    id: 0
  },
  reducers: {
    show(state, {payload}) {
      return {...state, ...payload};
    },
    confirmLoading(state, {payload}) {
      return {...state, confirmLoading: payload.confirmLoading}
    }
  },
  effects: {
    * confirm({payload}, {call, put}) {
      yield  put({
        type: 'confirmLoading',
        payload: {
          confirmLoading: true,
        }
      });
      let response;

      if (payload.title === '新增餐厅') {
        response = yield call(addCanteen, payload);
      } else {
        response = yield call(updateCanteen, payload);
      }
      yield  put({
        type: 'show',
        payload: {
          confirmLoading: false,
          show: false
        }
      });
      console.log('新增餐厅', response);
      if (response.code === 200) {
        message.success(payload.title + "成功");
        return 200;
      } else {
        message.error(payload.title + response.msg);
      }
    }
  }
}

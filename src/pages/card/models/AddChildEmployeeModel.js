import {addChildEmployee, updateChildEmployee} from "../service";
import {message} from "antd";

/**
 *WebStorm create by chenhong on 2020/3/25
 *
 */

export default {
  namespace: 'addChildEmployeeModel',
  state: {
    add: true,
    pId: '',
    dataCode: '',
    dataName: '',
    enable: false,
    visible: false,
    loading: false,
    title: '',
    id: ''
  },
  reducers: {
    'newData'(state, {payload}) {
      console.log('newData', payload);
      return {
        ...state, ...payload
      }
    }
  },
  effects: {
    * confirm({payload}, {call, put}) {
      const response = yield call(payload.add ? addChildEmployee : updateChildEmployee, payload);
      console.log('response', response.data);
      yield put({
        type: 'newData',
        payload: {
          visible: false,
        }
      });
      if (response.code === 200) {
        message.success(payload.add ? '新增' : '修改' + "部门成功");
        return 200;
      } else {
        message.error(response.msg);
      }

    },
  }

}

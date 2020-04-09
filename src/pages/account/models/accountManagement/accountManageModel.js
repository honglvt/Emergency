import {updateAccount, addAccount, getAccountList, disableAccount, removeAccount} from '../../service'
import {message} from 'antd';
import router from 'umi/router';

/**
 *WebStorm create by chenhong on 2020/3/24
 *
 */
export default {
  namespace: 'accountManageModel',
  state: {
    id: 0,
    ids: [],
    name: "",
    note: "",
    userName: "",
    targetKeys: [],
    sourceKeys: [],
  },
  reducers: {
    'show'(state, {payload}) {
      return {...state, ...payload};
    },
    'targetKeys'(state, {payload}) {
      return {...state, targetKeys: payload.targetKeys};
    }
  },
  effects: {

    * jump2AddAccount({payload}, {call, put}) {
      yield put({
        type: 'show',
        payload: payload
      });
      yield router.push(`/account/sub-account/${payload.action}`)
    }

  }
}

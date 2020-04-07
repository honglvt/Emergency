import {updateAccount, addAccount, getAccountList, disableAccount, removeAccount} from '../../service'
import {message} from 'antd';

/**
 *WebStorm create by chenhong on 2020/3/24
 *
 */
export default {
  namespace: 'accountListModel',
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
      const response = yield call(getAccountList, payload.page);

      for (let i = 0; i < response.data.list.length; i++) {
        // if (response.data.list[i].canteenList.length === 0) {
        //   response.data.list[i].canteenList.push({
        //     name: ''
        //   })
        // }
        let canteensString = '';
        response.data.list[i].canteenList.forEach((item, index) => {
          canteensString += item.name;
          if ((index + 1) % 2 === 0) {
            canteensString += "\n"
          } else {
            canteensString += "    "
          }
        });
        response.data.list[i].canteenListString = canteensString;
        console.log(canteensString)
      }

      yield put({
        type: 'newList',
        payload: {
          data: response.data.list,
          total: response.data.total,
          pages: response.data.pages,
          loading: false
        }
      })
    },

    * disableAccount({payload}, {call, put}) {
      const response = yield call(disableAccount, payload);
      if (response.code === 200) {
        message.success("禁用账户成功");
        return 200;
      } else {
        message.error(response.msg);
      }
    },
    * removeAccount({payload}, {call, put}) {
      const response = yield call(removeAccount, payload);
      if (response.code === 200) {
        message.success("删除账户成功");
        return 200;
      } else {
        message.error(response.msg);
      }
    },
    * addAccount({payload}, {call, put}) {
      const response = yield call(addAccount, payload);
      if (response.code === 200) {
        message.success("新增账户成功");
        return 200;
      } else {
        message.error(response.msg);
      }
    },
    * updateAccount({payload}, {call, put}) {
      const response = yield call(updateAccount, payload);
      if (response.code === 200) {
        message.success("更新账户成功");
        return 200;
      } else {
        message.error(response.msg);
      }
    },
  }
}

import {queryCurrent, query as queryUsers} from '@/services/user';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    * fetch(_, {call, put}) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    * fetchCurrent(_, {call, put}) {
      const response = yield call(queryCurrent);
      console.log('fetchCurrent', response.data);
      yield put({
        type: 'saveCurrentUser',
        payload: {
          currentUser: response.data
        },
      });
    },
  },
  reducers: {
    saveCurrentUser(state, {payload}) {
      return {...state, ...payload};
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;

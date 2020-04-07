import {stringify} from 'querystring';
import {router} from 'umi';
import {fakeAccountLogin} from '@/services/login';
import {setAuthority} from '@/utils/authority';
import {getPageQuery} from '@/utils/utils';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
    login: false
  },
  effects: {
    * login({payload}, {call, put}) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: {
          response: response,
          login: response.status === 'ok'
        },
      }); // Login successfully

      if (response.status === 'ok') {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let {redirect} = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }

        router.replace(redirect || '/');
      }
    },

    logout({payload}, {call, put}) {
      const {redirect} = getPageQuery(); // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login' && !redirect) {
        router.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }

      put({
        type: 'changeLoginStatus',
        payload: {
          currentAuthority: undefined,
          login:false
        }
      })
    },
  },
  reducers: {
    changeLoginStatus(state, {payload}) {
      console.log(payload);
      setAuthority(payload.currentAuthority);
      return {...state, status: payload.status, type: payload.type,login:payload.login};
    },
  },
};
export default Model;

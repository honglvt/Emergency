import request from '@/utils/request';

export async function fakeAccountLogin(params) {
  return request('/api/admin/login', {
    method: 'GET',
    params: {
      token: params.Token
    },
  });
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

import request from '../../utils/request';

export async function updateAccount(params) {
  return request('/api/admin/user/v1/update', {
    method: 'PUT',
    data: {
      id: params.id,
      ids: params.ids,
      name: params.name,
      note: params.note,
      userName: params.userName
    },
  });
}

/**
 * 根据分页获得列表
 * @param params 页码
 * @returns {Promise<void>}
 */
export async function getAccountList(params) {
  console.log("getAccountList" + params);
  return request('/api/admin/user/v1/page', {
    method: 'GET',
    params: {
      pageSize: 10,
      page: params
    },
  });

}

export async function addAccount(params) {
  console.log("addAccount" + params);
  return request('/api/admin/user/v1/save', {
    method: 'POST',
    data: {
      id: params.id,
      ids: params.ids,
      name: params.name,
      note: params.note,
      userName: params.userName
    },
  });
}

export async function disableAccount(params) {
  return request(`/api/admin/user/v1/disable/${params.id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
  });
}

export async function removeAccount(params) {
  return request(`/api/admin/user/v1/remove/${params.id}`, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
  });
}



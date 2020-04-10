import request from '../../utils/request';

export async function updateCanteen(params) {
  return request('/api/admin/canteen/v1/update', {
    method: 'PUT',
    data: {
      id: params.id,
      name: params.name,
      isAvailable: params.online ? 'Y' : 'N'
    },
  });
}

/**
 * 根据分页获得列表
 * @param params 页码
 * @returns {Promise<void>}
 */
export async function getCanteenList(params) {
  console.log("getCanteenList" + params);
  return request('/api/admin/canteen/v1/page', {
    method: 'GET',
    params: {
      pageSize: 10,
      page: params
    },
  });

}

export async function addCanteen(params) {
  console.log("addCanteen" + params);
  return request('/api/admin/canteen/v1/save', {
    method: 'POST',
    data: {
      name: params.name,
      isAvailable: params.online ? 'Y' : 'N'
    },
  });
}


export async function getCanteenListOnline(params) {
  return request('/api/admin/canteen/v1/my', {
    method: 'GET',
  });
}

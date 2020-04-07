import request from '../../utils/request';

export async function getCardList(params) {
  return request('/admin/canteen/v1/page', {
    method: 'GET',
    data: {
      pageSize: 10,
      page: params
    },
  });
}

/**
 * 获取组织结构列表
 * @param params
 * @returns {Promise<void>}
 */
export async function getEmployeeList(params) {
  return request('/api/admin/employee/v1/dept/tree', {
    method: 'GET',
  });
}

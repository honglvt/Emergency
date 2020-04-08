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
export async function getEmployeeConstructionTree(params) {
  return request('/api/admin/employee/v1/dept/tree', {
    method: 'GET',
  });
}

/**
 * 根据typeCode获取用户列表
 * @param params
 * @returns {Promise<void>}
 */
export async function getEmployeeList(params) {
  return request('/api/admin/employee/v1/page', {
    method: 'GET',
    params: {
      page: params.page,
      pageSize: 10,
      content: params.content,
      status: params.status,
      typeCode: params.typeCode
    }
  });
}


export async function addChildEmployee(params) {
  return request('/api/admin/employee/v1/dept/save', {
    method: 'POST',
    data: {
      dataCode: params.dataCode,
      dataName: params.dataName,
      isEnable: 'Y',
      pId: params.pId
    }
  });

}

export async function updateChildEmployee(params) {
  return request('/api/admin/employee/v1/dept/update', {
    method: 'PUT',
    data: {
      dataCode: params.dataCode,
      dataName: params.dataName,
      id: params.id,
      isEnable: params.enable ? 'Y' : 'N',
      pId: params.pId
    }
  });

}

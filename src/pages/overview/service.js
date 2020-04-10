import request from '../../utils/request';

export async function fetchOverviewData(params) {
  return request('/api/overview', {
    method: 'GET'
  });
}

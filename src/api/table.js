import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/task/list',
    method: 'get',
    params
  })
}

import request from '@/utils/request'

export function add(data) {
  return request({
    url: '/task/add',
    method: 'post',
    data
  })
}
export function result(data) {
  return request({
    url: '/task/result',
    method: 'post',
    params: { taskId: data },
    responseType: 'blob'
    // config: {
    //   responseType: 'blob'
    // }
  })
}
export function trigger(data) {
  return request({
    url: '/task/trigger',
    method: 'post',
    data
  })
}
export function list(data) {
  return request({
    url: '/task/list',
    method: 'get',
    data
  })
}


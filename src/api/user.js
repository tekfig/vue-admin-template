import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}
export function insert(data) {
  console.log('insert api')
  return request({
    url: '/task/add',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout(token) {
  return request({
    url: '/user/logout',
    method: 'post',
    params: { token }
  })
}

export function register(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

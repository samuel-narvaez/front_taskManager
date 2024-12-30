import request from '../utils/request'

interface LoginRequestData {
  email: string;
  password: string;
}

export function loginRequest(data: LoginRequestData) {
  return request({
    url: 'api/auth/login',
    method: 'post',
    data
  })
}

import request from './request'

export const login = (data) => {
    return request.post('user/login', data)
}
export const register = (data) => {
    return request.post('user/register', data)
}
export const updatePassword = (data) => {
    return request.post('user/updatePassword', data)
}
export const getUserInfo = () => {
    return request.get('user/getUserInfo')
}

export const updateUserInfo = (data) => {
    return request.patch('user/updateUserInfo', data)
}
export const logout = () => {
    return request.post('user/miniProgram/loginOut')
}

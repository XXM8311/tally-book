import request from './request'

// 登录
export const login = (data) => {
    return request.post('user/login', data)
}
// 注册
export const register = (data) => {
    return request.post('user/register', data)
}
//忘记密码
 export const updatePassword=(data)=>{
    return request.post('user/updatePassword',data)
 }
//获取个人信息
export const getUserInfo = () => {
   return request.get('user/getUserInfo')
}

// 更新个人信息
export const updateUserInfo = (data) => {
    return request.patch('user/updateUserInfo',data)
}
// 退出登录
export const logout = () => {
    return request.post('user/miniProgram/loginOut')
}

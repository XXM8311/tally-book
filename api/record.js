import request from './request'

export const addRecord=(data)=>{
    return request.post('record/add',data)
}

export const getRecordStats=(data)=>{
    return request.get(`record/stats?startDate=${data.startDate}&endDate=${data.endDate}&groupBy=${data.groupBy}`)
}

// 获取记录详情
export const getRecordDetail = (id) => {
    return request.get(`record/detail?id=${id}`)
}

// 删除记录
export const deleteRecord = (id) => {
    return request.delete(`record/delete?id=${id}`)
}

// 更新记录
export const updateRecord = ( data) => {
    return request.put(`record/update`, data)
}
// 获取统计报表
export const getReport = (data) => {
    return request.get('record/report', data)
}

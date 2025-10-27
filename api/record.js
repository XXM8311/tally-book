import request from './request'

export const addRecord = (data) => {
    return request.post('record/add', data)
}

export const getRecordStats = (data) => {
    return request.get(`record/stats?startDate=${data.startDate}&endDate=${data.endDate}&groupBy=${data.groupBy}`)
}

export const getRecordDetail = (id) => {
    return request.get(`record/detail?id=${id}`)
}

export const deleteRecord = (id) => {
    return request.delete(`record/delete?id=${id}`)
}

export const updateRecord = (data) => {
    return request.put(`record/update`, data)
}
export const getReport = (data) => {
    return request.get('record/report', data)
}

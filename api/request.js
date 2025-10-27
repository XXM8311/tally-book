export const baseURL = 'http://127.0.0.1:3000/'
const request = {
    http(url, method, data, loading = true) {
        if (loading) {
            uni.showLoading({
                title: "加载中..."
            })
        }

        let header = {
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + uni.getStorageSync("token") || " "
        }
        return new Promise((resolve, reject) => {
            uni.request({
                url: baseURL + url,
                data,
                header,
                method,
                success(res) {
                    if (res.statusCode >= 200 && res.statusCode < 300) {
                        resolve(res.data)
                    } else {
                        title: res.data.message || '请求失败',
                            icon: 'none'
                    })
            reject(res)
        }
                },
    fail(err) {
        uni.showToast({
            title: '网络错误',
            icon: 'none'
        })
        reject(err)
    },
    complete() {
        if (loading) {
            uni.hideLoading()
        }
    }
})
        })
    },

get(url, data, loading = true) {
    return this.http(url, "GET", data, loading)
},

post(url, data, loading = true) {
    return this.http(url, "POST", data, loading)
},

put(url, data, loading = true) {
    return this.http(url, "PUT", data, loading)
},

delete (url, data, loading = true) {
    return this.http(url, "DELETE", data, loading)
},

patch(url, data, loading = true) {
    return this.http(url, "PATCH", data, loading)
}
}

export default request 
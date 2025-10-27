export const baseURL = 'http://127.0.0.1:3000/'//baseURl
 const request = {
    // 基础请求方法
    http(url, method, data, loading = true) {
        if (loading) {
            uni.showLoading({
                title: "加载中..."
            })
        }

        let header = {
            'Content-Type': 'application/json',
            "Authorization":'Bearer ' + uni.getStorageSync("token") || " "//从本地获取到token
        }
        return new Promise((resolve, reject) => {//返回一个promise
            uni.request({//内置的request
                url: baseURL + url,//请求地址
                data,//请求参数
                header,//请求头
                method,//请求方法
                success(res) {//成功
                    if (res.statusCode>=200 && res.statusCode<300) {
                        resolve(res.data)//请求正常返回数据
                    } else {
                        uni.showToast({//提示错误信息
                            title: res.data.message || '请求失败',
                            icon: 'none'
                        })
                        reject(res)//失败
                    }
                },
                fail(err) {//失败
                    uni.showToast({
                        title: '网络错误',
                        icon: 'none'
                    })
                    reject(err)
                },
                complete() {//不管成功还是失败都会执行
                    if (loading) {
                        uni.hideLoading()
                    }
                }
            })
        })
    },

    // 便捷方法
    get(url, data, loading = true) {
        return this.http(url, "GET", data, loading)
    },

    post(url, data, loading = true) {
        return this.http(url, "POST", data, loading)
    },

    put(url, data, loading = true) {
        return this.http(url, "PUT", data, loading)
    },

    delete(url, data, loading = true) {
        return this.http(url, "DELETE", data, loading)
    },

    patch(url, data, loading = true) {
        return this.http(url, "PATCH", data, loading)
    }
}

export default request 
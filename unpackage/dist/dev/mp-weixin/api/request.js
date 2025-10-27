"use strict";
const common_vendor = require("../common/vendor.js");
const baseURL = "http://127.0.0.1:3000/";
const request = {
  // 基础请求方法
  http(url, method, data, loading = true) {
    if (loading) {
      common_vendor.index.showLoading({
        title: "加载中..."
      });
    }
    let header = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + common_vendor.index.getStorageSync("token") || " "
    };
    return new Promise((resolve, reject) => {
      common_vendor.index.request({
        url: baseURL + url,
        data,
        header,
        method,
        success(res) {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(res.data);
          } else {
            common_vendor.index.showToast({
              title: res.data.message || "请求失败",
              icon: "none"
            });
            reject(res);
          }
        },
        fail(err) {
          common_vendor.index.showToast({
            title: "网络错误",
            icon: "none"
          });
          reject(err);
        },
        complete() {
          if (loading) {
            common_vendor.index.hideLoading();
          }
        }
      });
    });
  },
  // 便捷方法
  get(url, data, loading = true) {
    return this.http(url, "GET", data, loading);
  },
  post(url, data, loading = true) {
    return this.http(url, "POST", data, loading);
  },
  put(url, data, loading = true) {
    return this.http(url, "PUT", data, loading);
  },
  delete(url, data, loading = true) {
    return this.http(url, "DELETE", data, loading);
  },
  patch(url, data, loading = true) {
    return this.http(url, "PATCH", data, loading);
  }
};
exports.request = request;

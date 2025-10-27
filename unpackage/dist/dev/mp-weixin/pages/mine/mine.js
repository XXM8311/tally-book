"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "mine",
  setup(__props) {
    const userInfo = common_vendor.ref({
      name: "张三",
      phone: "138****8888",
      birthday: "1990-01-01"
    });
    const handleAccount = () => {
      common_vendor.index.showToast({ title: "账户管理", icon: "none" });
    };
    const handleAbout = () => {
      common_vendor.index.showToast({ title: "关于我们", icon: "none" });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(userInfo.value.name),
        b: common_vendor.t(userInfo.value.phone),
        c: common_vendor.t(userInfo.value.birthday),
        d: common_vendor.o(handleAccount),
        e: common_vendor.o(handleAbout)
      };
    };
  }
};
wx.createPage(_sfc_main);

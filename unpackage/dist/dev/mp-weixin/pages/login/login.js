"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_user = require("../../api/user.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const phone = common_vendor.ref("");
    const password = common_vendor.ref("");
    const handleLogin = async () => {
      if (!phone.value || phone.value.length !== 11) {
        common_vendor.index.showToast({
          title: "请输入正确的手机号",
          icon: "none"
        });
        return;
      }
      if (!password.value) {
        common_vendor.index.showToast({
          title: "请输入密码",
          icon: "none"
        });
        return;
      }
      const res = await api_user.login({
        phone: phone.value,
        password: password.value
      });
      if (res.code == 200) {
        common_vendor.index.showToast({
          title: "登录成功",
          icon: "none"
        });
        common_vendor.index.setStorageSync("token", res.data);
        common_vendor.index.switchTab({
          url: "/pages/index/index"
        });
      } else {
        common_vendor.index.showToast({
          title: res.msg,
          icon: "none"
        });
      }
    };
    const goToRegister = () => {
      common_vendor.index.navigateTo({
        url: "/pages/reg/reg"
      });
    };
    const goToForgetPwd = () => {
      common_vendor.index.navigateTo({
        url: "/pages/forgotPassword/forgotPassword"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.p({
          type: "phone-filled",
          size: "20"
        }),
        c: phone.value,
        d: common_vendor.o(($event) => phone.value = $event.detail.value),
        e: common_vendor.p({
          type: "locked-filled",
          size: "20"
        }),
        f: password.value,
        g: common_vendor.o(($event) => password.value = $event.detail.value),
        h: common_vendor.o(handleLogin),
        i: common_vendor.o(goToRegister),
        j: common_vendor.o(goToForgetPwd)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4e4508d"]]);
wx.createPage(MiniProgramPage);

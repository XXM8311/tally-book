"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "reg",
  setup(__props) {
    const phone = common_vendor.ref("");
    const userName = common_vendor.ref("");
    const password = common_vendor.ref("");
    const confirmPassword = common_vendor.ref("");
    const sex = common_vendor.ref("1");
    const handleSexChange = (e) => {
      sex.value = e.detail.value;
    };
    const handleRegister = () => {
      if (!phone.value || phone.value.length !== 11) {
        common_vendor.index.showToast({
          title: "请输入正确的手机号",
          icon: "none"
        });
        return;
      }
      if (!userName.value) {
        common_vendor.index.showToast({
          title: "请输入用户名",
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
      if (password.value !== confirmPassword.value) {
        common_vendor.index.showToast({
          title: "两次输入的密码不一致",
          icon: "none"
        });
        return;
      }
      const regData = {
        phone: phone.value,
        userName: userName.value,
        password: password.value,
        sex: sex.value
      };
      console.log("注册数据：", regData);
    };
    const goToLogin = () => {
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "phone-filled",
          size: "20"
        }),
        b: phone.value,
        c: common_vendor.o(($event) => phone.value = $event.detail.value),
        d: common_vendor.p({
          type: "person-filled",
          size: "20"
        }),
        e: userName.value,
        f: common_vendor.o(($event) => userName.value = $event.detail.value),
        g: common_vendor.p({
          type: "locked-filled",
          size: "20"
        }),
        h: password.value,
        i: common_vendor.o(($event) => password.value = $event.detail.value),
        j: common_vendor.p({
          type: "locked-filled",
          size: "20"
        }),
        k: confirmPassword.value,
        l: common_vendor.o(($event) => confirmPassword.value = $event.detail.value),
        m: sex.value === "1",
        n: sex.value === "2",
        o: common_vendor.o(handleSexChange),
        p: common_vendor.o(handleRegister),
        q: common_vendor.o(goToLogin)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bca7dd61"]]);
wx.createPage(MiniProgramPage);

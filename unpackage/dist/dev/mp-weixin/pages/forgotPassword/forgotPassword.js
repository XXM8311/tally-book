"use strict";
const common_vendor = require("../../common/vendor.js");
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
  __name: "forgotPassword",
  setup(__props) {
    const phone = common_vendor.ref("");
    const code = common_vendor.ref("");
    const newPassword = common_vendor.ref("");
    const confirmPassword = common_vendor.ref("");
    const counting = common_vendor.ref(false);
    const counter = common_vendor.ref(60);
    const getVerifyCode = async () => {
      if (!phone.value || phone.value.length !== 11) {
        common_vendor.index.showToast({
          title: "请输入正确的手机号",
          icon: "none"
        });
        return;
      }
      counting.value = true;
      counter.value = 60;
      const timer = setInterval(() => {
        counter.value--;
        if (counter.value <= 0) {
          clearInterval(timer);
          counting.value = false;
        }
      }, 1e3);
      const res = await api_user.getCode(phone.value);
      console.log(res);
    };
    const handleSubmit = async () => {
      if (!phone.value || phone.value.length !== 11) {
        common_vendor.index.showToast({
          title: "请输入正确的手机号",
          icon: "none"
        });
        return;
      }
      if (!code.value || code.value.length !== 4) {
        common_vendor.index.showToast({
          title: "请输入4位验证码",
          icon: "none"
        });
        return;
      }
      if (!newPassword.value) {
        common_vendor.index.showToast({
          title: "请输入新密码",
          icon: "none"
        });
        return;
      }
      if (newPassword.value !== confirmPassword.value) {
        common_vendor.index.showToast({
          title: "两次输入的密码不一致",
          icon: "none"
        });
        return;
      }
      const res = await api_user.forgotPassword({
        phone: phone.value,
        code: code.value,
        newPassword: newPassword.value
      });
      console.log(res);
      if (res.code === 200) {
        common_vendor.index.showToast({
          title: "修改成功",
          icon: "none"
        });
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 1e3);
      } else {
        common_vendor.index.showToast({
          title: res.msg,
          icon: "none"
        });
      }
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
          type: "safety-filled",
          size: "20"
        }),
        e: code.value,
        f: common_vendor.o(($event) => code.value = $event.detail.value),
        g: common_vendor.t(counting.value ? `${counter.value}s后重新获取` : "获取验证码"),
        h: counting.value,
        i: common_vendor.o(getVerifyCode),
        j: common_vendor.p({
          type: "locked-filled",
          size: "20"
        }),
        k: newPassword.value,
        l: common_vendor.o(($event) => newPassword.value = $event.detail.value),
        m: common_vendor.p({
          type: "locked-filled",
          size: "20"
        }),
        n: confirmPassword.value,
        o: common_vendor.o(($event) => confirmPassword.value = $event.detail.value),
        p: common_vendor.o(handleSubmit),
        q: common_vendor.o(goToLogin)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-52dd5324"]]);
wx.createPage(MiniProgramPage);

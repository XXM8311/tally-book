"use strict";
const common_vendor = require("../../common/vendor.js");
const api_record = require("../../api/record.js");
if (!Array) {
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  (_easycom_uni_datetime_picker2 + _easycom_u_icon2)();
}
const _easycom_uni_datetime_picker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
const _easycom_u_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  (_easycom_uni_datetime_picker + _easycom_u_icon)();
}
const _sfc_main = {
  __name: "record",
  setup(__props) {
    const amount = common_vendor.ref("");
    const type = common_vendor.ref("支出");
    const category = common_vendor.ref("");
    const remark = common_vendor.ref("");
    const date = common_vendor.ref((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
    const categories = {
      "支出": [
        { name: "餐饮", icon: "gift" },
        { name: "购物", icon: "shopping-cart" },
        { name: "交通", icon: "car" },
        { name: "娱乐", icon: "play-right" },
        { name: "医疗", icon: "heart" },
        { name: "其他", icon: "more-dot-fill" }
      ],
      "收入": [
        { name: "工资", icon: "red-packet" },
        { name: "奖金", icon: "gift" },
        { name: "理财", icon: "rmb-circle" },
        { name: "其他", icon: "more-dot-fill" }
      ]
    };
    const save = async () => {
      if (!amount.value) {
        common_vendor.index.showToast({ title: "请输入金额", icon: "none" });
        return;
      }
      if (!category.value) {
        common_vendor.index.showToast({ title: "请选择分类", icon: "none" });
        return;
      }
      const res = await api_record.addRecord({
        amount: amount.value,
        type: type.value,
        category: category.value,
        remark: remark.value,
        date: date.value
      });
      if (res.code === 200) {
        common_vendor.index.showToast({
          title: "保存成功",
          icon: "none"
        });
        amount.value = "";
        type.value = "支出";
        category.value = "";
        remark.value = "";
      }
    };
    return (_ctx, _cache) => {
      return {
        a: amount.value,
        b: common_vendor.o(($event) => amount.value = $event.detail.value),
        c: common_vendor.t(date.value),
        d: common_vendor.o(($event) => date.value = $event),
        e: common_vendor.p({
          type: "date",
          border: false,
          modelValue: date.value
        }),
        f: type.value === "支出" ? 1 : "",
        g: common_vendor.o(($event) => type.value = "支出"),
        h: type.value === "收入" ? 1 : "",
        i: common_vendor.o(($event) => type.value = "收入"),
        j: common_vendor.f(categories[type.value], (item, k0, i0) => {
          return {
            a: "27d929da-1-" + i0,
            b: common_vendor.p({
              name: item.icon,
              size: "32",
              color: category.value === item.name ? "#007AFF" : "#666"
            }),
            c: common_vendor.t(item.name),
            d: item.name,
            e: common_vendor.o(($event) => category.value = item.name, item.name),
            f: category.value === item.name ? 1 : ""
          };
        }),
        k: remark.value,
        l: common_vendor.o(($event) => remark.value = $event.detail.value),
        m: common_vendor.o(save)
      };
    };
  }
};
wx.createPage(_sfc_main);

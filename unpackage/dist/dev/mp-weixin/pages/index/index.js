"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _component_uni_popup = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _component_uni_popup)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const indicatorStyle = "height: 80rpx;";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const datePicker = common_vendor.ref(null);
    const datePickerValue = common_vendor.ref([0, 0]);
    const selectedYear = common_vendor.ref((/* @__PURE__ */ new Date()).getFullYear());
    const currentFilter = common_vendor.ref("week");
    const years = common_vendor.computed(() => {
      const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
      const years2 = [];
      for (let year = 2020; year <= currentYear; year++) {
        years2.push(year);
      }
      return years2;
    });
    const timeUnits = common_vendor.ref([
      { label: "按周", value: "week" },
      { label: "按月", value: "month" },
      { label: "按年", value: "year" }
    ]);
    const showDatePicker = () => {
      datePicker.value.open();
    };
    const closeDatePicker = () => {
      datePicker.value.close();
    };
    const handleDateChange = (e) => {
      const values = e.detail.value;
      datePickerValue.value = values;
    };
    const confirmDate = () => {
      const selectedYearIndex = datePickerValue.value[0];
      const selectedTimeUnitIndex = datePickerValue.value[1];
      selectedYear.value = years.value[selectedYearIndex];
      currentFilter.value = timeUnits.value[selectedTimeUnitIndex].value;
      console.log("选择的年份:", selectedYear.value);
      console.log("选择的时间维度:", currentFilter.value);
      closeDatePicker();
    };
    const yearPopup = common_vendor.ref(null);
    const yearList = common_vendor.ref([2023, 2024]);
    const closeYearPicker = () => {
      yearPopup.value.close();
    };
    const selectYear = (year) => {
      selectedYear.value = year;
      closeYearPicker();
    };
    const filterTypes = common_vendor.ref([
      { label: "按年", value: "year" },
      { label: "按月", value: "month" },
      { label: "按周", value: "week" }
    ]);
    const summary = common_vendor.ref({
      balance: 2338.5,
      totalIncome: 2500,
      totalExpense: 161.5
    });
    const billList = common_vendor.ref([
      {
        period: "12月",
        year: 2024,
        balance: 2354,
        income: 2500,
        expense: 146,
        records: [
          {
            amount: "120.50",
            type: "支出",
            category: "餐饮",
            remark: "牛肉火锅",
            date: "2024-12-24"
          },
          {
            amount: "25.50",
            type: "支出",
            category: "餐饮",
            remark: "鸡公煲",
            date: "2024-12-24"
          },
          {
            amount: "1500.00",
            type: "收入",
            category: "其他",
            remark: "生活费",
            date: "2024-12-19"
          }
        ]
      },
      {
        period: "11月",
        year: 2024,
        balance: -15.5,
        income: 0,
        expense: 15.5,
        records: [
          {
            amount: "15.50",
            type: "支出",
            category: "餐饮",
            remark: "鸡公煲",
            date: "2024-10-31"
          }
        ]
      }
    ]);
    const changeFilter = (type) => {
      currentFilter.value = type;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(selectedYear.value),
        b: common_vendor.p({
          type: "bottom",
          size: "14",
          color: "#666"
        }),
        c: common_vendor.o(showDatePicker),
        d: common_vendor.t(summary.value.balance),
        e: common_vendor.t(summary.value.totalIncome),
        f: common_vendor.t(summary.value.totalExpense),
        g: common_vendor.f(filterTypes.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.label),
            b: index,
            c: common_vendor.n(currentFilter.value === item.value ? "active" : ""),
            d: common_vendor.o(($event) => changeFilter(item.value), index)
          };
        }),
        h: common_vendor.f(billList.value, (group, index, i0) => {
          return {
            a: common_vendor.t(group.period),
            b: common_vendor.t(group.income),
            c: common_vendor.t(group.expense),
            d: common_vendor.f(group.records, (record, rIndex, i1) => {
              return {
                a: common_vendor.t(record.category),
                b: common_vendor.t(record.remark),
                c: common_vendor.t(record.type === "支出" ? "-" : "+"),
                d: common_vendor.t(record.amount),
                e: common_vendor.n(record.type === "支出" ? "expense" : "income"),
                f: rIndex
              };
            }),
            e: index
          };
        }),
        i: common_vendor.o(closeYearPicker),
        j: common_vendor.f(yearList.value, (year, k0, i0) => {
          return {
            a: common_vendor.t(year),
            b: year,
            c: common_vendor.n(selectedYear.value === year ? "active" : ""),
            d: common_vendor.o(($event) => selectYear(year), year)
          };
        }),
        k: common_vendor.sr(yearPopup, "1cf27b2a-1", {
          "k": "yearPopup"
        }),
        l: common_vendor.p({
          type: "bottom"
        }),
        m: common_vendor.o(closeDatePicker),
        n: common_vendor.o(confirmDate),
        o: common_vendor.f(years.value, (year, k0, i0) => {
          return {
            a: common_vendor.t(year),
            b: year
          };
        }),
        p: common_vendor.f(timeUnits.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.label),
            b: index
          };
        }),
        q: indicatorStyle,
        r: datePickerValue.value,
        s: common_vendor.o(handleDateChange),
        t: common_vendor.sr(datePicker, "1cf27b2a-2", {
          "k": "datePicker"
        }),
        v: common_vendor.p({
          type: "bottom"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);

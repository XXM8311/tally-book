<template>
  <view class="container">
    <view class="detail-card">
      <view class="amount-section">
        <text class="type-label">{{ recordDetail.type }}</text>
        <view class="amount-input">
          <text class="prefix">{{
            recordDetail.type === "支出" ? "-" : "+"
          }}</text>
          <input
            type="digit"
            class="amount"
            v-model="recordDetail.amount"
            placeholder="请输入金额"
          />
        </view>
      </view>

      <view class="info-list">
        <view class="info-item">
          <text class="label">类别</text>
          <input
            class="input-value"
            v-model="recordDetail.category"
            placeholder="请输入类别"
          />
        </view>
        <view class="info-item">
          <text class="label">日期</text>
          <picker
            mode="date"
            :value="formatDate(recordDetail.date)"
            :end="formatDate(new Date())"
            @change="onDateChange"
          >
            <view class="picker-value">
              <text>{{ formatDate(recordDetail.date) }}</text>
              <uni-icons type="bottom" size="14" color="#666"></uni-icons>
            </view>
          </picker>
        </view>
        <view class="info-item">
          <text class="label">备注</text>
          <input
            class="input-value"
            v-model="recordDetail.remark"
            placeholder="请输入备注"
          />
        </view>
      </view>
    </view>

    <view class="bottom-buttons">
      <button class="btn edit-btn" @click="handleEdit">保存</button>
      <button class="btn delete-btn" @click="handleDelete">删除</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { getRecordDetail, deleteRecord, updateRecord } from "@/api/record";
import { onLoad } from "@dcloudio/uni-app";

const recordDetail = ref({
  id: "",
  type: "",
  amount: "",
  category: "",
  date: "",
  remark: "",
});

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
};

const onDateChange = (e) => {
  recordDetail.value.date = new Date(e.detail.value).toISOString();
};

const getDetail = async (id) => {
  try {
    const res = await getRecordDetail(id);
    if (res.code === 200 && res.data.length > 0) {
      recordDetail.value = res.data[0];
    }
  } catch (error) {
    uni.showToast({
      title: "获取详情失败",
      icon: "none",
    });
  }
};

const handleEdit = async () => {
  if (!recordDetail.value.amount) {
    uni.showToast({
      title: "请输入金额",
      icon: "none",
    });
    return;
  }

  if (!recordDetail.value.category) {
    uni.showToast({
      title: "请输入类别",
      icon: "none",
    });
    return;
  }

  const res = await updateRecord(recordDetail.value);
  if (res.code === 200) {
    uni.showToast({
      title: "编辑成功",
      icon: "success",
    });
    setTimeout(() => {
      uni.navigateBack();
    }, 1500);
  }
};

const handleDelete = () => {
  uni.showModal({
    title: "提示",
    content: "确定要删除这条记录吗？",
    success: async (res) => {
      if (res.confirm) {
        try {
          const result = await deleteRecord(recordDetail.value.id);
          if (result.code === 200) {
            uni.showToast({
              title: "删除成功",
              icon: "success",
            });
            setTimeout(() => {
              uni.navigateBack();
            }, 1500);
          }
        } catch (error) {
          uni.showToast({
            title: "删除失败",
            icon: "none",
          });
        }
      }
    },
  });
};

onLoad((options) => {
  if (options.id) {
    getDetail(options.id);
  }
});
</script>

<style scoped>
.container {
  min-height: 100vh;
  background: #f7f8fa;
  padding: 30rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.detail-card {
  background: #fff;
  border-radius: 24rpx;
  padding: 40rpx;
  margin-bottom: 40rpx;
}

.amount-section {
  text-align: center;
  padding-bottom: 40rpx;
  border-bottom: 2rpx solid #f5f5f5;
  margin-bottom: 40rpx;
}

.type-label {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 20rpx;
  display: block;
}

.amount {
  font-size: 60rpx;
  font-weight: bold;
  color: #ff5555;
}

.income {
  color: #07c160;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 30rpx;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f5f5f5;
}

.info-item:last-child {
  border-bottom: none;
}

.label {
  color: #666;
  font-size: 28rpx;
}

.value {
  color: #333;
  font-size: 28rpx;
}

.input-value {
  text-align: right;
  font-size: 28rpx;
  color: #333;
}

.picker-value {
  display: flex;
  align-items: center;
  gap: 10rpx;
  font-size: 28rpx;
  color: #333;
}

.bottom-buttons {
  margin-top: auto;
  display: flex;
  gap: 30rpx;
  padding: 40rpx 0;
}

.btn {
  flex: 1;
  height: 88rpx;
  line-height: 88rpx;
  text-align: center;
  border-radius: 44rpx;
  font-size: 32rpx;
}

.edit-btn {
  background: #3494e6;
  color: #fff;
}

.delete-btn {
  background: #ff5555;
  color: #fff;
}

.amount-input {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60rpx;
  font-weight: bold;
  margin-left: 100rpx;
}

.prefix {
  color: #ff5555;
  margin-right: 4rpx;
}

.amount-input .amount {
  width: 300rpx;
  text-align: left;
  font-size: 60rpx;
  font-weight: bold;
}

.amount-input .amount.expense {
  color: #ff5555;
}

.amount-input .amount.income {
  color: #07c160;
}
</style>

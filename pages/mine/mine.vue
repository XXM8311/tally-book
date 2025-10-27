<template>
  <view class="container">
    <view class="user-card">
      <view class="user-info">
        <text class="username">{{ userInfo.userName }}</text>
        <text class="phone">{{ userInfo.phone }}</text>
        <text class="sex">{{
          userInfo.sex === "1" ? "男" : userInfo.sex === "0" ? "女" : "未设置"
        }}</text>
      </view>
    </view>

    <view class="menu-list">
      <view class="menu-item" @click="showAccountPopup = true">
        <text class="menu-text">账户管理</text>
      </view>
      <view class="menu-item" @click="showAboutPopup = true">
        <text class="menu-text">关于我们</text>
      </view>
    </view>
    <u-popup
      :show="showAccountPopup"
      mode="bottom"
      @close="showAccountPopup = false"
      round="16"
    >
      <view class="edit-popup">
        <view class="popup-header">
          <text>账户管理</text>
          <u-icon
            name="close"
            size="28"
            @click="showAccountPopup = false"
          ></u-icon>
        </view>

        <scroll-view scroll-y class="popup-content">
          <view class="edit-item" @click="showChangePassword">
            <text class="label">修改密码</text>
            <view class="value-wrapper">
              <u-icon name="arrow-right" size="24"></u-icon>
            </view>
          </view>

          <view class="edit-item warning" @click="handleLogout">
            <text class="label">退出登录</text>
            <view class="value-wrapper">
              <u-icon name="arrow-right" size="24"></u-icon>
            </view>
          </view>
        </scroll-view>
      </view>
    </u-popup>

    <u-popup
      :show="showPasswordPopup"
      mode="bottom"
      @close="showPasswordPopup = false"
      round="16"
    >
      <view class="edit-popup">
        <view class="popup-header">
          <text>修改密码</text>
          <u-icon
            name="close"
            size="28"
            @click="showPasswordPopup = false"
          ></u-icon>
        </view>

        <scroll-view scroll-y class="popup-content">
          <view class="edit-item">
            <text class="label">原密码</text>
            <input
              type="password"
              v-model="passwordForm.oldPassword"
              placeholder="请输入原密码"
              class="input"
            />
          </view>

          <view class="edit-item">
            <text class="label">新密码</text>
            <input
              type="password"
              v-model="passwordForm.newPassword"
              placeholder="请输入新密码"
              class="input"
            />
          </view>

          <view class="edit-item">
            <text class="label">确认密码</text>
            <input
              type="password"
              v-model="passwordForm.rePassword"
              placeholder="请再次输入新密码"
              class="input"
            />
          </view>
        </scroll-view>

        <view class="popup-footer">
          <button class="save-btn" @click="submitPassword">确认修改</button>
        </view>
      </view>
    </u-popup>
    <u-popup
      :show="showAboutPopup"
      mode="bottom"
      @close="showAboutPopup = false"
      round="16"
    >
      <view class="edit-popup">
        <view class="popup-header">
          <text>关于我们</text>
          <u-icon
            name="close"
            size="28"
            @click="showAboutPopup = false"
          ></u-icon>
        </view>

        <scroll-view scroll-y class="popup-content">
          <view class="about-content">
            <image src="/static/logo.png" class="logo" mode="aspectFit" />
            <view class="app-name">记账本</view>
            <view class="version">版本号：1.0.0</view>
            <view class="desc">
              一个简单易用的记账应用，帮助您轻松管理日常收支。
            </view>
          </view>
        </scroll-view>
      </view>
    </u-popup>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { getUserInfo, updatePassword } from "@/api/user";
import { onShow } from "@dcloudio/uni-app";

const userInfo = ref({
  userName: "",
  phone: "",
  sex: "",
});

const showAccountPopup = ref(false);
const showPasswordPopup = ref(false);
const showAboutPopup = ref(false);

const passwordForm = ref({
  oldPassword: "",
  newPassword: "",
  rePassword: "",
});

const fetchUserInfo = async () => {
  try {
    const res = await getUserInfo();
    if (res.code === 200) {
      userInfo.value = res.data;
    }
  } catch (error) {
    uni.showToast({
      title: "获取用户信息失败",
      icon: "none",
    });
  }
};

const showChangePassword = () => {
  showAccountPopup.value = false;
  showPasswordPopup.value = true;
};

const submitPassword = async () => {
  if (!passwordForm.value.oldPassword) {
    uni.showToast({
      title: "请输入原密码",
      icon: "none",
    });
    return;
  }
  if (!passwordForm.value.newPassword) {
    uni.showToast({
      title: "请输入新密码",
      icon: "none",
    });
    return;
  }
  if (passwordForm.value.newPassword !== passwordForm.value.rePassword) {
    uni.showToast({
      title: "两次密码输入不一致",
      icon: "none",
    });
    return;
  }

  const res = await updatePassword(passwordForm.value);
  if (res.code === 200) {
    console.log(res);

    uni.showToast({
      title: "修改成功",
      icon: "success",
    });
    showPasswordPopup.value = false;
    passwordForm.value = {
      oldPassword: "",
      newPassword: "",
      rePassword: "",
    };
  } else {
    uni.showToast({
      title: res.msg,
      icon: "none",
    });
  }
};

const handleLogout = () => {
  showAccountPopup.value = false;
  uni.showModal({
    title: "提示",
    content: "确定要退出登录吗？",
    success: async (res) => {
      if (res.confirm) {
        uni.clearStorageSync();
        uni.showToast({
          title: "退出成功",
          icon: "none",
        });
        setTimeout(() => {
          uni.navigateTo({
            url: "/pages/login/login",
          });
        }, 1000);
      }
    },
  });
};

onShow(() => {
  fetchUserInfo();
});
</script>

<style>
.container {
  padding: 20rpx;
  background: #f5f5f5;
  min-height: 100vh;
}

.user-card {
  background: linear-gradient(135deg, #3494e6, #ec6ead);
  border-radius: 24rpx;
  padding: 40rpx;
  margin-bottom: 30rpx;
}

.user-info {
  margin-left: 30rpx;
}

.username {
  font-size: 36rpx;
  color: #fff;
  font-weight: bold;
  margin-bottom: 10rpx;
  display: block;
}

.phone,
.sex {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.8);
  display: block;
  margin-top: 10rpx;
}

.menu-list {
  background: #fff;
  border-radius: 24rpx;
  padding: 0 20rpx;
}

.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx 20rpx;
  border-bottom: 1rpx solid #eee;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-text {
  font-size: 28rpx;
  color: #333;
}

.arrow {
  color: #999;
  font-size: 28rpx;
}

.edit-popup {
  background: #fff;
  border-radius: 24rpx 24rpx 0 0;
  min-height: 400rpx;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx;
  border-bottom: 1rpx solid #eee;
  font-size: 32rpx;
  font-weight: bold;
}

.popup-content {
  max-height: 60vh;
}

.edit-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx 10rpx;
  border-bottom: 1rpx solid #eee;
}

.edit-item:last-child {
  border-bottom: none;
}

.edit-item.warning .label {
  color: #ff9900;
}

.edit-item.danger .label {
  color: #ff5555;
}

.label {
  font-size: 28rpx;
  color: #333;
}

.input {
  flex: 1;
  text-align: right;
  font-size: 28rpx;
  color: #333;
}

.popup-footer {
  padding: 30rpx;
  border-top: 1rpx solid #eee;
}

.save-btn {
  background: #3494e6;
  color: #fff;
  border-radius: 44rpx;
  height: 88rpx;
  line-height: 88rpx;
  font-size: 32rpx;
}

.about-content {
  text-align: center;
  padding: 40rpx 0;
}

.logo {
  width: 160rpx;
  height: 160rpx;
  margin-bottom: 20rpx;
}

.app-name {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
}

.version {
  font-size: 24rpx;
  color: #999;
  margin-bottom: 30rpx;
}

.desc {
  font-size: 28rpx;
  color: #666;
  line-height: 1.6;
  padding: 0 40rpx;
}
</style>

<template>
	<view class="login-container"> 
	<!-- view就是div -->
		<!-- 顶部logo区域 -->
		<view class="logo-box">
		<view><image src="/static/logo.png" mode="aspectFit" class="logo"></image></view>
			<text class="title">欢迎登录</text>
			<!-- text就是p标签 -->
		</view>
		
		<!-- 表单区域 -->
		<view class="form-box">
			<!-- 手机号输入框 -->
			<view class="input-item">
				<uni-icons type="phone-filled" size="20"></uni-icons>
				<!-- icon图标 -->
				<input type="number" v-model="phone" placeholder="请输入手机号" maxlength="11" />
				<!-- 手机号码输入框 -->
			</view>
			
			<!-- 密码输入框 -->
			<view class="input-item">
				<uni-icons type="locked-filled" size="20"></uni-icons>
				<input type="password" v-model="password" placeholder="请输入密码" />
			</view>
			
			<!-- 登录按钮 -->
			<button class="login-btn" @click="handleLogin">登录</button>
			
			<!-- 其他操作按钮 -->
			<view class="other-options">
				<text @click="goToRegister">注册账号</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import {login} from '@/api/user'

const phone = ref('')
const password = ref('')

// 登录方法
const handleLogin = async() => {
	if (!phone.value || phone.value.length !== 11) {
		//进行校验
		uni.showToast({
			title: '请输入正确的手机号',
			icon: 'none'
		})
		return
	}
	if (!password.value) {
		//密码不能为空
		uni.showToast({
			title: '请输入密码',
			icon: 'none'
		})
		return
	}
	
	const res = await login({
		phone: phone.value,
		password: password.value
	})
	console.log(res);
	if(res.code == 200) {
		uni.showToast({
			title: '登录成功',
			icon: 'none'
		})
		// 保存token
		uni.setStorageSync('token', res.data)//本地存储token
		uni.switchTab({//返回首页
			url: '/pages/index/index'
		})
	} else {
		//提示错误
		uni.showToast({
			title: res.msg,
			icon: 'none'
		})
	}
}

// 跳转到注册页面
const goToRegister = () => {
	uni.navigateTo({//跳转到注册页面
		url: '/pages/reg/reg'
	})
}

</script>

<style scoped>
.login-container {
	padding: 40rpx;
}

.logo-box {
	text-align: center;
	margin: 60rpx 0;
}

.logo {
	width: 160rpx;
	height: 160rpx;
}

.title {
	font-size: 40rpx;
	margin-top: 20rpx;
	font-weight: bold;
}

.input-item {
	display: flex;
	align-items: center;
	height: 100rpx;
	background-color: #f8f8f8;
	border-radius: 50rpx;
	padding: 0 30rpx;
	margin-bottom: 30rpx;
}

.input-item input {
	flex: 1;
	margin-left: 20rpx;
	font-size: 28rpx;
}

.login-btn {
	background: #007AFF;
	color: #fff;
	border-radius: 50rpx;
	height: 90rpx;
	line-height: 90rpx;
	margin: 40rpx 0;
}

.other-options {
	text-align: right;
	font-size: 28rpx;
	padding: 0 20rpx;
}

.other-options text {
	color: #007AFF;
}
</style>

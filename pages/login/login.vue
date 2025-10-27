<template>
	<view class="login-container"> 
		<view class="logo-box">
		<view><image src="/static/logo.png" mode="aspectFit" class="logo"></image></view>
			<text class="title">欢迎登录</text>
		</view>
		
		<view class="form-box">
			<view class="input-item">
				<uni-icons type="phone-filled" size="20"></uni-icons>
				<input type="number" v-model="phone" placeholder="请输入手机号" maxlength="11" />
			</view>
			
			<view class="input-item">
				<uni-icons type="locked-filled" size="20"></uni-icons>
				<input type="password" v-model="password" placeholder="请输入密码" />
			</view>
			
			<button class="login-btn" @click="handleLogin">登录</button>
			
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

const handleLogin = async() => {
	if (!phone.value || phone.value.length !== 11) {
		uni.showToast({
			title: '请输入正确的手机号',
			icon: 'none'
		})
		return
	}
	if (!password.value) {
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
			url: '/pages/index/index'
		})
	} else {
		uni.showToast({
			title: res.msg,
			icon: 'none'
		})
	}
}

const goToRegister = () => {
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

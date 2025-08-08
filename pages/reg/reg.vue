<template>
	<view class="reg-container">
		<!-- 顶部标题 -->
		<view class="header">
			<text class="title">用户注册</text>
		</view>
		
		<!-- 表单区域 -->
		<view class="form-box">
			<!-- 手机号输入框 -->
			<view class="input-item">
				<uni-icons type="phone-filled" size="20"></uni-icons>
				<input type="number" v-model="phone" placeholder="请输入手机号" maxlength="11" />
			</view>
			
			<!-- 用户名输入框 -->
			<view class="input-item">
				<uni-icons type="person-filled" size="20"></uni-icons>
				<input type="text" v-model="userName" placeholder="请输入用户名" />
			</view>
			
			<!-- 密码输入框 -->
			<view class="input-item">
				<uni-icons type="locked-filled" size="20"></uni-icons>
				<input type="password" v-model="password" placeholder="请输入密码" />
			</view>
			
			<!-- 确认密码输入框 -->
			<view class="input-item">
				<uni-icons type="locked-filled" size="20"></uni-icons>
				<input type="password" v-model="confirmPassword" placeholder="请确认密码" />
			</view>
			
			<!-- 性别选择 -->
			<view class="sex-select">
				<text class="label">性别：</text>
				<radio-group @change="handleSexChange">
					<label class="radio-item">
						<radio value="1" color="#007AFF" :checked="sex === '1'" />
						<text>男</text>
					</label>
					<label class="radio-item">
						<radio value="2" color="#007AFF" :checked="sex === '2'" />
						<text>女</text>
					</label>
				</radio-group>
			</view>
			
			<!-- 注册按钮 -->
			<button class="reg-btn" @click="handleRegister">注册</button>
			
			<!-- 返回登录 -->
			<view class="back-login">
				<text @click="goToLogin">已有账号？返回登录</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import {register} from '@/api/user'
const phone = ref('')
const userName = ref('')
const password = ref('')
const confirmPassword = ref('')
const sex = ref('1') // 默认男性

// 性别选择改变
const handleSexChange = (e) => {
	sex.value = e.detail.value
}

// 注册方法
const handleRegister = async () => {
	// 表单验证
	if (!phone.value || phone.value.length !== 11) {
		uni.showToast({
			title: '请输入正确的手机号',
			icon: 'none'
		})
		return
	}
	if (!userName.value) {
		uni.showToast({
			title: '请输入用户名',
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
	if (password.value !== confirmPassword.value) {
		uni.showToast({
			title: '两次输入的密码不一致',
			icon: 'none'
		})
		return
	}
	
	const regData = {
		phone: phone.value,
		userName: userName.value,
		password: password.value,
		sex: sex.value
	}
	const res = await register(regData)
	if(res.code === 200){
		uni.showToast({
			title: '注册成功',
			icon: 'none'
		})//提示注册成功
		setTimeout(() => {//隔一秒跳转登录页
			uni.navigateTo({
				url: '/pages/login/login'
			})
		}, 1000)
	}else{
		uni.showToast({
			title: res.msg,
			icon: 'none'
		})
	}
}

// 返回登录页
const goToLogin = () => {
	uni.navigateBack()//返回
}
</script>

<style scoped>
.reg-container {
	padding: 40rpx;
}

.header {
	text-align: center;
	margin: 60rpx 0;
}

.title {
	font-size: 40rpx;
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

.sex-select {
	display: flex;
	align-items: center;
	padding: 20rpx 30rpx;
	margin-bottom: 30rpx;
}

.sex-select .label {
	font-size: 28rpx;
	margin-right: 30rpx;
}

.radio-item {
	margin-right: 60rpx;
	font-size: 28rpx;
}

.radio-item radio {
	transform: scale(0.8);
	margin-right: 10rpx;
}

.reg-btn {
	background: #007AFF;
	color: #fff;
	border-radius: 50rpx;
	height: 90rpx;
	line-height: 90rpx;
	margin: 40rpx 0;
}

.back-login {
	text-align: center;
	font-size: 28rpx;
}

.back-login text {
	color: #007AFF;
}
</style>

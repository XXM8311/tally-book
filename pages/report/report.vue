<template>
	<view class="container">
		<view class="nav-header">
			<view class="left">
				<uni-icons type="left" size="20" @click="goBack"></uni-icons>
				<text>报表</text>
			</view>
			<view class="year-picker">
				<picker
					mode="date"
					fields="year"
					:value="currentYear + '-01-01'"
					:end="new Date().toISOString().slice(0, 10)"
					@change="onYearChange"
				>
					<view class="picker-text">
						{{ currentYear }}年
						<uni-icons type="bottom" size="14" color="#666"></uni-icons>
					</view>
				</picker>
			</view>
		</view>

		<view class="stats-card">
			<view class="card-title">账本流水统计</view>
			<view class="balance">
				<text class="label">结余</text>
				<text class="amount">{{ reportData.summary?.balance || 0 }}</text>
			</view>
			<view class="summary">
				<text>总收入 {{ reportData.summary?.totalIncome || 0 }}</text>
				<text class="divider">|</text>
				<text>总支出 {{ reportData.summary?.totalExpense || 0 }}</text>
			</view>
		</view>

		<view class="milestone">
			<uni-icons type="flag" size="20" color="#3494E6"></uni-icons>
			<text class="milestone-text">记账里程碑</text>
			<text class="record-count">记账笔数 {{ getTotalCount() }}</text>
		</view>

		<view class="section">
			<view class="section-header">
				<text class="section-title">收入来源</text>
				<text class="total-amount">{{ reportData.summary?.totalIncome || 0 }}</text>
			</view>
			<view class="category-list">
				<view class="category-item" v-for="(item, index) in reportData.categories?.income" :key="index">
					<view class="category-info">
						<text class="rank">{{ index + 1 }}</text>
						<text class="category-name">{{ item.category }}</text>
					</view>
					<view class="category-stats">
						<view class="progress-bar">
							<view class="progress" :style="{ width: item.percentage }"></view>
						</view>
						<text class="percentage">{{ item.percentage }}</text>
						<text class="amount">{{ item.amount }}</text>
					</view>
				</view>
			</view>
		</view>

		<view class="section">
			<view class="section-header">
				<text class="section-title">支出分布</text>
				<text class="total-amount">{{ reportData.summary?.totalExpense || 0 }}</text>
			</view>
			<view class="category-list">
				<view class="category-item" v-for="(item, index) in reportData.categories?.expense" :key="index">
					<view class="category-info">
						<text class="rank">{{ index + 1 }}</text>
						<text class="category-name">{{ item.category }}</text>
					</view>
					<view class="category-stats">
						<view class="progress-bar">
							<view class="progress" :style="{ width: item.percentage }"></view>
						</view>
						<text class="percentage">{{ item.percentage }}</text>
						<text class="amount">{{ item.amount }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { getReport } from '@/api/record'
import { onLoad } from '@dcloudio/uni-app'

const currentYear = ref()
const reportData = ref({})

const goBack = () => {
	uni.navigateBack()
}

const fetchReportData = async (year) => {
	const res = await getReport({
		startDate: `${year}-01-01`,
		endDate: `${year}-12-31`
	})
	if (res.code === 200) {
		reportData.value = res.data
	}
}

const onYearChange = async (e) => {
	const year = new Date(e.detail.value).getFullYear()
	currentYear.value = year
	await fetchReportData(year)
}

const getTotalCount = () => {
	let total = 0
	reportData.value.categories?.income?.forEach(item => total += item.count)
	reportData.value.categories?.expense?.forEach(item => total += item.count)
	return total
}

onLoad(async (options) => {
	currentYear.value = options.year
	await fetchReportData(options.year)
})
</script>

<style scoped>
.container {
	min-height: 100vh;
	background: #f5f5f5;
	padding-bottom: 40rpx;
}

.nav-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20rpx 30rpx;
	background: #fff;
}

.left {
	display: flex;
	align-items: center;
	gap: 10rpx;
	font-size: 32rpx;
	font-weight: bold;
}

.picker-text {
	display: flex;
	align-items: center;
	gap: 6rpx;
	font-size: 28rpx;
	color: #666;
}

.stats-card {
	margin: 20rpx;
	padding: 30rpx;
	background: linear-gradient(135deg, #3494E6, #EC6EAD);
	border-radius: 24rpx;
	color: #fff;
}

.card-title {
	font-size: 28rpx;
	margin-bottom: 20rpx;
}

.balance {
	margin-bottom: 20rpx;
}

.balance .label {
	font-size: 28rpx;
	margin-right: 20rpx;
}

.balance .amount {
	font-size: 48rpx;
	font-weight: bold;
}

.summary {
	font-size: 24rpx;
	color: rgba(255, 255, 255, 0.8);
}

.divider {
	margin: 0 20rpx;
}

.milestone {
	margin: 20rpx;
	padding: 20rpx;
	background: #fff;
	border-radius: 16rpx;
	display: flex;
	align-items: center;
	gap: 10rpx;
}

.milestone-text {
	font-size: 28rpx;
	font-weight: bold;
	flex: 1;
}

.record-count {
	font-size: 24rpx;
	color: #666;
}

.section {
	margin: 20rpx;
	padding: 20rpx;
	background: #fff;
	border-radius: 16rpx;
}

.section-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20rpx;
}

.section-title {
	font-size: 28rpx;
	font-weight: bold;
}

.total-amount {
	font-size: 28rpx;
	color: #666;
}

.category-item {
	display: flex;
	flex-direction: column;
	gap: 10rpx;
	padding: 20rpx 0;
	border-bottom: 1rpx solid #f5f5f5;
}

.category-item:last-child {
	border-bottom: none;
}

.category-info {
	display: flex;
	align-items: center;
	gap: 10rpx;
}

.rank {
	width: 40rpx;
	color: #666;
}

.category-name {
	font-size: 28rpx;
}

.category-stats {
	display: flex;
	align-items: center;
	gap: 20rpx;
	margin-left: 50rpx;
}

.progress-bar {
	flex: 1;
	height: 10rpx;
	background: #f5f5f5;
	border-radius: 5rpx;
	overflow: hidden;
}

.progress {
	height: 100%;
	background: #3494E6;
	border-radius: 5rpx;
}

.percentage {
	font-size: 24rpx;
	color: #666;
	width: 80rpx;
}

.amount {
	font-size: 28rpx;
	color: #333;
	width: 120rpx;
	text-align: right;
}
</style>

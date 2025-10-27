<template>
	<view class="container">
		<view class="overview">
			<view class="title-box">
				<view class="title-year">
					<text class="title">全部流水</text>
					<picker
						mode="date"
						fields="year"
						:value="currentYear"
						@change="confirmYear"
					>
						<view class="year-text">
							<text>{{ currentYear }}年</text>
							<uni-icons type="bottom" size="14" color="#666"></uni-icons>
						</view>
					</picker>
				</view>
			</view>
			<view class="amount-box">
				<view class="amount-item">
					<text class="value">{{ summary.balance }}</text>
					<text class="label">结余</text>
				</view>
				<view class="amount-item">
					<text class="value">{{ summary.totalIncome }}</text>
					<text class="label">收入</text>
				</view>
				<view class="amount-item">
					<text class="value">{{ summary.totalExpense }}</text>
					<text class="label">支出</text>
				</view>
			</view>
		</view>

		<view class="filter-section">
			<view class="filter-tabs">
				<text 
					v-for="(item, index) in tabList" 
					:key="index"
					:class="['tab-item', currentTabName === item.value ? 'active' : '']"
					@click="handleChangeTab(item.value)"
				>
					{{ item.label }}
				</text>
			</view>
			<view class="stats-btn" @click="navigateToStats">
				<uni-icons type="pie" size="16" color="#3494E6"></uni-icons>
				<text>统计</text>
			</view>
		</view>

		<view class="bill-list">
			<view class="bill-group" v-for="(group, index) in billList" :key="group.id">
				<view class="group-header" @click="toggleGroup(index)">
					<view class="header-left">
						<uni-icons :type="collapsedGroups[index] ? 'right' : 'bottom'" size="14" color="#666"></uni-icons>
						<text class="period">{{ group.period }}</text>
					</view>
					<view class="group-summary">
						<text>收入: {{ group.income }}</text>
						<text style="margin-left: 20rpx;">|</text>
						<text style="margin-left: 20rpx;">支出: {{ group.expense }}</text>
					</view>
				</view>
				
				<view class="bill-items" v-show="!collapsedGroups[index]">
					<view class="bill-item" 
						v-for="(record, rIndex) in group.records" 
						:key="rIndex"
						@click="navigateToDetail(record)"
					>
						<view class="left">
							<view class="category">{{ record.category }}</view>
							<view class="remark">{{ record.remark }}</view>
						</view>
						<view class="right">
							<text :class="['amount', record.type === '支出' ? 'expense' : 'income']">
								{{ record.type === '支出' ? '-' : '+' }}{{ record.amount }}
							</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import {getRecordStats} from '@/api/record'
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'

const currentYear = ref(new Date().getFullYear())
const currentTabName = ref('month')

const tabList = [
	{ label: '按年', value: 'year' },
	{ label: '按月', value: 'month' },
	{ label: '按周', value: 'week' }
]

const summary = ref({
	balance: 0,
	totalIncome: 0,
	totalExpense: 0
})

const billList = ref([])
const collapsedGroups = ref({})

const confirmYear = async(e) => {
	const year = new Date(e.detail.value).getFullYear()
	currentYear.value = year
	await fetchData(year)
}

const fetchData = async (year, groupBy = 'month') => {
	const res = await getRecordStats({
		startDate: `${year}-01-01`,
		endDate: `${year}-12-31`,
		groupBy: groupBy
	})
	
	if (res.code === 200) {
		summary.value = res.data.summary
		billList.value = res.data.list.map(item => ({
			period: item.period,
			income: item.income,
			expense: item.expense,
			records: item.records || []
		}))
		collapsedGroups.value = {}
	}
}

const handleChangeTab = (tabName) => {
	currentTabName.value = tabName
	fetchData(currentYear.value, tabName)
}

const toggleGroup = (index) => {
	collapsedGroups.value[index] = !collapsedGroups.value[index]
}

const navigateToDetail = (record) => {
	uni.navigateTo({
		url: `/pages/checkDetail/checkDetail?id=${record.id}`
	})
}

const navigateToStats = () => {
	uni.navigateTo({
		url: '/pages/report/report?year='+currentYear.value
	})
}

onShow(async () => {
	await fetchData(currentYear.value, currentTabName.value)
})
</script>

<style scoped>
.container { 
	background: #f7f8fa; 
	max-height: 100vh;
	overflow: scroll;
}

.overview {
	background: linear-gradient(135deg, #3494E6, #EC6EAD);
	padding: 40rpx 30rpx;
	margin: 20rpx;
	border-radius: 24rpx;
}

.title-box {
	margin-bottom: 30rpx;
}

.title-year {
	display: flex;
	align-items: center;
}

.title {
	font-size: 32rpx;
	font-weight: bold;
	color: #fff;
}

.year-text {
	display: flex;
	margin-left: 20rpx;
	padding: 8rpx 20rpx;
	background: rgba(255, 255, 255, 0.2);
	border-radius: 30rpx;
	color: #fff;
}

.amount-box {
	display: flex;
	justify-content: space-between;
}

.amount-item {
	text-align: center;
}

.value { 
	font-size: 40rpx; 
	font-weight: bold; 
	color: #fff;
}

.label { 
	font-size: 24rpx; 
	color: rgba(255, 255, 255, 0.8); 
}

.filter-section {
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: #fff;
	padding: 20rpx;
	margin: 0 20rpx;
	border-radius: 16rpx;
}

.filter-tabs {
	flex: 1;
	display: flex;
}

.stats-btn {
	display: flex;
	align-items: center;
	gap: 6rpx;
	padding: 10rpx 20rpx;
	border-radius: 30rpx;
	background: rgba(52, 148, 230, 0.1);
	color: #3494E6;
	font-size: 24rpx;
}

.tab-item {
	margin-right: 40rpx;
	color: #666;
	position: relative;
}

.tab-item.active {
	color: #3494E6;
	font-weight: bold;
}

.tab-item.active::after {
	content: '';
	position: absolute;
	bottom: -4rpx;
	left: 50%;
	transform: translateX(-50%);
	width: 40rpx;
	height: 4rpx;
	background: #3494E6;
}

.bill-list { 
	max-height: 70vh;
	padding: 0 20rpx;
	overflow-y: auto;
}

.bill-group {
	background: #fff;
	margin-bottom: 20rpx;
	border-radius: 16rpx;
}

.group-header {
	display: flex;
	justify-content: space-between;
	padding: 24rpx;
	border-bottom: 1rpx solid #eee;
	background: #fafafa;
	cursor: pointer;
}

.header-left {
	display: flex;
	align-items: center;
	gap: 10rpx;
}

.period {
	font-weight: bold;
	margin-left: 10rpx;
}

.group-summary {
	color: #666;
	font-size: 26rpx;
}

.bill-item {
	display: flex;
	justify-content: space-between;
	padding: 24rpx;
	border-bottom: 1rpx solid #f5f5f5;
}

.bill-item:last-child {
	border-bottom: none;
}

.record-header {
	display: flex;
	align-items: center;
	gap: 10rpx;
	margin-bottom: 6rpx;
}

.category { 
	margin-bottom: 6rpx;
}

.remark { 
	font-size: 24rpx; 
	color: #999; 
}

.expense { 
	color: #ff5555; 
}

.income { 
	color: #07c160; 
}
</style>

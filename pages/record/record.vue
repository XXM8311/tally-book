<template>
  <view class="container">
    <view class="amount-box">
      <text class="label">金额</text>
      <view class="input-row">
        <text class="yen">¥</text>
        <input type="digit" v-model="amount" placeholder="请输入金额" />
      </view>
    </view>

    <view class="date-box">
      <view class="picker-view">
        <text class="label">日期</text>
        <picker 
          mode="date" 
          :value="date"
          @change="onDateChange"
        >
          <view class="picker-value">
            <text>{{ date }}</text>
            <uni-icons type="bottom" size="14" color="#666"></uni-icons>
          </view>
        </picker>
      </view>
    </view>

    <view class="type-box">
      <text 
        class="type-btn" 
        :class="{ active: type === '支出' }"
        @click="type = '支出'"
      >支出</text>
      <text 
        class="type-btn" 
        :class="{ active: type === '收入' }"
        @click="type = '收入'"
      >收入</text>
    </view>

    <view class="cate-box">
      <view 
        class="cate-item" 
        v-for="item in categories[type]" 
        :key="item.name"
        @click="category = item.name"
        :class="{ active: category === item.name }"
      >
        <u-icon 
          :name="item.icon" 
          size="32" 
          :color="category === item.name ? '#007AFF' : '#666'"
        />
        <text class="cate-text">{{ item.name }}</text>
      </view>
    </view>

    <view class="remark-box">
      <input type="text" v-model="remark" placeholder="添加备注" />
    </view>

    <button class="save-btn" @click="save">保存</button>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import {addRecord} from '@/api/record'
const amount = ref('')
const type = ref('支出')
const category = ref('')
const remark = ref('')
const date = ref(new Date().toISOString().slice(0, 10))

const categories = {
  '支出': [
    { name: '餐饮', icon: 'gift' },
    { name: '购物', icon: 'shopping-cart' },
    { name: '交通', icon: 'car' },
    { name: '娱乐', icon: 'play-right' },
    { name: '医疗', icon: 'heart' },
    { name: '其他', icon: 'more-dot-fill' }
  ],
  '收入': [
    { name: '工资', icon: 'red-packet' },
    { name: '奖金', icon: 'gift' },
    { name: '理财', icon: 'rmb-circle' },
    { name: '其他', icon: 'more-dot-fill' }
  ]
}

const save = async () => {
  if (!amount.value) {
    uni.showToast({ title: '请输入金额', icon: 'none' })
    return
  }
  if (!category.value) {
    uni.showToast({ title: '请选择分类', icon: 'none' })
    return
  }
  const res = await addRecord({
    amount: amount.value,
    type: type.value,
    category: category.value,
    remark: remark.value,
    date: date.value
  })
  if(res.code===200){
    uni.showToast({
      title: '保存成功',
      icon: 'none'
    })
	 amount.value=''
	 type.value='支出'
	 category.value = ''
	 remark.value= ''
   setTimeout(() => {
    uni.switchTab({
      url: '/pages/index/index'
    })
   }, 1000)
  }
}

const onDateChange = (e) => {
  date.value = e.detail.value
}
</script>

<style>
.container {
  padding: 30rpx;
  background: #f5f5f5;
  min-height: 100vh;
}

.amount-box {
  background: #fff;
  padding: 30rpx;
  border-radius: 20rpx;
  margin-bottom: 30rpx;
}

.input-row {
  display: flex;
  align-items: center;
  font-size: 40rpx;
  margin-top: 20rpx;
}

.yen {
  margin-right: 20rpx;
}

.type-box {
  display: flex;
  margin-bottom: 30rpx;
}

.type-btn {
  flex: 1;
  text-align: center;
  padding: 20rpx 0;
  background: #fff;
  margin: 0 10rpx;
  border-radius: 10rpx;
}

.type-btn.active {
  background: #007AFF;
  color: #fff;
}

.cate-box {
  display: flex;
  flex-wrap: wrap;
  background: #fff;
  padding: 20rpx;
  border-radius: 20rpx;
  margin-bottom: 30rpx;
}

.cate-item {
  width: 25%;
  text-align: center;
  padding: 20rpx 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cate-text {
  margin-top: 10rpx;
  font-size: 24rpx;
}

.cate-item.active {
  color: #007AFF;
}

.remark-box {
  background: #fff;
  padding: 20rpx;
  border-radius: 20rpx;
  margin-bottom: 30rpx;
}

.save-btn {
  background: #007AFF;
  color: #fff;
}

.date-box {
  background: #fff;
  padding: 30rpx;
  border-radius: 20rpx;
  margin-bottom: 30rpx;
}

.picker-view {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10rpx 0;
}

.picker-value {
  display: flex;
  align-items: center;
  gap: 10rpx;
  font-size: 28rpx;
  color: #333;
}

.label {
  font-size: 28rpx;
  color: #666;
}
</style> 
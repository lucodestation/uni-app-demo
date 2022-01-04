<template>
  <view>
    <!-- 
      scroll-into-view
        值应为某子元素id（id不能以数字开头）。设置哪个方向可滚动，则在哪个方向滚动到该元素
     -->
    <scroll-view
      class="scroll-view"
      scroll-y
      :style="{
        height: systemInfo.windowHeight + 'px',
      }"
      :scroll-into-view="scrollIntoView"
    >
      <!-- 热门城市 -->
      <view class="hot-city">
        <view class="title">热门城市</view>
        <view class="container">
          <view class="item" v-for="(item, index) in cityList.hotCity" :key="index">{{ item }}</view>
        </view>
      </view>
      <!-- 热门城市 -->
      <view class="hot-city">
        <view class="title">热门城市</view>
        <view class="container">
          <view class="item" v-for="(item, index) in cityList.hotCity" :key="index">{{ item }}</view>
        </view>
      </view>

      <!-- 城市列表 -->
      <view class="city-list">
        <view class="title">全部城市</view>
        <view class="container" v-for="(item, index) in cityList.city" :key="index">
          <view class="letter" :id="item.title">{{ item.title }}</view>
          <view class="city" v-for="(item, index) in item.list" :key="index">{{ item }}</view>
        </view>
      </view>
    </scroll-view>

    <!-- 字母导航 -->
    <view class="letter-nav">
      <view class="letter" v-for="(item, index) in cityList.city" :key="index" @click="handleLetterNavClick(item.title)">{{ item.title }}</view>
    </view>
  </view>
</template>

<script>
import cityList from '@/utils/cityList.json'
console.log(cityList)

export default {
  data() {
    return {
      systemInfo: uni.getSystemInfoSync(),
      cityList: cityList,
      scrollIntoView: '',
    }
  },
  methods: {
    handleLetterNavClick(letter) {
      this.scrollIntoView = letter
    },
  },
}
</script>

<style>
.scroll-view {
  box-sizing: border-box;
  /* background-color: #eee; */
  padding: 0 20rpx;
}

.hot-city {
  /* background-color: pink; */
  padding: 20rpx 0;
}
.hot-city .title {
  padding-bottom: 20rpx;
  color: #999;
}
.hot-city .container .item {
  display: inline-block;
  box-sizing: border-box;
  border: 2rpx solid #efefef;
  padding: 10rpx 20rpx;
  width: 126rpx;
  text-align: center;
}
.hot-city .container .item:not(:nth-child(5n)) {
  margin-right: 20rpx;
}
.hot-city .container .item:nth-child(n + 6) {
  margin-top: 20rpx;
}

.city-list {
  /* background-color: yellowgreen; */
  padding: 20rpx 0;
}
.city-list .title {
  padding-bottom: 20rpx;
  color: #999;
}
.city-list .container {
  line-height: 66rpx;
}
/* 字母 */
.city-list .container .letter {
  color: #999;
  background-color: pink;
}
.city-list .container .city {
  border-bottom: 2rpx solid #eee;
}

.letter-nav {
  position: fixed;
  right: 0;
  bottom: 0;
}
/* 字母 */
.letter-nav .letter {
  text-align: center;
  padding: 0 20rpx;
  line-height: 36rpx;
}
.letter-nav .letter.active {
  color: red;
}
</style>

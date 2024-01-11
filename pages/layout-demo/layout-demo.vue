<template>
  <view>
    <!-- tab -->
    <view class="tabs">
      <view :class="{ active: current === item }" v-for="item in 5" :key="item" @click="current = item">布局{{ item }}</view>
    </view>

    <view class="layout-1" v-if="current === 1">
      <view class="item" v-for="item in 5" :key="item">
        <image class="image" src="@/static/images/demo.png" />
        <view class="info">
          <view class="title" :class="item % 2 ? 'ell1' : 'ell2'">英雄联盟英雄联盟英雄联盟英雄联盟英雄联盟</view>

          <view class="other-info">
            <view class="left"> 英雄联盟 </view>
            <view class="right"> 英雄联盟 </view>
          </view>
        </view>
      </view>
    </view>

    <view class="layout-2" v-if="current === 2">
      <view class="item" v-for="item in 5" :key="item">
        <image class="image" src="@/static/images/demo.png" />
        <view class="info">
          <view class="title" :class="item % 2 ? 'ell1' : 'ell2'">英雄联盟英雄联盟英雄联盟英雄联盟英雄联盟英雄联盟英雄联盟英雄联盟英雄联盟英雄联盟</view>
          <view class="other-info">
            <view class="left"> 英雄联盟 </view>
            <view class="right"> 英雄联盟 </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      current: 1
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  padding: 0 30rpx;
  view {
    margin-right: 4px;
    margin-bottom: 4px;
    background: orangered;
    padding: 4rpx 6rpx;
    color: #aaa;
    border-radius: 4px;
    &.active {
      color: #fff;
      text-shadow: 2rpx 2rpx 2px;
    }
  }
}
/* 文字溢出显示 ... */
/* 单行 */
.ell1 {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
/* 多行 */
.ell {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
}
.ell2 {
  @extend .ell;
  -webkit-line-clamp: 2;
}
.ell3 {
  @extend .ell;
  -webkit-line-clamp: 3;
}
.ell4 {
  @extend .ell;
  -webkit-line-clamp: 4;
}

.layout-1 {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 30rpx;
  .item {
    border-radius: 20rpx;
    background: #f5f5f5;
    width: 330rpx;
    margin-bottom: 30rpx;
    display: flex;
    flex-direction: column;
    .image {
      border-radius: 20rpx;
      width: 330rpx;
      height: 330rpx;
    }
    .info {
      flex: 1;
      padding: 20rpx 10rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title {
        font-size: 1.2em;
      }
      .other-info {
        display: flex;
        justify-content: space-between;
        margin-top: 20rpx;
        color: #666;
      }
    }
  }
}

.layout-2 {
  padding: 30rpx;
  .item {
    display: flex;
    // align-items: center;
    margin: 20rpx 0;
    border-radius: 20rpx;
    background: #f5f5f5;
    .image {
      width: 160rpx;
      height: 160rpx;
      margin-right: 20rpx;
      border-radius: 20rpx;
    }
    .info {
      flex: 1;
      width: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 10rpx 10rpx 10rpx 0;
      .title {
        font-size: 1.2em;
      }
      .other-info {
        display: flex;
        justify-content: space-between;
        color: #666;
      }
    }
  }
}
/* 
.layout-2 {
  background: pink;
  .item {
    .image {}
    .info {
      .title {}
      .other-info {}
    }
  }
}
 */
</style>

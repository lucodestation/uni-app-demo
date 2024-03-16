<template>
  <view>
    <view class="svg-icon-wrap">
      <image class="svg-icon" style="color: red" src="https://cn.vitejs.dev/logo.svg" />
    </view>
    <view style="color: #999; font-size: 24rpx">使用 svg 格式且 mode=scaleToFill 时会居中（除非 svg 里加上 preserveAspectRatio="none"）</view>
    <view class="svg-icon-wrap">
      <image class="svg-icon" style="color: red" src="/static/svg/round_check_fill.svg" />
    </view>

    <view style="padding: 50rpx; display: flex; align-items: center">
      <icon-radio @click="checked = !checked" :checked="checked" size="200rpx"></icon-radio>
      <icon-radio @click="checked = !checked" :checked="checked" size="28rpx"></icon-radio>
      <icon-radio @click="checked = !checked" :checked="checked" size="30rpx"></icon-radio>
      <icon-radio @click="checked = !checked" :checked="checked"></icon-radio>
      <icon-radio @click="checked = !checked" :checked="checked" color="red"></icon-radio>
      <icon-radio @click="checked = !checked" :checked="checked" activeColor="green"></icon-radio>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
    }
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.svg-icon-wrap {
  width: 300rpx;
  height: 200rpx;
  outline: 2rpx dashed red;
  margin: 20rpx;

  .svg-icon {
    width: 100%;
    height: 100%;
    filter: drop-shadow(300rpx 0 0 green);
  }
}
</style>

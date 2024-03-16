<template>
  <view>
    <view>我的</view>
    <view>我的</view>
    <view>我的</view>
    <view>我的</view>
    <view>我的</view>
    <view>我的</view>
    <navigator url="/pages/mine/about/about">关于我们</navigator>
    <navigator url="/pages/mine/more/more">更多</navigator>

    <!-- <view class="full-screen" id="fullScreen" @click="handleFullScreen"></view> -->

    <!-- #ifdef MP-WEIXIN -->
    <button open-type="getPhoneNumber" @getphonenumber="handleGetPhone">手机号授权</button>
    <!-- #endif -->
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  onLoad() {
    console.log('个人中心 onLoad')
  },
  onShow() {
    console.log('个人中心 onShow')
  },
  methods: {
    handleFullScreen() {
      console.log('...')
      const query = wx.createSelectorQuery().in(this)
      query.select('#fullScreen').fields(
        {
          id: true,
          dataset: true,
          rect: true, // left right top bottom
          size: true, // width height
        },
        (data) => {
          console.log('fields', data)
        }
      )
      query.exec()
    },
    handleGetPhone(event) {
      console.log(event)
    },
  },
}
</script>

<style lang="scss" scoped>
.full-screen {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: brown;
}
</style>

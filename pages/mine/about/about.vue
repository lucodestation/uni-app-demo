<template>
  <view>
    <!-- <view class="full-screen" id="fullScreen" @click="handleFullScreen"></view> -->
  </view>
</template>

<script>
export default {
  data() {
    return {}
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
        data => {
          console.log('fields', data)
        }
      )
      query.exec()
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

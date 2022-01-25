<template>
  <view>
    <rich-text :nodes="title"></rich-text>

    <view>
      <button @click="handleTest">test</button>
    </view>
    <navigator url="/pages/poster/poster">
      <button>海报</button>
    </navigator>
    <navigator url="/pages/poster2/poster2">
      <button>海报2</button>
    </navigator>
    <navigator url="/pages/range-slider/range-slider">
      <button>滑块</button>
    </navigator>
    <navigator url="/pages/scroll-view/scroll-view">
      <button>scroll-view</button>
    </navigator>
    <navigator url="/pages/loading1/loading1">
      <button>loading1</button>
    </navigator>
    <navigator url="/pages/loading2/loading2">
      <button>loading2</button>
    </navigator>

    <!-- <view>
      <view>这是一<text>句</text>话</view>
      <chunLei-popups
        v-model="value"
        :popData="data"
        @tapPopup="tapPopup"
        :x="100"
        :y="20"
        placement="top-end"
        value
        theme="dark"
      >
      </chunLei-popups>
    </view> -->

    <!-- <view class="full-screen" id="fullScreen" @click="handleFullScreen"></view> -->
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: `<h1 style="text-align: center; color: #2c3e50;">首页</h1>`,
      value: '提示信息',
      data: '123',
    }
  },
  async onLoad() {
    console.log('首页 onLoad')
    // const result = await uni.request({
    //   url: 'https://api.github.com/',
    // })
    // console.log(result)
  },
  onShow() {
    console.log('首页 onShow')
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

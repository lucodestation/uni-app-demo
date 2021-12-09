<template>
  <view class="container" id="container">
    <view
      class="left-block"
      id="leftBlock"
      @touchstart="handleBlockTouchStart"
      @touchmove.stop="handleBlockTouchMove"
      @touchend="handleTouchEnd"
      :style="{
        left: leftBlockLeft + 'px',
      }"
    ></view>
    <view
      class="right-block"
      id="rightBlock"
      @touchstart="handleBlockTouchStart"
      @touchmove.stop="handleBlockTouchMove"
      @touchend="handleTouchEnd"
      :style="{
        left: rightBlockLeft + 'px',
      }"
    ></view>
  </view>
</template>

<script>
export default {
  name: 'range-slider',
  data() {
    return {
      leftBlockLeft: 10,
      rightBlockLeft: 10,
    }
  },
  computed: {},
  methods: {
    // 触摸开始
    handleBlockTouchStart(event) {
      const id = event.currentTarget.id
      const touch = event.touches[0] || event.changedTouches[0]
      console.log('touch', touch)
      const startX = touch.pageX
      const startY = touch.pageY
      console.log('startX', startX)
      console.log('startY', startY)
      console.log('触摸开始 startX', startX)
    },
    // 触摸中
    handleBlockTouchMove(event) {
      // console.log('触摸中', event)
      const query = wx.createSelectorQuery().in(this)
      let leftBlank = 0
      query.select('#container').fields(
        {
          id: true,
          dataset: true,
          rect: true, // left right top bottom
          size: true, // width height
        },
        data => {
          console.log('#container', data)
          leftBlank = data.left
        }
      )
      query.exec()
      console.log('leftBlank', leftBlank)

      const id = event.currentTarget.id
      const touch = event.touches[0] || event.changedTouches[0]
      const x = touch.pageX
      if (id === 'leftBlock') {
        this.leftBlockLeft = x - leftBlank
      } else if (id === 'rightBlock') {
        this.rightBlockLeft = x - leftBlank
      }
    },
    // 触摸结束
    handleTouchEnd(event) {
      const id = event.currentTarget.id
      const touch = event.touches[0] || event.changedTouches[0]
      console.log('touch', touch)
      const endX = touch.pageX
      const endY = touch.pageY
      console.log('endX', endX)
      console.log('endY', endY)
      // this.leftBlockLeft = endX
      console.log('触摸结束 ', endX)
    },
  },
}
/*
@touchstart="_onBlockTouchStart"
      @touchmove.stop="_onBlockTouchMove"
      @touchend="_onBlockTouchEnd"
*/
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  height: 3px;
  border-radius: 3px;
  background-color: red;
}
.left-block,
.right-block {
  position: absolute;
  width: 3px;
  height: 3px;
  background-color: blue;
  transform: scale(3);
  border-radius: 50%;
}
</style>

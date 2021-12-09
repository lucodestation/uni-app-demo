<template>
  <view>
    <view>
      <button @click="handleButton">按钮</button>
    </view>

    <view class="range-slider-wrapper">
      <range-slider
        width="690"
        height="50"
        blockSize="20"
        activeColor="#FC7411"
        min="0"
        max="100"
        :values="rangeValue"
        :bubbleText="bubbleText"
        @rangechange="rangeChange"
      >
      </range-slider>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      rangeValue: [30, 50],
      bubbleText: '30-40万',
    }
  },
  methods: {
    rangeChange(event) {
      // console.info(event)
      const value = [event.minValue * 1, event.maxValue * 1]
      this.rangeValue = value
      console.log(value)
      if (value[0] === value[1] && value[0] !== 0 && value[0] !== 100) {
        this.bubbleText = value[0] + '万'
      } else if (
        value[0] === value[1] &&
        (value[1] === 100 || value[1] === 0)
      ) {
        this.bubbleText = '不限'
      } else if (value[0] === 0 && value[1] === 100) {
        this.bubbleText = '不限'
      } else if (value[1] === 100) {
        this.bubbleText = value[0] + '万以上'
      } else {
        this.bubbleText = value[0] + '-' + value[1] + '万'
      }
    },
    handleButton() {
      console.info('button')
      this.rangeValue = [20, 60]
    },
  },
}
</script>

<style lang="scss" scoped>
.range-slider-wrapper {
  padding: 30rpx;
  background-color: #080;
}
</style>

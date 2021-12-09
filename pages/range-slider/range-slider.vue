<template>
  <view>
    <view>滑块</view>
    <view class="range-slider-wrapper">
      <!-- <range-slider /> -->

      <slider-range
        :value="rangeValue"
        :min="rangeMin"
        :max="rangMax"
        :step="5"
        :bar-height="3"
        :block-size="26"
        background-color="#f00"
        active-color="#080"
        :format="format"
        :decorationVisible="true"
        @change="handleRangeChange"
      ></slider-range>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      rangeValue: [30, 50],
      rangeMin: 0,
      rangMax: 100,
    }
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.range-slider-wrapper {
  padding: 30rpx;
  background-color: #eee;
}
</style>

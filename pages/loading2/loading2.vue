<template>
  <view>
    <button @click="loading = true">start</button>
    <button @click="loading = false">stop</button>

    <view class="loading-wrap">
      <lzw-loading v-if="loading" speed="fast" width="50" lineWidth="2" lineColor="#ccc"></lzw-loading>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      loading: false
    }
  },
  onLoad() {},
  methods: {}
}
</script>

<style scoped>
.loading-wrap {
  width: 300rpx;
  height: 300rpx;
  margin: 10rpx;
}
</style>

<template>
  <view>
    <y-scroll-seamless :options="{ direction: 'up', step: 1, hoverStop: true }">
      <view class="demo-y" v-for="item in 20">
        {{ item }}
      </view>
    </y-scroll-seamless>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {},
}
</script>

<style></style>

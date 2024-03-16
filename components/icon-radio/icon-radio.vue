<template>
  <view class="icon-wrap" :style="{ width: size, height: size }" @click="handleClick">
    <image
      class="icon"
      :style="{ transform: `translateX(-${size})`, filter: `drop-shadow(${size} 0 0 ${activeColor})` }"
      src="/static/svg/round_check_fill.svg"
      v-if="checked"
    ></image>
    <image class="icon" :style="{ transform: `translateX(-${size})`, filter: `drop-shadow(${size} 0 0 ${color})` }" src="/static/svg/round.svg" v-else></image>
  </view>
</template>

<script>
export default {
  name: 'IconRadio',
  props: {
    color: {
      type: String,
      default: '#999',
    },
    activeColor: {
      type: String,
      default: 'orange',
    },
    size: {
      type: String,
      default: '36rpx',
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  methods: {
    handleClick() {
      this.$emit('click')
    },
  },
}
</script>

<style lang="scss" scoped>
.icon-wrap {
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon {
  width: 100%;
  height: 100%;
  vertical-align: center;
}
</style>

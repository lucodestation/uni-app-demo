<template>
  <view>
    <move-verify ref="moveVerify" :height="height" @onFail="onFail" @onSuccess="onSuccess"></move-verify>
  </view>
</template>

<script>
import moveVerify from '@/components/piaoyi-moveVerify/piaoyi-moveVerify.vue'

export default {
  components: {
    'move-verify': moveVerify,
  },
  data() {
    return {}
  },
  methods: {
    // 重置
    reset() {
      // this.$refs.moveVerify.()
    },
    // 验证成功回调
    onSuccess() {
      console.log('验证成功')
    },
    // 验证失败回调
    onFail() {
      console.log('验证失败')
    },
  },
}
</script>

<style></style>

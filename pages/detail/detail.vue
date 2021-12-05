<template>
  <view>
    <view>详情</view>

    <button @click="handleNavigateToLogin">请登录</button>
  </view>
</template>

<script>
const showToastWait = (title, duration = 1500) => {
  return new Promise(resolve => {
    uni.showToast({
      title,
      icon: 'none',
      duration: duration,
      success() {
        setTimeout(() => {
          resolve()
        }, duration)
      },
    })
  })
}

export default {
  data() {
    return {}
  },
  methods: {
    async handleNavigateToLogin() {
      await showToastWait('请登录', 2000)

      uni.navigateTo({
        url: '/pages/login/login',
      })
    },
  },
}
</script>

<style></style>

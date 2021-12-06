<template>
  <view>
    <rich-text :nodes="title"></rich-text>

    <navigator url="/pages/poster/poster">
      <button>海报</button>
    </navigator>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: `<h1 style="text-align: center; color: #2c3e50;">首页</h1>`,
    }
  },
  async onLoad() {
    console.log('首页 onLoad')
    const result = await uni.request({
      url: 'https://api.github.com/',
    })
    console.log(result)
  },
  onShow() {
    console.log('首页 onShow')
  },
  methods: {},
}
</script>

<style lang="scss" scoped></style>

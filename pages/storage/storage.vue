<template>
  <view>
    <button @click="handleSet">set</button>
    <button @click="handleGet">get</button>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    handleSet() {
      uni.setStorageSync('str', '123')
      uni.setStorageSync('num', 123)
      uni.setStorageSync('bool', true)
      uni.setStorageSync('arr', [123, '123', false, { foo: 22 }, ['a', 'b']])
      uni.setStorageSync('obj', { num: 123, str: '123', bool: true })
      uni.setStorageSync('null', null)
      uni.setStorageSync('undefined', undefined)
    },
    handleGet() {
      console.log(uni.getStorageSync('str'))
      console.log(uni.getStorageSync('num'))
      console.log(uni.getStorageSync('bool'))
      console.log(uni.getStorageSync('arr'))
      console.log(uni.getStorageSync('obj'))
      console.log(uni.getStorageSync('null'))
      console.log(uni.getStorageSync('undefined'))
      console.log(uni.getStorageSync('null') === '')
      console.log(uni.getStorageSync('undefined') === '')
    },
  },
}
</script>

<style></style>

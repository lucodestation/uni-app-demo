<template>
  <view>
    <my-input v-model.trim="inputValue" placeholder="请输入"></my-input>

    <view style="white-space: pre">{{ inputValue }}</view>

    <button @click="handleTest">测试</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      inputValue: '',
    }
  },
  methods: {
    handleTest() {
      console.log(this.inputValue.length, this.inputValue)
    },
  },
}
</script>

<style></style>

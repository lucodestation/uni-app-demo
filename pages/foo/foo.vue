<template>
  <view><button @click="handleTest">test</button></view>
</template>

<script>
export default {
  data() {
    return {};
  },
  onLoad() {
    console.log('foo onLoad');
  },
  methods: {
    handleTest() {
      console.log('test');
    }
  }
};
</script>

<style></style>

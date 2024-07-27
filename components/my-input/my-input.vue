<template>
  <view>
    <input type="text" :value="value" :placeholder="placeholder" @input="handleInput" />

    <button @click="handleTest">test</button>
  </view>
</template>

<script>
export default {
  name: 'my-input',
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
  methods: {
    handleInput(event) {
      this.$emit('input', event.target.value)
    },
    handleTest() {
      console.log(this)
    },
  },
}
</script>

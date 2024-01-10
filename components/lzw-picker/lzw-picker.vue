<!-- 多列选择器 -->

<template>
  <view>
    <picker-view class="picker-view" :indicatorStyle="indicatorStyle" :value="currentIndexList" @change="handlePickerViewChange">
      <template v-for="(columnItem, columnIndex) in dataList">
        <picker-view-column :key="columnIndex">
          <view class="item" v-for="(item, index) in columnItem" :key="index">{{ item[keyName] }}</view>
        </picker-view-column>
      </template>
    </picker-view>

    <view>
      <button type="primary" size="mini" @click="handleConfirm">确定</button>
    </view>
  </view>
</template>

<script>
import _ from 'lodash'

export default {
  props: {
    // 用于控制选择器的弹出与收起
    show: {
      type: Boolean,
      default: false,
    },
    // 是否显示顶部的操作栏
    showToolbar: {
      type: Boolean,
      default: true,
    },
    // 顶部中间的标题
    title: {
      type: String,
      default: '',
    },
    // 设置每一列的数据，见上方说明
    columns: {
      type: Array,
      default: () => [],
    },
    // 自定义需要展示的text属性键名
    keyName: {
      type: String,
      default: 'text',
    },
    // 各列的默认索引
    defaultIndex: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      indicatorStyle: `height: 50px;`,
      currentIndexList: [0, 0, 0],
      latestIndexList: [0, 0, 0],
      dataList: [],
    }
  },
  mounted() {
    this.currentIndexList = _.cloneDeep(this.defaultIndex)
    this.latestIndexList = _.cloneDeep(this.defaultIndex)
    this.dataList = _.cloneDeep(this.columns)
  },
  methods: {
    // (index, setLastIndex) 设置对应列的选择值
    setIndexs(column, index) {
      const arr = [...this.currentIndexList]
      arr.splice(column, 1, index)
      this.currentIndexList = arr
      this.latestIndexList = _.cloneDeep(this.currentIndexList)
    },
    // 多列联动时需要用到
    setColumnValues(column, newArr) {
      const arr = _.cloneDeep(this.dataList)
      arr.splice(column, 1, newArr)
      this.dataList = arr
    },
    handlePickerViewChange(event) {
      // console.log(event.detail.value)
      // console.log(this.currentIndexList)
      const indexList = event.detail.value
      let changeColumnIndex = ''
      this.currentIndexList.forEach((item, index) => {
        if (indexList[index] !== item) {
          changeColumnIndex = index
        }
      })
      this.currentIndexList = event.detail.value
      this.$emit('change', {
        columnIndex: changeColumnIndex, // 当前哪一列发生了变化，索引值，0=第一列
        index: this.currentIndexList[changeColumnIndex], // 当前发生变化的那一列的索引值
        // value: this.currentIndexList, // 当前各列索引值
        value: this.dataList.map((item, index) => item[this.currentIndexList[index]]), // 当前各列索引值
        values: this.dataList.map((item, index) => item[this.currentIndexList[index]]), // 当前各列值
      })
    },
    handleConfirm() {
      // console.log(this.currentIndexList)
      this.latestIndexList = _.cloneDeep(this.currentIndexList)
      this.$emit(
        'confirm',
        this.dataList.map((item, index) => item[this.latestIndexList[index]])
      )
    },
  },
}
</script>

<style scoped>
.picker-view {
  width: 750rpx;
  height: 600rpx;
  margin-top: 20rpx;
}
.item {
  line-height: 100rpx;
  text-align: center;
}
</style>

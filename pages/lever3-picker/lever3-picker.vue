<template>
  <view>
    <button type="primary" size="mini" @click="lzwPickerShow = !lzwPickerShow">
      <text v-if="lzwPickerShow">隐藏</text>
      <text v-else>显示</text>
    </button>

    <lzw-picker
      ref="lzwPickerRef"
      :show="lzwPickerShow"
      :columns="dataList"
      keyName="name"
      :defaultIndex="indexList"
      @change="handleLzwPickerChange"
      @confirm="handleLzwPickerConfirm"
    ></lzw-picker>
  </view>
</template>

<script>
import _ from 'lodash'

const originList = [
  {
    id: 1,
    name: '1',
    list: [
      {
        id: 11,
        name: '1-1',
        list: [
          { id: 111, name: '1-1-1' },
          { id: 112, name: '1-1-2' },
          { id: 113, name: '1-1-3' },
        ],
      },
      {
        id: 12,
        name: '1-2',
        list: [
          { id: 121, name: '1-2-1' },
          { id: 122, name: '1-2-2' },
          { id: 123, name: '1-2-3' },
        ],
      },
      {
        id: 13,
        name: '1-3',
        list: [
          { id: 131, name: '1-3-1' },
          { id: 132, name: '1-3-2' },
          { id: 133, name: '1-3-3' },
        ],
      },
    ],
  },
  {
    id: 2,
    name: '2',
    list: [
      {
        id: 21,
        name: '2-1',
        list: [
          { id: 211, name: '2-1-1' },
          { id: 212, name: '2-1-2' },
          { id: 213, name: '2-1-3' },
        ],
      },
      {
        id: 22,
        name: '2-2',
        list: [
          { id: 221, name: '2-2-1' },
          { id: 222, name: '2-2-2' },
          { id: 223, name: '2-2-3' },
        ],
      },
      {
        id: 23,
        name: '2-3',
        list: [
          { id: 231, name: '2-3-1' },
          { id: 232, name: '2-3-2' },
          { id: 233, name: '2-3-3' },
        ],
      },
    ],
  },
  {
    id: 3,
    name: '3',
    list: [
      {
        id: 31,
        name: '3-1',
        list: [
          { id: 311, name: '3-1-1' },
          { id: 312, name: '3-1-2' },
          { id: 313, name: '3-1-3' },
        ],
      },
      {
        id: 32,
        name: '3-2',
        list: [
          { id: 321, name: '3-2-1' },
          { id: 322, name: '3-2-2' },
          { id: 323, name: '3-2-3' },
        ],
      },
      {
        id: 33,
        name: '3-3',
        list: [
          { id: 331, name: '3-3-1' },
          { id: 332, name: '3-3-2' },
          { id: 333, name: '3-3-3' },
        ],
      },
    ],
  },
]

export default {
  data() {
    return {
      lzwPickerShow: false,
      indexList: [],
      dataList: [],
    }
  },
  onLoad() {
    const arr1 = _.cloneDeep(originList)
    const arr2 = _.cloneDeep(originList[0].list)
    const arr3 = _.cloneDeep(originList[0].list[0].list)
    this.dataList = [arr1, arr2, arr3]
    this.indexList = [0, 0, 0]
  },
  methods: {
    handleLzwPickerChange(event) {
      console.log(_.cloneDeep(event))
      console.log(_.cloneDeep(event.columnIndex))
      console.log(_.cloneDeep(event.index))
      console.log(_.cloneDeep(event.indexs))
      // console.log(_.cloneDeep(event.value))
      console.log(event.value[0].name, event.value[1].name, event.value[2].name)
      console.log(_.cloneDeep(event.values))
      // return
      if (event.columnIndex === 0) {
        // 第一列（省）发生变化
        // console.log('第一列（省）发生变化')

        const arr2 = _.cloneDeep(event.value[0].list)
        // console.log(_.cloneDeep(event.value[0].list))
        const arr3 = _.cloneDeep(event.value[0].list[0].list)
        // console.log(_.cloneDeep(event.value[0].list[0].list))

        // 更新第二列（市列表）
        this.$refs.lzwPickerRef.setColumnValues(1, arr2)
        // 更新第三列（区列表）
        this.$refs.lzwPickerRef.setColumnValues(2, arr3)
        this.$refs.lzwPickerRef.setIndexs(1, 0)
        this.$refs.lzwPickerRef.setIndexs(2, 0)
      } else if (event.columnIndex === 1) {
        // 第二列（市）发生变化
        // console.log('第二（市）列发生变化')

        const arr3 = _.cloneDeep(event.value[1].list)
        // console.log(_.cloneDeep(event.value[1].list))
        // 更新第三列（区列表）
        this.$refs.lzwPickerRef.setColumnValues(2, arr3)
        this.$refs.lzwPickerRef.setIndexs(2, 0)
      }
    },
    handleLzwPickerConfirm(event) {
      console.log(_.cloneDeep(event[0].name))
      console.log(_.cloneDeep(event[1].name))
      console.log(_.cloneDeep(event[2].name))
    },
  },
}
</script>

<style lang="scss" scoped></style>

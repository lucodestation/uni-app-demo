<template>
  <view>
    <view>null：</view>
    <view>{{ nullValue }}</view>
    <view>undefined：</view>
    <view>{{ undefinedValue }}</view>
    <view>字符串：</view>
    <view>{{ str }}</view>
    <view>数字：</view>
    <view>{{ num }}</view>
    <view>布尔值：</view>
    <view>{{ bool }}</view>
    <view>数组：</view>
    <view>{{ arr }}</view>
    <view>对象：</view>
    <view>{{ obj }}</view>
    <view>正则：</view>
    <view>{{ reg }}</view>
    <view>日期对象：</view>
    <view>{{ date }}</view>
    <view>类：</view>
    <view>{{ Person }}</view>
    <view>data函数1：</view>
    <view>{{ dataFun1 }}</view>
    <view>data函数2：</view>
    <view>{{ dataFun2 }}</view>
    <view>data函数3：</view>
    <view>{{ dataFun3 }}</view>
    <view>methods函数：</view>
    <view>{{ methodsFun }}</view>

    <view style="border-top: 2rpx solid #ccc; margin: 20rpx 0"></view>

    <view>null：</view>
    <view>-- {{ nullValue }}</view>
    <view>undefined：</view>
    <view>-- {{ undefinedValue }}</view>
    <view>字符串：</view>
    <view>-- {{ str }}</view>
    <view>数字：</view>
    <view>-- {{ num }}</view>
    <view>布尔值：</view>
    <view>-- {{ bool }}</view>
    <view>数组：</view>
    <view>-- {{ arr }}</view>
    <view>对象：</view>
    <view>-- {{ obj }}</view>
    <view>正则：</view>
    <view>-- {{ reg }}</view>
    <view>日期对象：</view>
    <view>-- {{ date }}</view>
    <view>类：</view>
    <view>-- {{ Person }}</view>
    <view>data函数1：</view>
    <view>-- {{ dataFun1 }}</view>
    <view>data函数2：</view>
    <view>-- {{ dataFun2 }}</view>
    <view>data函数3：</view>
    <view>-- {{ dataFun3 }}</view>
    <view>methods函数：</view>
    <view>-- {{ methodsFun }}</view>
  </view>
</template>

<script>
export default {
  data() {
    class Person {}

    return {
      nullValue: null,
      undefinedValue: undefined,
      str: 'hello',
      num: 123,
      bool: false,
      arr: [1, 2, 3, 4, 5],
      obj: { name: '李雷', age: 18 },
      dataFun1: function () {
        console.log('dataFun1')
      },
      dataFun2() {},
      dataFun3: () => 'dataFun3',
      Person,
      reg: /^\d{6}$/,
      date: new Date('2048/10/24 13:14:15'),
    }
  },
  methods: {
    methodsFun() {},
  },
}
</script>

<style></style>

<template>
  <view>
    <!-- #ifdef APP-PLUS -->
    <view>
      <button @click="handleTest">使用系统默认浏览器打开URL</button>
    </view>
    <view>
      <button @click="handleTest2">使用内置Webview窗口打开URL</button>
    </view>
    <!-- #endif -->

    <!-- #ifdef H5 -->
    <view>
      <button @click="handleTest3">新窗口打开URL</button>
    </view>
    <view>
      <button @click="handleTest4">当前窗口打开URL</button>
    </view>
    <!-- #endif -->

    <!-- #ifdef MP -->
    <view>
      <button @click="handleCopyURL">复制链接</button>
    </view>
    <!-- #endif -->

    <view>
      <button @click="handleWebView">web-view 百度</button>
    </view>
    <view>
      <button @click="handleWebViewJueJin">web-view 稀土掘金</button>
    </view>
    <!-- #ifdef MP -->
    <view>
      <view>会自动铺满整个小程序页面，个人类型的小程序暂不支持使用。</view>
      <view>可打开关联的公众号的文章，其它网页需登录[小程序管理后台](https://mp.weixin.qq.com/)配置业务域名。</view>
    </view>
    <!-- #endif -->

    <view>
      <view>uni-link</view>
      <uni-link href="https://www.baidu.com" text="https://www.baidu.com"></uni-link>
      <view>uv-link</view>
      <uv-link href="https://www.baidu.com" text="https://www.baidu.com"></uv-link>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // url: 'https://www.qq.com',
      url: 'https://www.baidu.com',
    }
  },
  methods: {
    handleWebView() {
      uni.navigateTo({ url: '/pages/web-view/web-view?src=' + this.url })
    },
    handleWebViewJueJin() {
      uni.navigateTo({ url: '/pages/web-view/web-view?src=' + 'https://www.juejin.cn' })
    },
    handleTest() {
      plus.runtime.openURL(this.url)
    },
    handleTest2() {
      plus.runtime.openWeb(this.url)
    },
    handleTest3() {
      window.open(this.url)
    },
    handleTest4() {
      location.href = this.url
    },
    handleCopyURL() {
      uni.setClipboardData({
        data: this.url,
        success: () => {
          uni.showModal({
            content: '已自动复制网址，请在手机浏览器里粘贴该网址',
            showCancel: false,
          })
        },
      })
    },
  },
}
</script>

<style></style>

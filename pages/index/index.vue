<template>
  <view>
    <view>首页</view>

    <h1>Hello</h1>
    <hr />
    <h2>Hello</h2>

    <button @click="handleButton">按钮</button>

    <rich-text :nodes="'<h1>Hello</h1>'"></rich-text>

    <rich-text :nodes="['<h1>Hello</h1>']"></rich-text>

    <button @click="handleOpenPopup">打开弹出层</button>

    <uni-popup ref="popup">
      <view class="poster" id="poster">
        <view class="close" @click="handleClosePopup">x</view>
        <view class="poster-content cContent" id="posterContent">
          <view class="title">
            <text class="text1 cText" data-c-prop="text1">{{
              posterData.text1
            }}</text>
          </view>
          <image
            class="image cImage"
            data-c-prop="image"
            :src="posterData.image"
            mode=""
          />
          <view class="content">
            <image
              class="icon cImage"
              data-c-prop="icon"
              :src="posterData.icon"
              mode=""
            />
            <text class="text2 cText" data-c-prop="text2">{{
              posterData.text2
            }}</text>
          </view>
        </view>
        <canvas
          :style="{
            width: canvas.width,
            height: canvas.height,
          }"
          canvas-id="myCanvas"
          id="myCan"
        ></canvas>
        <button @click="handleSavePoster">保存</button>
      </view>
    </uni-popup>
  </view>
</template>

<script>
export default {
  data() {
    return {
      posterData: {
        text1: 'Hello World',
        text2: 'Hello World',
        image: '/static/logo.png',
        icon: '/static/icons/home-o.png',
      },
      base64: '',
      canvas: {
        width: '0px',
        height: '0px',
      },
    }
  },
  async onLoad() {
    console.log('首页 onLoad')
    const result = await uni.request({
      url: 'https://api.github.com/',
    })
    console.log(result)
    this.$refs.popup.open()
  },
  onShow() {
    console.log('首页 onShow')
  },
  methods: {
    async handleButton() {},
    handleOpenPopup() {
      console.log(this.$refs)
      this.$refs.popup.open()
    },
    handleClosePopup() {
      this.$refs.popup.close()
    },
    handleSavePoster() {
      console.log('保存海报')

      const ctx = uni.createCanvasContext('myCanvas')

      // 返回一个 SelectorQuery 对象实例。可以在这个实例上使用 select 等方法选择节点。
      const query = wx.createSelectorQuery().in(this)

      let top, left
      // 取出容器 top left
      // 设置画布 width height background-color
      query.select('#posterContent').fields(
        {
          // id: true,
          dataset: true,
          rect: true, // left right top bottom
          size: true, // width height
          // scrollOffset: true, // scrollHeight scrollLeft scrollTop scrollWidth
          computedStyle: ['background-color', 'border-radius'],
        },
        data => {
          console.log('fields', data)
          top = data.top
          left = data.left
          this.canvas.width = data.width + 'px'
          this.canvas.height = data.height + 'px'
          ctx.rect(0, 0, data.width, data.height)
          ctx.setFillStyle(data['background-color'])
          ctx.fill()
        }
      )

      // 绘制文本
      query.selectAll('#posterContent .cText').fields(
        {
          rect: true,
          size: true,
          dataset: true,
          computedStyle: ['color', 'font-size'],
        },
        data => {
          console.log(data)
          data.map(item => {
            ctx.setFillStyle(item.color)
            ctx.setFontSize(parseInt(item['font-size']))
            ctx.setTextAlign()
            // text x y
            ctx.fillText(
              this.posterData[item.dataset.cProp],
              item.left - left,
              item.top - top + item.height - 5
            )
          })
        }
      )
      // 绘制图片
      query.selectAll('#posterContent .cImage').fields(
        {
          rect: true,
          size: true,
          dataset: true,
          computedStyle: ['border-radius'],
        },
        data => {
          console.log('image', data)
          data.map(item => {
            // image x y width height
            ctx.drawImage(
              this.posterData[item.dataset.cProp],
              item.left - left,
              item.top - top,
              item.width,
              item.height
            )
          })
        }
      )

      query.exec()

      setTimeout(() => {
        ctx.draw()

        setTimeout(() => {
          uni.canvasToTempFilePath({
            canvasId: 'myCanvas',
            success: res => {
              console.log(res)
              this.base64 = res.tempFilePath

              uni.saveImageToPhotosAlbum({
                filePath: this.base64,
                success(res) {
                  console.log('success')
                },
              })
            },
          })
        }, 200)
      }, 200)
    },
  },
}
</script>

<style lang="scss" scoped>
.poster {
  background-color: #fff;
  position: relative;
  padding: 60rpx 30rpx 30rpx;
  text-align: center;
  width: 600rpx;
  .close {
    position: absolute;
    top: 0;
    right: 0;
    color: #999;
    padding: 10rpx;
  }
  canvas {
    position: absolute;
    left: -999em;
    background-color: #eee;
  }
  .poster-content {
    background-color: #fff;
    border-radius: 20rpx;
    padding: 20rpx 0;
    color: #444;
    .title {
      font-size: 40rpx;
      color: hotpink;
    }
    .image {
      width: 200rpx;
      height: 200rpx;
      margin: 20rpx 0;
      border-radius: 50%;
    }
    .icon {
      width: 32rpx;
      height: 32rpx;
    }
  }
}
</style>

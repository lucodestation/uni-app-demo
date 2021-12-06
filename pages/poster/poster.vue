<template>
  <view>
    <button @click="handleOpen">显示海报</button>

    <uni-popup ref="popup">
      <view class="popup-content">
        <image
          class="close"
          @click="handleClose"
          src="/static/icons/close.png"
        />
        <view class="container" id="container">
          <view class="cover-wrap">
            <image
              class="cover canvas-image"
              :data-image="poster.cover"
              :src="poster.cover"
            />
          </view>
          <view class="goods-name canvas-text" :data-text="poster.goodsName">{{
            poster.goodsName
          }}</view>
          <view class="price-wrap">
            <text class="rmb canvas-text" data-text="￥">￥</text>
            <text class="price canvas-text" :data-text="poster.price">{{
              poster.price
            }}</text>
          </view>
          <view class="info">
            <view class="left">
              <image
                class="avatar canvas-image"
                :data-image="poster.avatar"
                :src="poster.avatar"
              />
              <view class="text-wrap">
                <text
                  class="username canvas-text"
                  :data-text="poster.username"
                  >{{ poster.username }}</text
                >
                <text
                  class="plain-text canvas-text"
                  :data-text="poster.plainText1"
                  >{{ poster.plainText1 }}</text
                >
              </view>
            </view>
            <image
              class="qrcode canvas-image"
              :data-image="poster.qrcode"
              :src="poster.qrcode"
            />
          </view>
        </view>
        <view class="save-button">
          <text @click="handleButton">保存海报</text>
        </view>
      </view>
    </uni-popup>

    <canvas
      class="hide"
      :style="{
        width: canvas.width,
        height: canvas.height,
      }"
      canvas-id="myCanvas"
    />
  </view>
</template>

<script>
export default {
  data() {
    return {
      poster: {
        cover: '/static/poster/cover.png',
        avatar: '/static/poster/avatar.png',
        qrcode: '/static/poster/qrcode.png',
        goodsName:
          '华晨宝马 X1 2021款 改款 sDrive20Li 尊享型 华晨宝马 X1 2021款 改款 sDrive20Li 尊享型',
        price: '298800.00',
        username: '欧阳海鸥',
        plainText1: '邀请体验小程序',
      },
      canvas: {
        width: '0',
        height: '0',
      },
    }
  },
  onLoad() {
    console.log('个人中心 onLoad')
    // this.$refs.popup.open()
  },
  onShow() {
    console.log('个人中心 onShow')
  },
  methods: {
    handleOpen() {
      this.$refs.popup.open()
    },
    handleClose() {
      this.$refs.popup.close()
    },
    handleButton() {
      const ctx = uni.createCanvasContext('myCanvas')
      const query = wx.createSelectorQuery().in(this)

      let top, left
      // 取出容器 top left
      // 设置画布 width height background-color
      query.select('#container').fields(
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
          this.canvas.width = data.width + 'px'
          this.canvas.height = data.height + 'px'
          top = data.top
          left = data.left

          // drawRoundRect(ctx, x, y, width, height, radius, color)
          this.drawRoundRect(
            ctx,
            0,
            0,
            data.width,
            data.height,
            parseInt(data['border-radius']) * 2,
            data['background-color']
          )
        }
      )

      // 绘制图片
      query.selectAll('#container .canvas-image').fields(
        {
          // id: true,
          dataset: true,
          rect: true, // left right top bottom
          size: true, // width height
          // scrollOffset: true, // scrollHeight scrollLeft scrollTop scrollWidth
          computedStyle: ['border-radius'],
        },
        data => {
          console.log('image', data)

          // drawRoundImg(ctx, img, x, y, width, height, radius)
          data.map(item => {
            this.drawRoundImg(
              ctx,
              item.dataset.image,
              item.left - left,
              item.top - top,
              item.width,
              item.height,
              parseInt(item['border-radius'])
            )
          })
        }
      )

      // 绘制文本
      query.selectAll('#container .canvas-text').fields(
        {
          rect: true,
          size: true,
          dataset: true,
          computedStyle: [
            'color',
            'font-family',
            'font-weight',
            'font-size',
            'line-height',
            'font',
          ],
        },
        data => {
          console.log('text', data)
          data.map(item => {
            const fontWeight = item['font-weight'] === '700' ? 'bold' : 'normal'
            ctx.font = `normal ${fontWeight} ${item['font-size']} ${item['font-family']}`
            ctx.setFillStyle(item.color)
            ctx.setFontSize(parseInt(item['font-size']))
            ctx.setTextAlign()

            const text = item.dataset.text

            // 当前字符串
            let currentText = ''
            // 当前宽度
            let currentWidth = ''
            let currentLineHeight = 0
            for (const letter of text) {
              currentText += letter
              currentWidth = ctx.measureText(currentText).width
              if (currentWidth > item.width) {
                ctx.fillText(
                  currentText,
                  item.left - left,
                  item.top -
                    top +
                    parseInt(item['line-height']) -
                    5 +
                    currentLineHeight
                )
                currentText = ''
                currentLineHeight += parseInt(item['line-height'])
              }
            }

            if (currentText) {
              ctx.fillText(
                currentText,
                item.left - left,
                item.top -
                  top +
                  parseInt(item['line-height']) -
                  5 +
                  currentLineHeight
              )
            }
          })
        }
      )

      query.exec()
      setTimeout(() => {
        ctx.draw()

        // 保存图片
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
    //圆角矩形
    drawRoundRect(ctx, x, y, width, height, radius, color) {
      ctx.save()
      ctx.beginPath()
      ctx.setFillStyle(color)
      ctx.setStrokeStyle(color)
      ctx.setLineJoin('round') //交点设置成圆角
      ctx.setLineWidth(radius)
      ctx.strokeRect(
        x + radius / 2,
        y + radius / 2,
        width - radius,
        height - radius
      )
      ctx.fillRect(
        x + radius,
        y + radius,
        width - radius * 2,
        height - radius * 2
      )
      ctx.stroke()
      ctx.closePath()
    },
    //带圆角图片
    drawRoundImg(ctx, img, x, y, width, height, radius) {
      ctx.beginPath()
      ctx.save()
      // 左上角
      ctx.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 1.5)
      // 右上角
      ctx.arc(
        x + width - radius,
        y + radius,
        radius,
        Math.PI * 1.5,
        Math.PI * 2
      )
      // 右下角
      ctx.arc(x + width - radius, y + height - radius, radius, 0, Math.PI * 0.5)
      // 左下角
      ctx.arc(x + radius, y + height - radius, radius, Math.PI * 0.5, Math.PI)
      ctx.stroke()
      ctx.clip()
      ctx.drawImage(img, x, y, width, height)
      ctx.restore()
      ctx.closePath()
    },
  },
}
</script>

<style lang="scss" scoped>
.popup-content {
  // background-color: #efe;
  width: 600rpx;
  box-sizing: border-box;
  // padding: 40rpx;
  border-radius: 20rpx;
  color: #444;
  .close {
    width: 20rpx;
    height: 20rpx;
    position: absolute;
    top: 20rpx;
    right: 20rpx;
  }
  .container {
    background-color: #fff;
    border-radius: 20rpx;
    padding: 30rpx 20rpx;
    line-height: 1.6;
    .cover-wrap {
      text-align: center;
      padding: 40rpx 0;
      .cover {
        border-radius: 20rpx;
        width: 520rpx;
        height: 400rpx;
      }
    }
    .goods-name {
      font-weight: bold;
      line-height: 1.8;
    }
    .price-wrap {
      color: #f00;
      .rmb {
        font-size: 0.8em;
        line-height: 1.8;
      }
    }
    .info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 30rpx 0;
      .avatar,
      .qrcode {
        width: 100rpx;
        height: 100rpx;
        border-radius: 50rpx;
      }
      .left {
        display: flex;
        .text-wrap {
          display: flex;
          flex-direction: column;
          justify-content: center;
          font-size: 0.8em;
          padding-left: 20rpx;
          .plain-text {
            color: #999;
          }
        }
      }
    }
  }
  .save-button {
    text-align: center;
    color: #fff;
    padding-top: 20rpx;
    text {
      display: inline-block;
      width: 80%;
      height: 80rpx;
      line-height: 80rpx;
      background-color: #2980b9;
      border-radius: 40rpx;
    }
  }
}
canvas.hide {
  position: absolute;
  left: -999px;
}
</style>

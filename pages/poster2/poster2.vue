<template>
  <view>
    <view>
      <button @click="handleOpenPopup">显示海报</button>
      <button @click="handleTest">test</button>
    </view>

    <uni-popup ref="popup">
      <view class="wrap">
        <view class="container" id="container">
          <image class="close-icon" src="/static/icons/close.png" mode="" @click="handleClosePopup" />

          <view class="goods-image-wrap"><image class="canvas-image" :data-image="posterData.goodsinfo.image" :src="posterData.goodsinfo.image" /></view>

          <view class="title-wrap ell2">
            <text class="canvas-text" :data-text="posterData.goodsinfo.name" data-max-line="2">{{ posterData.goodsinfo.name }}</text>
          </view>

          <view class="price-wrap">
            <text class="rmb canvas-text" data-text="￥">￥</text>
            <text class="price canvas-text" :data-text="posterData.goodsinfo.price">{{ posterData.goodsinfo.price }}</text>
          </view>

          <view class="hr2 canvas-rect"></view>

          <view class="userinfo-wrap">
            <view class="avatar-wrap"><image class="canvas-image" :data-image="posterData.userinfo.avatar" :src="posterData.userinfo.avatar" mode="" /></view>
            <view class="nickname-wrap">
              <view class="nickname canvas-text" :data-text="posterData.userinfo.nickname">{{ posterData.userinfo.nickname }}</view>
              <view class="prompt-text canvas-text" data-text="邀请体验小程序">邀请体验小程序</view>
            </view>
            <view class="qrcode-wrap">
              <image class="bg canvas-image" data-image="/static/images/share-round-empty.png" src="/static/images/share-round.png" mode="" />
              <image class="qrcode canvas-image" :data-image="posterData.qrcode" :src="posterData.qrcode" mode="" />
            </view>
          </view>
        </view>

        <view class="button-wrap">
          <view class="button" @click="handleDrawPoster">保存海报</view>
        </view>
      </view>
    </uni-popup>

    <r-canvas ref="rCanvas"></r-canvas>
  </view>
</template>

<script>
import fly from '@/request/fly.js'

export default {
  data() {
    return {
      posterData: {},
      tempFilePath: '',
    }
  },
  methods: {
    async handleOpenPopup() {
      const result = await fly.get('http://localhost:3000/api/demo/foo/poster2')
      // console.log('result', result)
      this.posterData = result.data
      this.$refs.popup.open()
    },
    handleClosePopup() {
      this.$refs.popup.close()
    },
    async handleTest() {
      const width = 375 - 30
      const height = 750

      const canvas = this.$refs.rCanvas
      // 初始化canvas
      await canvas.init({
        canvas_id: 'abc', // 唯一 id
        canvas_width: width, // 画布宽度
        canvas_height: height, // 画布高度
        background_color: 'transparent', // 画布颜色
        // hidden: true, // 是否隐藏画布不呈现在页面上
      })

      // 画圆角矩形
      await canvas.fillRoundRect({
        x: 0,
        y: 0,
        w: width,
        h: height,
        radius: 5, // 矩形圆角弧度
        fill_color: '#ffffff',
      })

      // 画文字
      await canvas.drawText({
        text: '精选好物精选好物精选好物精选好物精选好物精选好物精选好物精选好物精选好物精选好物精选好物精选好物',
        x: 0,
        y: 30,
        font_color: 'pink',
        font_size: 26,
        max_width: width,
        line_height: 32,
        line_clamp: 2,
        font_weight: 'bold',
      })

      // 画矩形
      await canvas.drawRect({
        x: 0,
        y: 30,
        w: width,
        h: 10,
        color: 'red',
      })

      // 画图片
      canvas.drawImage({
        url: this.posterData.goodsinfo.image,
        x: 0,
        y: 50,
        w: 300,
        h: 300,
        border_radius: 300,
      })

      // // 画文字
      // await canvas
      //   .drawText({
      //     text: '精选好物精选好物精选好物精选好物精选好物精选好物精选好物精选好物精选好物精选好物精选好物精选好物',
      //     max_width: 0,
      //     x: 38,
      //     y: 50,
      //     font_color: 'rgb(175, 174, 175)',
      //     font_size: 11,
      //   })
      //   .catch(err_msg => {
      //     uni.showToast({
      //       title: err_msg,
      //       icon: 'none',
      //     })
      //   })

      // 生成海报
      await canvas.draw(res => {
        // console.log(res)
        this.tempFilePath = res.tempFilePath
        //res.tempFilePath：生成成功，返回base64图片
        // 保存图片
        // canvas.saveImage(res.tempFilePath)
      })
    },
    async handleDrawPoster() {
      const drawStart = async () => {
        setTimeout(async () => {
          const canvas = this.$refs.rCanvas
          // 初始化canvas
          await canvas.init({
            canvas_id: 'abc', // 唯一 id
            canvas_width: roundRectBg.w, // 画布宽度
            canvas_height: roundRectBg.h, // 画布高度
            background_color: 'transparent', // 画布颜色
            // hidden: true, // 是否隐藏画布不呈现在页面上
          })

          // 画圆角矩形
          await canvas.fillRoundRect(roundRectBg)
          // 画矩形
          rectArr.map(async item => await canvas.drawRect(item))
          // 画图片
          imageArr.map(async item => await canvas.drawImage(item))
          // 画文字
          textArr.map(async item => await canvas.drawText(item))
          // 生成海报
          await canvas.draw(res => {
            // console.log(res)
            this.tempFilePath = res.tempFilePath
            //res.tempFilePath：生成成功，返回base64图片
            // 保存图片
            // canvas.saveImage(res.tempFilePath)
          })
        }, 200)
      }

      const query = uni.createSelectorQuery().in(this)

      /*
				boundingClientRect 能获取
					id

					dataset

					width		单位 px
					height

					top
					right
					bottom
					left

				fields 能获取
					id

					dataset

					width
					height

					top
					right
					bottom
					left

					和其他 CSS 属性
			*/

      // 圆角矩形背景
      let roundRectBg = ''
      const imageArr = []
      const textArr = []
      const rectArr = []

      let containerTop = 0
      let containerLeft = 0
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
          // console.log('fields #container', data)
          containerTop = data.top
          containerLeft = data.left
          roundRectBg = {
            x: 0,
            y: 0,
            w: data.width,
            h: data.height,
            radius: data['border-radius'], // 矩形圆角弧度
            fill_color: data['background-color'],
          }
          if (roundRectBg && imageArr.length && textArr.length && rectArr.length) {
            drawStart()
          }
        }
      )

      query.selectAll('#container .canvas-rect').fields(
        {
          dataset: true,
          rect: true,
          size: true,
          computedStyle: ['background-color'],
        },
        data => {
          // console.log('canvas-image', data)
          data.map(item => {
            rectArr.push({
              x: item.left - containerLeft,
              y: item.top - containerTop,
              w: item.width,
              h: item.height,
              color: item['background-color'],
            })
          })
          if (roundRectBg && imageArr.length && textArr.length && rectArr.length) {
            drawStart()
          }
        }
      )

      query.selectAll('#container .canvas-image').fields(
        {
          dataset: true,
          rect: true,
          size: true,
          computedStyle: ['border-radius'],
        },
        data => {
          // console.log('canvas-image', data)
          data.map(item => {
            imageArr.push({
              url: item.dataset.image,
              x: item.left - containerLeft,
              y: item.top - containerTop,
              w: item.width,
              h: item.height,
              border_radius: item['border-radius'],
            })
          })
          if (roundRectBg && imageArr.length && textArr.length && rectArr.length) {
            drawStart()
          }
        }
      )

      query.selectAll('#container .canvas-text').fields(
        {
          dataset: true,
          rect: true,
          size: true,
          computedStyle: ['color', 'font-size', 'line-height', 'font-weight'],
        },
        data => {
          // console.log('canvas-text', data)
          data.map(item => {
            const font_weight = item['font-weight'] === '700' ? 'bold' : 'normal'
            const obj = {
              text: item.dataset.text,
              x: item.left - containerLeft,
              y: item.top - containerTop + parseFloat(item['line-height']) - 5,
              font_color: item.color,
              font_size: item['font-size'],
              max_width: item.width,
              line_height: parseFloat(item['line-height']),
              line_clamp: item.dataset.maxLine ? item.dataset.maxLine : 1,
              font_weight,
            }
            textArr.push(obj)
          })
          if (roundRectBg && imageArr.length && textArr.length && rectArr.length) {
            drawStart()
          }
        }
      )

      query.exec()
    },
  },
}
</script>

<style>
.ell1 {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.ell2 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>

<style>
image {
  vertical-align: bottom;
}
.wrap {
  padding: 0 30rpx;
  /* background-color: #f6f6f6; */
}
.container {
  /* background-color: #edf; */
  background-color: #fff;
  width: calc(750rpx - 30rpx - 30rpx);
  padding-bottom: 30rpx;
  border-radius: 10rpx;
  position: relative;
  line-height: 42rpx;
}

.container .close-icon {
  position: absolute;
  width: 22rpx;
  height: 22rpx;
  top: 0;
  right: 0;
  margin: 30rpx;
}
.goods-image-wrap image {
  width: 100%;
  height: 480rpx;
  border-radius: 10rpx;
}
.title-wrap {
  padding: 0 30rpx;
  padding-top: 40rpx;
  font-weight: bold;
  font-size: 30rpx;
  color: #333;
  line-height: 46rpx;
  /* background-color: #efefef; */
}
.price-wrap {
  padding: 30rpx;
  color: #fe3b3b;
  font-size: 24rpx;
  font-weight: bold;
  line-height: 50rpx;
  /* background-color: #fee; */
}

.hr2 {
  height: 4rpx;
  background-color: #f5f5f5;
}

.userinfo-wrap {
  padding: 0 30rpx;
  display: flex;
  align-items: center;
  /* background-color: pink; */
}
.avatar-wrap {
  /* background-color: red; */
}
.avatar-wrap image {
  width: 88rpx;
  height: 88rpx;
  border-radius: 44rpx;
}
.nickname-wrap {
  flex: 1;
  padding: 0 20rpx;
  height: 88rpx;
  /* background-color: hotpink; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.nickname-wrap .nickname {
  font-size: 30rpx;
  color: #333;
}
.nickname-wrap .prompt-text {
  color: #999;
  font-size: 26rpx;
}

.qrcode-wrap {
  position: relative;
  width: 120rpx;
  height: 120rpx;
  /* background-color: red; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.qrcode-wrap image {
  position: absolute;
}
.qrcode-wrap .bg {
  width: 120rpx;
  height: 120rpx;
}
.qrcode-wrap .qrcode {
  width: 68rpx;
  height: 68rpx;
}

.button-wrap {
  margin-top: 30rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
.button {
  width: 550rpx;
  line-height: 100rpx;
  text-align: center;
  background: #f9c949;
  border-radius: 50rpx;
  color: #333;
  font-size: 30rpx;
}

.result-wrap {
  padding: 30rpx;
  background-color: #eee;
}
</style>

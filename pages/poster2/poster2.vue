<template>
  <view>
    <view class="wrap">
      <view class="container" id="container">
        <view class="goods-image-wrap"><image class="canvas-image" :data-image="posterData.goodsinfo.image" :src="posterData.goodsinfo.image" /></view>

        <view class="title-wrap">
          <view class="canvas-text ell2" :data-text="posterData.goodsinfo.name" data-max-line="2">{{ posterData.goodsinfo.name }}</view>
        </view>

        <view class="price-wrap">
          <text class="rmb canvas-text" data-text="￥">￥</text>
          <text class="price canvas-text" :data-text="posterData.goodsinfo.price">{{ posterData.goodsinfo.price }}</text>
        </view>

        <!-- <view class="hr2 canvas-rect"></view> -->

        <view class="userinfo-wrap">
          <view class="avatar-wrap"><image class="canvas-image" :data-image="posterData.userinfo.avatar" :src="posterData.userinfo.avatar" mode="" /></view>
          <view class="nickname-wrap">
            <view class="nickname canvas-text" :data-text="posterData.userinfo.nickname">{{ posterData.userinfo.nickname }}</view>
            <view class="prompt-text canvas-text" data-text="邀请体验小程序">邀请体验小程序</view>
          </view>
          <view class="qrcode-wrap">
            <image class="qrcode canvas-image" :data-image="posterData.qrcode" :src="posterData.qrcode" mode="" />
          </view>
        </view>
      </view>
    </view>

    <view>
      <button @click="handleDrawPoster">button1</button>
    </view>

    <view class="canvas-wrap">
      <canvas
        class="my-canvas"
        id="myCanvas"
        canvas-id="myCanvas"
        :style="{
          width: myCanvasWidth + 'px',
          height: myCanvasHeight + 'px',
        }"
      ></canvas>
    </view>
  </view>
</template>

<script>
import fly from '@/request/fly.js'
import canvas from '@/utils/canvas.js'
console.log(canvas)

/*
  init 初始化 canvas
  drawImage 绘制图片
  drawText 绘制文字
  drawFillRect 绘制矩形
*/

export default {
  data() {
    return {
      posterData: {
        goodsinfo: {
          image: 'http://4s.duowencaiwu.com/uploads/20211229/2e5d7899d065551f989feeae2d36c7e0.jpg',
          name: '适用于通用汽车雨刮雨刷器喷水管玻璃水连接管橡胶软管三通直通y型t接头 黑色橡胶管2米配接头各2个',
          partsgoods_id: 13,
          price: '0.01',
        },
        qrcode: 'https://res.wx.qq.com/wxdoc/dist/assets/img/demo.ef5c5bef.jpg',
        userinfo: {
          avatar: 'http://4s.duowencaiwu.com/uploads/20211214/5796f9c97e25bcfd6bee9e58dec3d581.png',
          nickname: '卢先生',
        },
      },
      tempFilePath: '',
      myCanvasWidth: 0,
      myCanvasHeight: 0,
      text: 'this is a test this is a test this is a test this is a test this is a test this is a test this is a test ',
    }
  },
  async onLoad() {},
  methods: {
    async handleDrawPoster() {
      const ctx = canvas.init('myCanvas', this)

      let canvasTop = 0
      let canvasLeft = 0
      const query = uni.createSelectorQuery().in(this)
      query.select('#container').fields(
        {
          id: true,
          dataset: true,
          rect: true, // left right top bottom
          size: true, // width height
          computedStyle: ['background-color', 'border-radius'],
        },
        async data => {
          // console.log('fields #container', data)
          this.myCanvasWidth = data.width
          this.myCanvasHeight = data.height
          canvasTop = data.top
          canvasLeft = data.left

          // console.log('canvas', canvas)

          await canvas.drawFillRect({
            x: 0,
            y: 0,
            width: data.width,
            height: data.height,
            backgroundColor: data['background-color'],
            borderRadius: data['border-radius'],
          })
        }
      )

      // query.selectAll('#container .canvas-rect').fields(
      //   {
      //     id: true,
      //     dataset: true,
      //     rect: true, // left right top bottom
      //     size: true, // width height
      //     computedStyle: ['background-color'],
      //   },
      //   async data => {
      //     // console.log(data)
      //     data.map(async item => {
      //       // console.log(item)
      //       await canvas.drawFillRect({
      //         x: item.left - canvasLeft,
      //         y: item.top - canvasTop,
      //         width: item.width,
      //         height: item.height,
      //         backgroundColor: item['background-color'],
      //       })
      //     })
      //   }
      // )

      query.selectAll('#container .canvas-image').fields(
        {
          id: true,
          dataset: true,
          rect: true, // left right top bottom
          size: true, // width height
          computedStyle: ['border-radius'],
        },
        async data => {
          data.map(async item => {
            const [error, imageResult] = await uni.getImageInfo({ src: item.dataset.image })
            // console.log(imageResult)
            await canvas.drawImage({
              image: imageResult.path,
              x: item.left - canvasLeft,
              y: item.top - canvasTop,
              width: item.width,
              height: item.height,
              borderRadius: item['border-radius'],
            })
          })
        }
      )

      query.selectAll('#container .canvas-text').fields(
        {
          id: true,
          dataset: true,
          rect: true, // left right top bottom
          size: true, // width height
          computedStyle: ['font-size', 'font-weight', 'font-family', 'color', 'line-height'],
        },
        async data => {
          data.map(async item => {
            // console.log(item)
            const option = {
              text: item.dataset.text,
              x: item.left - canvasLeft,
              y: item.top - canvasTop + parseFloat(item['line-height']) - 5,
              color: item['color'],
              fontFamily: item['font-family'],
              fontWeight: item['font-weight'] === '700' ? 'bold' : 'normal',
              fontSize: item['font-size'],
              lineHeight: item['line-height'],
            }
            if (item.dataset.maxLine) {
              option.maxLine = item.dataset.maxLine
              console.log(item.width)
              option.maxWidth = item.width
            }
            // console.table(option)
            await canvas.drawText(option)
          })
        }
      )

      // 绘制阴影
      query.select('#container .qrcode-wrap').fields(
        {
          id: true,
          dataset: true,
          rect: true, // left right top bottom
          size: true, // width height
          computedStyle: ['background-color', 'border-radius'],
        },
        async data => {
          ctx.save() // 保存当前的绘图上下文
          ctx.beginPath() // 开始创建一个路径，需要调用fill或者stroke才会使用路径进行填充或描边

          // 设置阴影样式
          // offsetX Number 阴影相对于形状在水平方向的偏移
          // offsetY Number 阴影相对于形状在竖直方向的偏移
          // blur Number 0~100 阴影的模糊级别，数值越大越模糊
          // color Color 阴影的颜色
          // ctx.setShadow(0, 0, 15, 'rgba(102, 102, 102)')
          ctx.setShadow(0, 0, 7, 'rgba(102, 102, 102, 0.1)')

          ctx.arc(data.left - canvasLeft + data.width / 2, data.top - canvasTop + data.height / 2, data.width / 2, 0, 2 * Math.PI)

          ctx.setFillStyle(data['background-color']) // 设置边框颜色
          ctx.fill() // 画出当前路径的边框。默认颜色色为黑色
          ctx.closePath() // 关闭一个路径
        }
      )

      query.exec()

      setTimeout(async () => {
        await canvas.draw()

        await canvas.save(() => {
          console.log('保存成功')
        })
      }, 500)
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
.ell3 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
</style>

<style>
image {
  vertical-align: bottom;
}
.wrap {
  padding: 30rpx;
  background-color: hotpink;
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
  font-weight: 700;
  font-size: 30rpx;
  color: #333;
  line-height: 46rpx;
  /* background-color: #efefef; */
}
.price-wrap {
  padding: 30rpx;
  color: #fe3b3b;
  font-size: 24rpx;
  font-weight: 700;
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
  border-radius: 60rpx;
  background-color: #fff;
  box-shadow: 0px 0px 7px 0px rgba(102, 102, 102, 0.1);
  /* box-shadow: 0px 0px 7px 0px rgba(102, 102, 102); */
  display: flex;
  justify-content: center;
  align-items: center;
  /* outline: 2rpx solid red; */
}
.qrcode-wrap .qrcode {
  width: 68rpx;
  height: 68rpx;
  /* outline: 2rpx solid red; */
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

.canvas-wrap {
  background-color: pink;
  padding: 30rpx;
}
</style>

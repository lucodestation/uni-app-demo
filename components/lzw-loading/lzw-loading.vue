<template>
  <!-- 旋转加载插件 -->
  <!-- 有 bug 暂未修复 -->
  <canvas
    canvas-id="loadingCanvas"
    :style="{
      width: this.width + 'px',
      height: this.width + 'px',
    }"
  ></canvas>
</template>

<script>
export default {
  props: {
    // 宽度，单位 px
    width: {
      type: Number,
      default: 32,
    },
    // 线条宽度，单位 px
    lineWidth: {
      type: Number,
      default: '2',
    },
    // 线条颜色
    lineColor: {
      type: String,
      default: '#ccc',
    },
    // 转速，仅支持 normal fast
    speed: {
      type: String,
      default: 'normal',
    },
    // 起点（0 是 3 点钟，0.5 是 6 点钟方向，1 是 9 点钟方向。。。。。。）
    startPoint: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {}
  },
  created() {
    let speed = 0.02
    if (this.speed === 'fast') {
      speed = 0.05
    }
    this.start(speed)
  },
  methods: {
    start(speed) {
      const ctx = uni.createCanvasContext('loadingCanvas', this)
      ctx.lineWidth = this.lineWidth

      let n = this.startPoint
      let a = 1
      setInterval(() => {
        n += speed // 只能使用累加后能正好等于 2 的值（比如 0.01 0.02 0.05 0.1 0.2 0.5）

        ctx.beginPath()
        ctx.arc(this.width / 2, this.width / 2, this.width / 2 - this.lineWidth, Math.PI * this.startPoint, Math.PI * n)
        ctx.setStrokeStyle(a % 2 ? this.lineColor : 'rgba(0,0,0,0)')
        ctx.stroke()
        ctx.closePath()

        ctx.beginPath()
        ctx.arc(this.width / 2, this.width / 2, this.width / 2 - this.lineWidth, Math.PI * n, Math.PI * this.startPoint)
        ctx.setStrokeStyle(a % 2 ? 'rgba(0,0,0,0)' : this.lineColor)
        ctx.stroke()
        ctx.closePath()
        ctx.draw()
        if (n >= 1.95 + this.startPoint) {
          n = this.startPoint
          a++
        }
      }, 1000 / 60)
    },
  },
}
</script>

<style scoped></style>

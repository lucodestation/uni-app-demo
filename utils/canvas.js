/**
 * Canvas 绘图
 * 可绘制
 *  - 填充圆角矩形
 *  - 圆角图片
 *  - 单行文本
 *  - 多行文本，支持指定行数，溢出显示 ...
 *
 * QQ 627526171
 */

const canvas = {}
let id = ''

let ctx = null

/**
 * 初始化 canvas
 * @param {String} id - <canvas /> 标签上的 canvas-id 或 id
 */
canvas.init = (id, _this) => {
  ctx = uni.createCanvasContext(id, _this)
  id = id
  return ctx
}

/**
 * 绘制填充圆角矩形
 * @param {Object} option
 * @param {Number} option.x 矩形左上角 x 坐标，单位 px
 * @param {Number} option.y 矩形左上角 y 坐标，单位 px
 * @param {Number} option.width 矩形宽度，单位 px
 * @param {Number} option.height 矩形高度，单位 px
 * @param {Number} option.borderRadius 圆角大小，单位 px
 * @param {Number} option.backgroundColor 矩形背景色
 */
canvas.drawFillRect = option => {
  return new Promise((resolve, reject) => {
    // console.log('绘制圆角矩形', option)
    const x = parseFloat(option.x)
    const y = parseFloat(option.y)
    const width = parseFloat(option.width)
    const height = parseFloat(option.height)
    const borderRadius = parseFloat(option.borderRadius) || 0
    const backgroundColor = option.backgroundColor || '#000'

    // 将 borderRadius 设置为短边的一半
    if (width < borderRadius * 2 || height < borderRadius * 2) {
      borderRadius = Math.min(width, height) / 2
    }

    ctx.save() // 保存当前的绘图上下文
    ctx.beginPath() // 开始创建一个路径，需要调用fill或者stroke才会使用路径进行填充或描边

    // 左上角
    /**
     * 画一条弧线
     * @param {Number} x 圆的 x 坐标 （宽减去圆角半径）
     * @param {Number} y 圆的 y 坐标 （高减去圆角半径）
     * @param {Number} r 圆的半径
     * @param {Number} sAngle 起始弧度（3 点钟方向），单位弧度
     * @param {Number} eAngle 终止弧度
     * @param {Boolean} counterclockwise 可选。指定弧度的方向是逆时针还是顺时针。默认是false，即顺时针
     */
    ctx.arc(x + borderRadius, y + borderRadius, borderRadius, Math.PI, 1.5 * Math.PI)

    // 上横线
    /**
     * x
     * y
     */
    ctx.lineTo(x + Math.abs(width - borderRadius), y) // 增加一个新点，然后创建一条从上次指定点到目标点的线

    // 右上角
    ctx.arc(x + Math.abs(width - borderRadius), y + borderRadius, borderRadius, 1.5 * Math.PI, 2 * Math.PI)

    // 右竖线
    ctx.lineTo(x + width, y + Math.abs(height - borderRadius))

    // 右下角
    ctx.arc(x + Math.abs(width - borderRadius), y + Math.abs(height - borderRadius), borderRadius, 0, 0.5 * Math.PI)

    // 下横线
    ctx.lineTo(x + borderRadius, y + height)

    // 左下角
    ctx.arc(x + borderRadius, y + Math.abs(height - borderRadius), borderRadius, 0.5 * Math.PI, Math.PI)

    // 左竖线
    ctx.lineTo(x, y + borderRadius)

    // 设置阴影样式
    // offsetX Number 阴影相对于形状在水平方向的偏移
    // offsetY Number 阴影相对于形状在竖直方向的偏移
    // blur Number 0~100 阴影的模糊级别，数值越大越模糊
    // color Color 阴影的颜色
    if (!option.setShadow) {
      ctx.setShadow(0, 0, 0, '#fff')
    }

    ctx.setFillStyle(backgroundColor) // 设置填充色
    ctx.fill() // 对当前路径中的内容进行填充。默认的填充色为黑色

    // ctx.setStrokeStyle(backgroundColor) // 设置边框颜色
    // ctx.stroke() // 画出当前路径的边框。默认颜色色为黑色
    ctx.closePath() // 关闭一个路径

    resolve()
  })
}

/**
 * 绘制圆角图片
 * @param {Object} option
 * @param {String} image
 * @param {Number} x 图片左上角 x 坐标，单位 px
 * @param {Number} y 图片左上角 y 坐标，单位 px
 * @param {Number} width 图片宽度，单位 px
 * @param {Number} height 图片高度，单位 px
 * @param {Number} borderRadius 圆角大小，单位 px
 */
canvas.drawImage = option => {
  // console.log('绘制圆角图片', option)
  return new Promise((resolve, reject) => {
    const image = option.image
    const x = parseFloat(option.x)
    const y = parseFloat(option.y)
    const width = parseFloat(option.width)
    const height = parseFloat(option.height)
    const borderRadius = parseFloat(option.borderRadius) || 0

    // 将 borderRadius 设置为短边的一半
    if (width < borderRadius * 2 || height < borderRadius * 2) {
      borderRadius = Math.min(width, height) / 2
    }

    ctx.save() // 保存当前的绘图上下文
    ctx.beginPath() // 开始创建一个路径，需要调用fill或者stroke才会使用路径进行填充或描边

    // 左上角
    ctx.arc(x + borderRadius, y + borderRadius, borderRadius, Math.PI, 1.5 * Math.PI)

    // 右上角
    ctx.arc(x + Math.abs(width - borderRadius), y + borderRadius, borderRadius, 1.5 * Math.PI, 2 * Math.PI)

    // 右下角
    ctx.arc(x + Math.abs(width - borderRadius), y + Math.abs(height - borderRadius), borderRadius, 0, 0.5 * Math.PI)

    // 左下角
    ctx.arc(x + borderRadius, y + Math.abs(height - borderRadius), borderRadius, 0.5 * Math.PI, Math.PI)

    ctx.setStrokeStyle('rgba(0,0,0,0)')
    ctx.stroke() // 画出当前路径的边框。默认颜色色为黑色

    ctx.clip() // 从原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内（不能访问画布上的其他区域）。可以在使用 clip() 方法前通过使用 save() 方法对当前画布区域进行保存，并在以后的任意时间对其进行恢复（通过 restore() 方法）。

    ctx.closePath() // 关闭一个路径

    // 绘制图像到画布
    /**
     * @param {String} imageResource 所要绘制的图片资源
     * @param {Number} dx 图像的左上角在目标canvas上 X 轴的位置
     * @param {Number} dy 图像的左上角在目标canvas上 Y 轴的位置
     * @param {Number} dWidth 在目标画布上绘制图像的宽度，允许对绘制的图像进行缩放
     * @param {Number} dHeight 在目标画布上绘制图像的高度，允许对绘制的图像进行缩放
     */
    ctx.drawImage(image, x, y, width, height)

    if (!option.setShadow) {
      ctx.setShadow(0, 0, 0, '#fff')
    }

    ctx.restore() // 恢复之前保存的绘图上下文

    ctx.closePath() // 关闭一个路径

    resolve()
  })
}

/**
 * 绘制文字
 * @param {Object} option
 * @param {Number} option.x 文字左上角 x 坐标，单位 px
 * @param {Number} option.y 文字左上角 y 坐标，单位 px（注意：文字的坐标是已文字的左下角为参考点的）
 * @param {String} option.color 字体颜色
 * @param {String} option.fontWeight 自重，仅支持关键字（normal、bold等）
 * @param {Number} option.fontSize 字体大小，单位 px
 * @param {Number} option.lineHeight 行高，单位 px
 * @param {Number} option.maxLine 最大行数
 * @param {Number} option.maxWidth 最大宽度
 * @param {String} option.fontFamily
 * @param {String} option.fontStyle
 */
canvas.drawText = async option => {
  return new Promise((resolve, reject) => {
    const text = option.text
    const x = option.x
    const y = option.y
    const color = option.color || '#000'
    const fontStyle = option.fontStyle || 'normal'
    const fontVariant = option.fontVariant || 'normal'
    const fontWeight = option.fontWeight || 'normal'
    const fontSize = parseFloat(option.fontSize) || 16
    const lineHeight = parseFloat(option.lineHeight) || 21
    const fontFamily = option.fontFamily || 'sans-serif'
    let maxWidth
    if (option.maxWidth) {
      maxWidth = parseFloat(option.maxWidth)
    }
    let maxLine
    if (option.maxLine) {
      maxLine = parseInt(option.maxLine)
    }

    ctx.font = `${fontStyle} ${fontVariant} ${fontWeight} ${fontSize}px ${fontFamily}`

    ctx.setFillStyle(color)
    if (!maxLine) {
      ctx.fillText(text, x, y)
    } else {
      let currentText = ''
      let currentLine = 1
      let currentLineHeight = 0

      for (let i = 0, length = text.length; i < length; i++) {
        currentText += text[i]
        if (ctx.measureText(currentText + text[i + 1]).width > maxWidth && currentLine < maxLine) {
          ctx.fillText(currentText, x, y + currentLineHeight)
          currentText = ''
          currentLine++
          currentLineHeight += lineHeight
        } else if (text[i + 1] !== undefined && ctx.measureText(currentText + text[i + 1]).width > maxWidth && currentLine >= maxLine) {
          ctx.fillText(currentText.substr(0, currentText.length - 1) + '...', x, y + currentLineHeight)
          currentText = ''
          break
        }
      }

      if (currentText) {
        ctx.fillText(currentText, x, y + currentLineHeight)
      }

      if (!option.setShadow) {
        ctx.setShadow(0, 0, 0, '#fff')
      }
    }

    resolve()
  })
}

canvas.draw = () => {
  return new Promise((resolve, reject) => ctx.draw(false, resolve))
}

canvas.save = callback => {
  return new Promise((resolve, reject) => {
    uni.canvasToTempFilePath(
      {
        canvasId: 'myCanvas',
        success: res => {
          uni.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: result => {
              if (callback) {
                resolve()
                callback()
              }
            },
          })
        },
      },
      this
    )
  })
}

export default canvas

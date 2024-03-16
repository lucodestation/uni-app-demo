console.log('vue.config.js 运行了')

const child_process = require('child_process')
const tailwindMode = process.env.NODE_ENV
console.log({ tailwindMode })

console.log(`[tailwindcss] 开始${tailwindMode == 'production' ? '生产环境打包' : '开发模式监听'}`)
child_process.exec(
  // 这里指令对应 package.json 中的 npm scripts
  tailwindMode == 'production' ? 'npm run tailwind-build' : 'npm run tailwind-dev',
  {
    cwd: __dirname, // 切换目录到当前项目，必须
  },
  (error, stdout, stderr) => {
    // tailwind --watch 是一个持久进程，不会立即执行回调
    // process.stdout.write('tailwind success')
    if (error) {
      console.error('[tailwindcss] 异常，请检查')
      console.error(error)
      console.error(stdout)
      console.error(stderr)
    }
    if (tailwindMode == 'production') {
      console.log('[tailwindcss] 生产环境打包完成')
    }
  }
)

module.exports = {}

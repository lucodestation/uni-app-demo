<script>
// #ifdef H5
// import VConsole from 'vconsole'
// if (location.hostname.startsWith('localhost') || location.hostname.startsWith('127.0.0.1') || location.hostname.startsWith('192.168.')) {
//   new VConsole()
// }
// #endif

export default {
  onLaunch(options) {
    console.log('App Launch', options)
  },
  onShow() {
    console.log('App Show')
  },
  onHide() {
    console.log('App Hide')
  },
}
</script>

<style>
/*每个页面公共css */
</style>

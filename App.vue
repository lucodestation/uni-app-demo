<script>
// #ifdef H5
import VConsole from "vconsole";
// #endif

export default {
  globalData: {
    // #ifdef H5
    vConsole: null,
    // #endif
  },
  onLaunch() {
    // #ifdef H5
    if (
      location.hostname.startsWith("localhost") ||
      location.hostname.startsWith("127.0.0.1") ||
      location.hostname.startsWith("192.168.")
    ) {
      this.vConsole = new VConsole();
    }
    // #endif
    console.log("App Launch");
  },
  onShow() {
    console.log("App Show");
  },
  onHide() {
    console.log("App Hide");
  },
  onExit() {
    // #ifdef H5
    this.vConsole.destroy();
    // #endif
    console.log("App Exit");
  },
};
</script>

<style>
/*每个页面公共css */
</style>

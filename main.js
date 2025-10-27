import App from './App'
import uviewPlus from 'uview-plus'
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()

import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  app.use(uviewPlus)
  return {
    app
  }
}
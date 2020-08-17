import Vue from 'vue'
import App from './App.vue'
import router from './router' //会自动去寻找router文件里面的index文件，省略写/index.js
import store from './store'

import toast from 'components/common/toast/index'

Vue.config.productionTip = false

//定义一个vue实例作为 bus 总线
Vue.prototype.$bus = new Vue()

//安装toast插件 
Vue.use(toast)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

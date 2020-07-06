import Vue from 'vue'
import App from './App.vue'
import router from './router' //会自动去寻找router文件里面的index文件，省略写/index.js

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

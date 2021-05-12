import Vue from 'vue'
import App from './App.vue'
// import router from './yvue-router'
// import router from './router'
import store from './ystore'

Vue.config.productionTip = false
new Vue({
  // router,
  store,
  render: h => h(App)
}).$mount('#app')

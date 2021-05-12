let Vue;

class Store {
  constructor(options) {
    // 响应式处理的数据
    this.state = new Vue({
      data: options.state
    })
  }
  
}

function install(_Vue) {
  Vue = _Vue
  Vue.mixin({
    beforeCreate(){
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}

export default { Store, install };

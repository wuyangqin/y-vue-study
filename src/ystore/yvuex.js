let Vue;

class Store {
  constructor(options) {
    this._vm = new Vue({
      data: {
        // 添加$$, Vue就不会代理
        $$state: options.state
      }
    })
  }
  get state() {
    return this._vm._data.$$state
  }
  set state(v) {
    console.error('请使用replaceState重置状态');
  }
  
}

function install(_Vue) {
  Vue = _Vue
  Vue.mixin({
    beforeCreate(){
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
        console.log(this.$store);
      }
    }
  })
}

export default { Store, install };

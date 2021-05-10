let Vue

//1.实现插件
class VueRouter {
  constructor(options) {
    this.options = options;
  }
}

VueRouter.install = function (_Vue) {
  Vue = _Vue // 相当于一个引用，将来打包时不会将vue打包进来
  
  // 注册router实例
  // 通过全局混入，访问Vue实例
  Vue.mixin({
    beforeCreate() {
      // 仅在根组件创建时执行一次
      if(this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }
    }
  })
  
  // 全局注册router-view  router-link
  Vue.component('router-view', {
    // url => component
    // url
    // window.location.hash
    // router: this.$router
    render(h) {
      let component = null
      console.log(this.$router)
      const {options} = this.$router
      console.log(options);
      component = options.routes[0].component
      return h(component)
    }
  })
  Vue.component('router-link', {
    props: {
      to: {
        type: String,
        required: true,
      }
    },
    render(h) {
      return h('a', {attrs: {href: `#${this.to}`}}, this.$slots.default)
    }
    
  })
}

export default VueRouter

let Vue

//1.实现插件
class VueRouter {
  constructor(options) {
    this.$options = options;
  }
}

VueRouter.install = function (_Vue) {
  Vue = _Vue // 相当于一个引用，将来打包时不会将vue打包进来
  
  // 全局注册router-view  router-link
  Vue.component('router-view', {
    render(h) {
      return h('div', 'router内容')
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

import View from "./components/view";
import Link from "./components/link";

let Vue

//1.实现插件
class VueRouter {
  constructor(options) {
    this.options = options;
    
    const getHash = () => window.location.hash.slice(1) || "/"
    // 数据响应式，current必须是响应式的，这样他变化，使用它的组件就会重新render
    // 如何造一个响应式数据
    // 方式1：借鸡生蛋 - new Vue({data: {current: '/'}})
    // 方式2：Vue.util.defineReactive(obj, 'current', '/')
    Vue.util.defineReactive(
      this,
      "current",
      getHash()
    );
    
    // 监控url变化
    window.addEventListener('hashchange', () => {
      this.current = getHash()
    })
  }
}

VueRouter.install = function (_Vue) {
  Vue = _Vue // 相当于一个引用，将来打包时不会将vue打包进来
  
  // 注册router实例
  // 通过全局混入，访问Vue实例
  Vue.mixin({
    beforeCreate() {
      // 仅在根组件创建时执行一次
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }
    }
  })
  
  // 全局注册router-view  router-link
  Vue.component('router-view', View)
  Vue.component('router-link', Link)
}

export default VueRouter

import View from "./components/view";
import Link from "./components/link";

let Vue

//1.实现插件
class VueRouter {
  constructor(options) {
    this.options = options;
    
    // 数据响应式，current必须是响应式的，这样他变化，使用它的组件就会重新render
    // 如何造一个响应式数据
    // 方式1：借鸡生蛋 - new Vue({data: {current: '/'}})
    // 方式2：Vue.util.defineReactive(obj, 'current', '/')
    Vue.util.defineReactive(
      this,
      "current",
      this.getHash()
    );
    Vue.util.defineReactive(this, 'matched', [])
    this.match()
    
    // 监控url变化
    window.addEventListener('hashchange', this.onHashchange.bind(this))
    window.addEventListener('load', this.onHashchange.bind(this))
  }
  
  getHash() {
    return window.location.hash.slice(1) || "/"
  }
  
  onHashchange() {
    this.current = this.getHash()
    this.matched = []
    this.match()
  }
  
  match(routes) {
    routes = routes || this.options.routes
    // 递归遍历
    for (const route of routes) {
      const {path} = route
      const {current} = this
      if (path === '/' && current === '/') {
        this.matched.push(route)
        return
      }
      if (path !== '/' && current.indexOf(path) > -1) {
        this.matched.push(route)
        if (route.children && route.children.length > 0) {
          this.match(route.children)
        }
        return
      }
    }
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
        console.log(this.$options.router);
      }
    }
  })
  
  // 全局注册router-view  router-link
  Vue.component('router-view', View)
  Vue.component('router-link', Link)
}

export default VueRouter

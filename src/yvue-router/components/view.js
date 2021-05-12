export default {
  // url => component
  // url
  // window.location.hash
  // router: this.$router
  render(h) {
    this.$vnode.data.routerView = true
    // 标记当前router-view深度
    let depth = 0;
    let parent = this.$parent
    while (parent) {
      const vnodeData = parent.$vnode && parent.$vnode.data
      if (vnodeData && vnodeData.routerView) {
        depth++;
      }
      parent = parent.$parent
    }
    
    // 获取matched对应的component
    let component = null
    const route = this.$router.matched[depth]
    if (route) {
      component = route.component
    }
    
    return h(component)
  }
}

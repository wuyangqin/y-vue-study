export default {
  // url => component
  // url
  // window.location.hash
  // router: this.$router
  render(h) {
    let component = null
    const {options, current} = this.$router
    const currentRoute = options.routes.find(route => route.path === current)
    component = currentRoute.component
    
    return h(component)
  }
}

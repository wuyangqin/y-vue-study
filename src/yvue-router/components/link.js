export default {
  props: {
    to: {
      type: String,
      required: true,
    }
  },
  render(h) {
    // router-link-exact-active router-link-active
    const {to} = this
    let className = 'router-link-active'
    let activeClassName = 'router-link-exact-active'
    const {current} = this.$router
    if (to === current) {
      className += ` ${activeClassName}`
    }
    
    return h('a',
      {
        attrs: {
          href: `#${to}`,
          class: className
        }
      },
      this.$slots.default)
  }
  
}

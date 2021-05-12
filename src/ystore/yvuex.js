let Vue;

class Store {
  constructor(options) {
    this._mutations = options.mutations;
    this._actions = options.actions
    
    this._vm = new Vue({
      data: {
        // 添加$$, Vue就不会代理
        $$state: options.state
      }
    })
    
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)
  }
  
  get state() {
    return this._vm._data.$$state
  }
  
  set state(v) {
    console.error('请使用replaceState重置状态');
  }
  
  // 修改状态，commit('add', payload)
  commit(type, payload) {
    // 1.根据type获取mutation
    const mutation = this._mutations[type]
    
    if (!mutation) {
      console.error('mutation不存在');
      return
    }
    
    mutation(this.state, payload)
  }
  
  // dispatch('add', payload)
  dispatch(type, payload) {
    const action = this._actions[type]
    
    if (!action) {
      console.error('action不存在');
      return
    }
    
    action(this, payload)
  }
  
}

function install(_Vue) {
  Vue = _Vue
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}

export default {Store, install};

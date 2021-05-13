let Vue;

class Store {
  constructor(options) {
    this._mutations = options.mutations;
    this._actions = options.actions
    this._getters = options.getters;
    
    let computed = {}
    this.getters = {}
    const store = this
    Object.keys(this._getters).forEach(key => {
      // 获取用户定义的getter
      const fn = store._getters[key]
      // 转换为computed无参数形式
      computed[key] = function () {
        return fn(store.state)
      }
      // 为getters定义只读
      Object.defineProperty(store.getters, key, {
        get: () => store._vm[key]
      })
    })
    
    this._vm = new Vue({
      data: {
        // 添加$$, Vue就不会代理
        $$state: options.state
      },
      computed
    })
    
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)
  }
  
  get state() {
    return this._vm._data.$$state
  }
  
  set state(v) {
    console.error('please use replaceState to reset state');
  }
  
  // 修改状态，commit('add', payload)
  commit(type, payload) {
    // 1.根据type获取mutation
    const mutation = this._mutations[type]
    
    if (!mutation) {
      console.error(`unknown mutation type: ${type}`);
      return
    }
    
    mutation(this.state, payload)
  }
  
  // dispatch('add', payload)
  dispatch(type, payload) {
    const action = this._actions[type]
    
    if (!action) {
      console.error(`unknown action type: ${type}`);
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

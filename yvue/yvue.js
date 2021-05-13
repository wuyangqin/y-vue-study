function defineReactive(obj, key, value) {
  // 如果value是个对象，需要递归处理
  observe(value)
  
  
  Object.defineProperty(obj, key, {
    get() {
      console.log(key, 'get');
      return value
    },
    set(newValue) {
      if (value !== newValue) {
        console.log(key, 'set');
        value = newValue
        // 新值如果是对象，仍然需要递归遍历处理
        observe(newValue);
      }
    }
  })
}


function observe(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  new Observer(obj)
}

class YVue {
  constructor(options) {
    // 0.保存选项
    this.$options = options
    this.$data = options.data
    
    // 1.对data做响应式处理
    observe(options.data);
  }
}

class Observer {
  constructor(obj) {
    // 判断obj的类型
    if (Array.isArray(obj)) {
      // todo
    } else {
      this.walk(obj)
    }
  }
  
  // 添加响应式
  walk(obj) {
    Object.keys(obj).forEach(key => defineReactive(obj, key, obj[key]))
  }
}

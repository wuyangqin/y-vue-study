function defineReactive(obj, key, value) {
  // 如果value是个对象，需要递归处理
  observe(value)
  
  
  Object.defineProperty(obj, key, {
    get() {
      return value
    },
    set(newValue) {
      if (value !== newValue) {
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

// 能够将传入对象中的所有key代理到指定对象上
function proxy(vm) {
  Object.keys(vm.$data).forEach(key => {
    Object.defineProperty(vm, key, {
      get() {
        return vm.$data[key]
      },
      set(v) {
        vm.$data[key] = v
      }
    })
  })
}


class YVue {
  constructor(options) {
    // 0.保存选项
    this.$options = options
    this.$data = options.data
    
    // 1.对data做响应式处理
    observe(options.data);
    
    // 2. 代理，将data中的key代理到Vue实例中
    proxy(this)
    
    // 3.编译
    new Compile(options.el, this)
  }
}

// 执行数据响应化
class Observer {
  constructor(obj) {
    // 判断obj的类型，做响应处理
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

class Compile {
  constructor(el, vm) {
    this.$vm = vm
    this.$el = document.querySelector(el)
    if (this.$el) {
      this.compile(this.$el);
    }
  }
  
  // 遍历node，判断节点类型，做不同处理
  compile(node) {
    const childrenNodes = node.childNodes
    Array.from(childrenNodes).forEach(n => {
      // 如果是元素则编译元素，如果是文本，则判断是否有{{}}，编译插值文本
      if (this.isElement(n)) {
        // 编译元素
        this.compileElement(n);
        if (n.childNodes.length > 0) {
          this.compile(n);
        }
      } else if (this.isInter(n)) {
        // 编译插值表达式
        this.compileInter(n)
      }
    })
  }
  
  
  // 是否为元素
  isElement(n) {
    return n.nodeType === 1
  }
  
  // 判断是否为插值表达式（形如{{}}）
  isInter(n) {
    return n.nodeType === 3 && /\{\{(.*)\}\}/.test(n.textContent)
  }
  
  isDir(attrName) {
    return attrName.startsWith('v-');
  }
  
  // 编译插值文本 {{ooxx}}
  compileInter(n) {
    n.textContent = this.$vm[RegExp.$1]
  }
  
  //编译元素：遍历它的所有特性，看是否k-开头指令，或者@事件
  compileElement(n) {
    const attrs = n.attributes
    Array.from(attrs).forEach(attr => {
      const attrName = attr.name
      const exp = attr.value
      // 指令
      if (this.isDir(attrName)) {
        // 执行特定指令处理函数
        const dir = attrName.substring(2);
        this[dir] && this[dir](n, exp);
      }
    })
  }
  
  // 文本
  text(n, exp) {
    n.textContent = this.$vm[exp]
  }
  
  // html
  html(n, exp) {
    n.innerHTML = this.$vm[exp]
  }
  
  
}

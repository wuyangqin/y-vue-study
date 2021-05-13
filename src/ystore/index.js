import Vue from 'vue'
import Vuex from './yvuex.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    counter: 0
  },
  mutations: {
    add(state) {
      state.counter++
    }
  },
  actions: {
    add({commit}) {
      setTimeout(() => {
        commit('add')
      }, 1000);
    }
  },
  getters:{
    doubleCounter(state){
      return state.counter * 2
    }
  },
  modules: {}
})

export default store

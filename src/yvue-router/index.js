import Vue from "vue";
import VueRouter from './yvue-router'
import Home from '../views/Home.vue'

// use方法内部会调用install(Vue)
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter(
  {
    routes
  }
)

export default router

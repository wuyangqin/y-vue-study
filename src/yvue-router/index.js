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
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    children: [
      {
        path: '/about/child1',
        name: 'child1',
        component: () => import(/* webpackChunkName: "about" */ '../components/Child1.vue'),
      },
      {
        path: '/about/child2',
        name: 'child2',
        component: () => import(/* webpackChunkName: "about" */ '../components/Child2.vue'),
      }
    ]
  }
]

const router = new VueRouter(
  {
    routes
  }
)

export default router

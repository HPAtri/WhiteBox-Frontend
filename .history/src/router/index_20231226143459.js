import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/index',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Index.vue'),
    meta: { keepAlive: true }
  },
  {
    path: '/login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/setarticle',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/SetArticle.vue')
  },
  {
    path: '/about/all',
    component: () => import(/* webpackChunkName: "about" */ '../views/About/All.vue')
  },
  {
    path: '/about/boutique',
    component: () => import(/* webpackChunkName: "about" */ '../views/About/Boutique.vue')
  },
  {
    path: '/about/strategy',
    component: () => import(/* webpackChunkName: "about" */ '../views/About/Strategy.vue')
  },
  {
    path: '/about/talk',
    component: () => import(/* webpackChunkName: "about" */ '../views/About/Talk.vue')
  },
  {
    path: '/personal',
    component: () => import('../views/Personal.vue')
  },
  {
    path: '/game',
    component: () => import('../views/Game.vue')
  },
  {
    path: '/search',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/teach',
    component: () => import('../views/Teach.vue')
  }
]

const router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes
})

export default router

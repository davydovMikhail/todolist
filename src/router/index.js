import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main'
import Todos from '../views/Todos'
import Authorization from '../views/Authorization'
import Registration from '../views/Registration'
import Cookies from 'js-cookie'

Vue.use(VueRouter)

let routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      {
        path: "list/:id",
        component: Todos,        
        name: "Todos",
        props: true
      }
    ],
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/authorization',
    name: 'authorization',
    component: Authorization,
  },
  {
    path: '/registration',
    name: 'registration',
    component: Registration,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!Cookies.get('access_token')) {
      next({
        path: '/authorization',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() 
  }
})



export default router

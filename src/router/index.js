import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/user/login';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      name :'/',
      path:'/',
      component : Login
    }
  ]
})

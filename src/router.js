/* eslint-disable no-undef */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '/dashboard',
      component: () => import('./pages/Dashboard.vue'),
      children: [
        {
          path: 'entidad',
          name: 'entidad',
          component: () => import('./views/Entidad.vue')
        },
        {
          path: 'programa',
          name: 'programa',
          component: () => import('./views/Programa.vue')
        },
        {
          path: 'perfil',
          name: 'perfil',
          component: () => import('./views/Perfil.vue')
        }
      ]
    }
  ]
})

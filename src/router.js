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
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue')
    },
    {
      path: '/dashboard',
      component: () => import(/* webpackChunkName: "entidad" */ './pages/Dashboard.vue'),
      children: [
        {
          path: 'entidad',
          name: 'entidad',
          component: () => import(/* webpackChunkName: "entidad" */ './views/Entidad.vue')
        },
        {
          path: 'programa',
          name: 'programa',
          component: () => import(/* webpackChunkName: "programa" */ './views/Programa.vue')
        },
        {
          path: 'perfil',
          name: 'perfil',
          component: () => import(/* webpackChunkName: "perfil" */ './views/Perfil.vue')
        }
      ]
    }
  ]
})

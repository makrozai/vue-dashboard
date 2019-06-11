// VIEWS IMPORT
import home from './views/Home.vue'
import login from './views/Login.vue'
import register from './views/Register.vue'
import dashboard from './pages/Dashboard.vue'
import entity from './views/Entidad.vue'
import program from './views/Programa.vue'
import perfil from './views/Perfil.vue'
import verifyEntity from './views/VerifyEntity'
import acceptEntity from './views/AcceptEntity'

/* eslint-disable no-undef */
import store from './store'
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        Auth: false,
        title: 'Iniciar Sesión'
      },
      beforeEnter: (to, from, next) => {
        if (store.state.logged) {
          next({ name: 'ficha-de-verificacion' })
        } else {
          next()
        }
      }
    },
    {
      path: '/register',
      name: 'register',
      component: register,
      meta: {
        Auth: false,
        title: 'Registro'
      },
      beforeEnter: (to, from, next) => {
        if (store.state.logged) {
          next({ name: 'ficha-de-verificacion' })
        } else {
          next()
        }
      }
    },
    {
      path: '/dashboard',
      component: dashboard,
      children: [
        {
          path: 'entidad',
          name: 'entidad',
          component: entity,
          meta: {
            Auth: true,
            title: 'Entidad'
          }
        },
        {
          path: 'programa',
          name: 'programa',
          component: program,
          meta: {
            Auth: true,
            title: 'Programas'
          }
        },
        {
          path: 'perfil',
          name: 'perfil',
          component: perfil,
          meta: {
            Auth: true,
            title: 'Perfil'
          }
        },
        {
          path: 'ficha-de-verificacion',
          name: 'ficha-de-verificacion',
          component: verifyEntity,
          meta: {
            Auth: true,
            title: 'Ficha de verificación'
          }
        },
        {
          path: 'ficha-aprobada',
          name: 'ficha-aprobada',
          component: acceptEntity,
          meta: {
            Auth: true,
            title: 'Aprovación de Entidad'
          }
        }
      ]
    }
  ]
})
// gestion de cambios de ruta
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  if (to.meta.Auth && !store.state.logged) {
    next({ name: 'login' })
  } else {
    if (store.state.logged) {
      store.dispatch('login')
        .then(res => {

        })
    }
    next()
  }
})

export default router

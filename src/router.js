// VIEWS IMPORT
// import home from './views/Home.vue'
import login from './views/Login.vue'
import register from './views/Register.vue'
import dashboard from './pages/Dashboard.vue'
import entity from './views/Entity.vue'
import program from './views/Program.vue'
import perfil from './views/Perfil.vue'
import initiative from './views/Initiative.vue'
import verifyEntity from './views/VerifyEntity'
import acceptEntity from './views/AcceptEntity'
import recoverPassword from './views/RecoverPassword'
import changePassword from './views/ChangePassword'

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
      redirect: { name: 'login' }
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
      path: '/recuperar-contrasena',
      name: 'recuperar-contrasena',
      component: recoverPassword,
      meta: {
        Auth: false,
        title: 'Recuperar Contrasena'
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
      path: '/cambiar-contrasena',
      name: 'cambiar-contrasena',
      component: changePassword,
      meta: {
        Auth: false,
        title: 'Cambiar Contrasena'
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
          path: 'iniciativa',
          name: 'iniciativa',
          component: initiative,
          meta: {
            Auth: true,
            title: 'Iniciativa'
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
    // comprueba que el usuario esta ok
    if (store.state.logged && !store.state.userSesion.user.id) {
      store.dispatch('getUser')
        .then(response => {
          // comprueba que tipo de usuario es

          switch (response.response.type_user_id) {
            case 1 :
              // administrador
              console.log('es administrador')
              next()
              break
            case 2 :
              // entidad
              store.dispatch('getEntity', response.decode.entity_id)
                .then(response => {
                  if (response.state === 2) {
                    store.dispatch('setAlert', {
                      text: 'Su entidad aun no esta validada',
                      state: true,
                      dismissible: true,
                      type: 'error'
                    })
                  }
                }).then(() => {
                  next()
                })
              break
            case 3 :
              // participante
              store.dispatch('getPartaker', response.decode.partaker_id)
                .then(() => {
                  next()
                })
              break
          }
        })
        .catch(error => {
          if (error.body.code === 'token_expired') {
            store.dispatch('logout')
            next({ name: 'login' })
          }
        })
    } else {
      next()
    }
  }
})

export default router

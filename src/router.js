// VIEWS IMPORT
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
import indicators from './views/Indicators'
import inversion from './views/Inversion'
import typeInversion from './views/TypeInversion'
import home from './views/Home'
import pageNotFound from './views/PageNotFound'
import editProfile from './views/EditProfile'
import editPartaker from './views/EditPartaker'
import editPassword from './views/EditPassword'

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
      path: '*',
      name: 'page-not-found',
      component: pageNotFound,
      meta: {
        Auth: false,
        title: 'La Pagina no existe'
      }
    },
    {
      path: '/',
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
      path: '/registrar',
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
      redirect: { name: 'home' },
      children: [
        {
          path: 'editar-participante',
          name: 'editar-participante',
          component: editPartaker,
          meta: {
            Auth: true,
            title: 'Editar participante'
          }
        },
        {
          path: 'editar-perfil',
          name: 'editar-perfil',
          component: editProfile,
          meta: {
            Auth: true,
            title: 'Editar Perfil'
          }
        },
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
            title: 'Aprobación de Entidad'
          }
        },
        {
          path: 'indicadores',
          name: 'indicadores',
          component: indicators,
          meta: {
            Auth: true,
            title: 'Indicadores'
          }
        },
        {
          path: 'inversion',
          name: 'inversion',
          component: inversion,
          meta: {
            Auth: true,
            title: 'Inversion'
          }
        },
        {
          path: 'tipo-de-inversion',
          name: 'tipo-de-inversion',
          component: typeInversion,
          meta: {
            Auth: true,
            title: 'Tipo de Inversión'
          }
        },
        {
          path: 'home',
          name: 'home',
          component: home,
          meta: {
            Auth: true,
            title: 'Inicio'
          }
        },
        {
          path: 'editar-contrasena',
          name: 'editar-contrasena',
          component: editPassword,
          meta: {
            Auth: true,
            title: 'Editar Contraseña'
          }
        }
      ]
    }
  ]
})
// gestion de cambios de ruta
router.beforeEach((to, from, next) => {
  document.title = to.meta.title + ' | EXE'
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
              console.log('administrador')
              next()
              break
            case 2 :
              // entidad
              store.dispatch('getEntity', response.decode.entity_id)
                .then(response => {
                  if (response.state === 2) {
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
          if (error.body.code === 'token_expired' || error.body.code === 'token_invalid') {
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

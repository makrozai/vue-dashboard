import Vue from 'vue'
import Vuex from 'vuex'
// import of vue resource
import VueResource from 'vue-resource'
Vue.use(VueResource)

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    logged: !!window.localStorage.getItem('_token'),
    navbarDrawer: {
      items: [
        {
          title: 'Entidad',
          icon: 'entity',
          link: 'entidad'
        },
        {
          title: 'Programa',
          icon: 'program',
          link: 'programa'
        },
        {
          title: 'Iniciativas',
          icon: 'init',
          link: 'perfil'
        }
      ],
      reports: [
        {
          title: 'Indicadores',
          icon: 'indicators',
          link: 'perfil'
        },
        {
          title: 'Inversión',
          icon: 'inversion',
          link: 'perfil'
        },
        {
          title: 'Tipo de inversión',
          icon: 'types',
          link: 'perfil'
        }
      ]
    }
  },
  getters: {

  },
  mutations: {
    // establece el usuario a traves del token jwt
    setUser (state, payload) {
      if (window.localStorage.getItem('_token')) {
        state.user = payload
        state.logged = true
      } else {
        state.logged = false
        state.user = null
      }
    },
    // establece el estado del usuario
    setLogged (state, logged) {
      state.logged = logged
    }
  },
  actions: {
    login (context, payload) {
      window.localStorage.setItem('_token', payload.data.token)
      // eslint-disable-next-line no-undef
      let jwtDecode = require('jwt-decode')
      let userId = jwtDecode(payload.data.token)

      // set de user -reemplazar por get user-
      let userData = {
        name: 'Combativa',
        status: 'Sin verificar'
      }
      context.commit('setUser', userData)
    },
    logout (context) {
      window.localStorage.removeItem('_token')
      context.commit('setUser')
    }
  }
})

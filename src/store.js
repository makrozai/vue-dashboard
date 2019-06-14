import Vue from 'vue'
import Vuex from 'vuex'

// import services
import authService from './services/auth'
import usersService from './services/users'
import entitiesService from './services/entities'
import partakersService from './services/partakers'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userSesion: {},
    alert: {},
    placeholderUser: {},
    placeholderEntity: {},
    placeholderPartaker: {},
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
    login (state) {
      state.logged = true
    },
    // establece el usuario a traves del token jwt
    getUser (state, payload) {
      if (window.localStorage.getItem('_token')) {
        state.user = payload
        state.logged = true
      } else {
        state.logged = false
        state.user = null
      }
    },
    // establece el estado del usuario
    setLogged (state) {
      state.logged = false
      state.user = {}
    },
    setUser (state, payload) {
      state.placeholderUser = payload
    },
    setEntity (state, payload) {
      state.placeholderEntity = payload
    },
    setPartaker (state, payload) {
      state.placeholderPartaker = payload
    },
    setAlert (state, payload) {
      state.alert = payload
    },
    authRegister (state, payload) {
      state.userSesion = payload
    }
  },
  actions: {
    getUser (context, payload) {
      if (!payload) {
        payload = window.localStorage.getItem('_token')
        // eslint-disable-next-line no-undef
        let jwtDecode = require('jwt-decode')
        payload = jwtDecode(payload).user_id
      }

      return new Promise((resolve, reject) => {
        usersService.get(payload)
          .then(response => {
            context.commit('getUser', response)
            resolve(response)
          })
      })
    },
    login (context, payload) {
      return new Promise((resolve, reject) => {
        authService.login(payload)
          .then(response => {
            context.commit('login')
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    logout (context) {
      window.localStorage.removeItem('_token')
      context.commit('setLogged')
    },
    setUser (context, payload) {
      return new Promise((resolve, reject) => {
        usersService.save(payload)
          .then(response => {
            context.commit('setUser', response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    setEntity (context, payload) {
      return new Promise((resolve, reject) => {
        entitiesService.set(payload)
          .then(response => {
            context.commit('setEntity', response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    setPartaker (context, payload) {
      return new Promise((resolve, reject) => {
        partakersService.set(payload)
          .then(response => {
            context.commit('setPartaker', response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    setAlert (context, payload) {
      context.commit('setAlert', payload)
    },
    authRegister (context, payload) {
      return new Promise((resolve, reject) => {
        authService.register(payload)
          .then(response => {
            context.commit('authRegister', payload)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
})

export default store

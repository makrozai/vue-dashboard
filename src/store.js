import Vue from 'vue'
import Vuex from 'vuex'

// import of vue resource
import VueResource from 'vue-resource'

// import services
import usersService from './services/users'

Vue.use(VueResource)
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
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
    // establece el usuario a traves del token jwt
    setLogin (state, payload) {
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
      // set de user -reemplazar por get user-
      let userData = {
        name: 'Combativa',
        status: 'no-valid',
        email: 'marco@localhost.com'
      }
      context.commit('setLogin', userData)
    },
    logout (context) {
      window.localStorage.removeItem('_token')
      context.commit('setLogged')
    },
    setUser (context, payload) {
      return new Promise((resolve, reject) => {
        usersService.set(payload)
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
        Vue.http.post('entities', payload)
          .then(response => {
            // enruta correctamente la entidad a la respuesta
            response = response.body.data.entity

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
        Vue.http.post('partakers', payload)
          .then(response => {
            // enruta correctamente la entidad a la respuesta
            response = response.body.data.partaker

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
    }
  }
})

export default store

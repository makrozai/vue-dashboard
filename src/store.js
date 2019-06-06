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
    setUser (state) {
      if (window.localStorage.getItem('_token')) {
        const token = window.localStorage.getItem('_token')
        // eslint-disable-next-line no-undef
        const jwtDecode = require('jwt-decode')
        state.user = jwtDecode(token)
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
      return new Promise((resolve, reject) => {
        Vue.http.post('login', payload)
          .then(user => {
            window.localStorage.setItem('_token', user.body.token)
            context.commit('setUser')
            resolve(user)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getAllTasks (context) {
      return new Promise((resolve, reject) => {
        Vue.http.get('tasks')
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    register (context, payload) {
      return new Promise((resolve, reject) => {
        Vue.http.post('register', { user: payload })
          .then(user => {
            resolve(user)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    updateProfile (context, payload) {
      return new Promise((resolve, reject) => {
        Vue.http.put('profile', { user: payload })
          .then(user => {
            window.localStorage.getItem('_token', user.body.token)
            context.commit('setUser')
            resolve(user)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    logout (context) {
      window.localStorage.removeItem('_token')
      context.commit('setUser')
    }
  }
})

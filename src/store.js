import Vue from 'vue'
import Vuex from 'vuex'

// import services
import authService from './services/auth'
import usersService from './services/users'
import entitiesService from './services/entities'
import partakersService from './services/partakers'
// import ubigeo service
import ubigeoService from './services/ubigeo'
import linesService from './services/lines'
import typeEntities from './services/typeEntities'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userSesion: {
      user: {},
      entity: {},
      partaker: {}
    },
    alert: {},
    recaptchaCode: '6LcPVqkUAAAAAGsjs7Vcn5iE5Z4uulpiFSXverbi',
    ubigeo: {
      regions: null,
      provinces: null,
      districts: null
    },
    lines: [],
    typeEntities: [],
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
    getTypeProvinces: (state) => (id) => {
      return state.ubigeo.provinces.filter(item => item.region_id === id)
    },
    getTypeDistricts: (state) => (id) => {
      return state.ubigeo.districts.filter(item => item.province_id === id)
    }
  },
  mutations: {
    login (state) {
      state.logged = true
    },
    // establece el usuario a traves del token jwt
    getUser (state, payload) {
      if (window.localStorage.getItem('_token')) {
        state.userSesion.user = payload
        state.logged = true
      } else {
        state.logged = false
        state.user = null
      }
    },
    getEntity (state, payload) {
      state.userSesion.entity = payload
    },
    getPartaker (state, payload) {
      state.userSesion.partaker = payload
    },
    // establece el estado del usuario
    setLogged (state) {
      state.logged = false
      state.user = {}
      state.alert = {}
      state.userSesion.user = {}
      state.userSesion.entity = {}
      state.userSesion.partaker = {}
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
    },
    getRegions (state, payload) {
      state.ubigeo.regions = payload
    },
    getProvinces (state, payload) {
      state.ubigeo.provinces = payload
    },
    getDistricts (state, payload) {
      state.ubigeo.districts = payload
    },
    getLines (state, payload) {
      state.lines = payload
    },
    getTypeEntities (state, payload) {
      state.typeEntities = payload
    }
  },
  actions: {
    getUser (context, payload) {
      let decodeUser = null
      if (!payload) {
        payload = window.localStorage.getItem('_token')
        // eslint-disable-next-line no-undef
        let jwtDecode = require('jwt-decode')
        decodeUser = jwtDecode(payload)
        payload = decodeUser.user_id
      }

      return new Promise((resolve, reject) => {
        usersService.get(payload)
          .then(response => {
            context.commit('getUser', response)
            resolve({ response: response, decode: decodeUser })
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getEntity (context, payload) {
      return new Promise((resolve, reject) => {
        entitiesService.get(payload)
          .then(response => {
            context.commit('getEntity', response)
            resolve(response)
          })
      })
    },
    getPartaker (context, payload) {
      return new Promise((resolve, reject) => {
        partakersService.get(payload)
          .then(response => {
            context.commit('getPartaker', response)
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
    },
    getRegions (context) {
      return new Promise((resolve, reject) => {
        ubigeoService.getRegions()
          .then(response => {
            context.commit('getRegions', response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getProvinces (context) {
      return new Promise((resolve, reject) => {
        ubigeoService.getProvinces()
          .then(response => {
            context.commit('getProvinces', response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getDistricts (context) {
      return new Promise((resolve, reject) => {
        ubigeoService.getDistricts()
          .then(response => {
            context.commit('getDistricts', response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getLines (context) {
      return new Promise((resolve, reject) => {
        linesService.get()
          .then(response => {
            context.commit('getLines', response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getTypeEntities (context) {
      return new Promise((resolve, reject) => {
        typeEntities.get()
          .then(response => {
            context.commit('getTypeEntities', response)
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

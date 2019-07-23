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
import typeEntitiesService from './services/typeEntities'
import typeProgramsService from './services/typePrograms'
import contactsService from './services/contacts'
import programsService from './services/programs'
import imagesService from './services/images'
import beneficiariesServices from './services/beneficiaries'
import typeBeneficiariesService from './services/typeBeneficiaries'
import initiativesService from './services/initiatives'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userSesion: {
      user: {},
      entity: {},
      partaker: {}
    },
    contacts: [],
    alert: {},
    recaptchaCode: '6LcPVqkUAAAAAGsjs7Vcn5iE5Z4uulpiFSXverbi',
    ubigeo: {
      regions: null,
      provinces: null,
      districts: null
    },
    lines: [],
    typeEntities: [],
    typePrograms: [],
    typeBeneficiaries: [],
    otherContact: {},
    image: null,
    placeholderUser: {},
    placeholderEntity: {},
    placeholderPartaker: {},
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
          link: 'iniciativa'
        }
      ],
      reports: [
        {
          title: 'Indicadores',
          icon: 'indicators',
          link: 'indicadores'
        },
        {
          title: 'Inversión',
          icon: 'inversion',
          link: 'inversion'
        },
        {
          title: 'Tipo de inversión',
          icon: 'types',
          link: 'tipo-de-inversion'
        }
      ]
    },
    allEntities: [],
    allPrograms: [],
    allInitiatives: [],
    recoverPass: null,
    website: 'https://exe.combativa.com/',
    preloadIframe: false,
    allBeneficiaries: [],
    settings: {
      iframeTG: 'https://exe.combativa.com/politicias-de-privacidad/?modal=99fe1294ecf6fd28741e231a21d5228f'
    }
  },
  getters: {
    getTypeProvinces: (state) => (id) => {
      return state.ubigeo.provinces.filter(item => item.region_id === id)
    },
    getTypeDistricts: (state) => (id) => {
      return state.ubigeo.districts.filter(item => item.province_id === id)
    },
    getOnlyEntity: (state) => (id) => {
      return state.allEntities.filter(item => item.id === id)[0]
    },
    getOnlyProgram: (state) => (id) => {
      return state.allPrograms.filter(item => item.id === id)[0]
    },
    getRegion: (state) => (id) => {
      return state.ubigeo.regions.filter(item => item.id === id)[0]
    },
    getProvince: (state) => (id) => {
      return state.ubigeo.provinces.filter(item => item.id === id)[0]
    },
    getDistrict: (state) => (id) => {
      return state.ubigeo.districts.filter(item => item.id === id)[0]
    },
    getTypeBeneficiary: (state) => (id) => {
      return state.typeBeneficiaries.filter(item => item.id === id)[0]
    },
    getOnlyTypeProgram: (state) => (id) => {
      return state.typePrograms.filter(item => item.id === id)[0]
    },
    getOnlyTypeEntity: (state) => (id) => {
      return state.typeEntities.filter(item => item.id === id)[0]
    },
    getOnlyLineEntity: (state) => (id) => {
      return state.lines.filter(item => item.id === id)[0]
    }
  },
  mutations: {
    changePreload (state, payload) {
      state.preloadIframe = payload
    },
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
      state.allEntities.push(payload)
    },
    validEntity (state, payload) {
      state.allEntities[payload.index] = payload.item
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
    authRecover (state, payload) {
      state.recoverPass = payload
    },
    authChange (state, payload) {
      state.recoverPass = payload
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
    },
    getTypePrograms (state, payload) {
      state.typePrograms = payload
    },
    setContact (state, payload) {
      state.contacts.push(payload)
    },
    getContactsByEntity (state, payload) {
      state.contacts = payload
    },
    saveImage (state, payload) {
      state.image = payload
    },
    deleteImage (state, payload) {
      state.image = null
    },
    setProgram (state, payload) {
      state.allPrograms.push(payload)
    },
    setAllEntities (state, payload) {
      state.allEntities = payload
    },
    setAllPrograms (state, payload) {
      state.allPrograms = payload
    },
    updateProgram (state, payload) {
      let dataIndex
      state.allPrograms.forEach((element, index) => {
        if (element.id === payload.id) {
          dataIndex = index
        }
      })
      // console.log('state',state.allPrograms[dataIndex])
      state.allPrograms[dataIndex] = payload
    },
    deleteProgram (state, payload) {
      state.allPrograms.splice(payload, 1)
    },
    setOtherContact (state, payload) {
      state.otherContact = payload
    },
    setAllBeneficiaries (state, payload) {
      state.allBeneficiaries = payload
    },
    setTypeBeneficiaries (state, payload) {
      state.typeBeneficiaries = payload
    },
    setBeneficiary (state, payload) {
      state.allBeneficiaries.push(payload)
    },
    updateBeneficiary (state, payload) {
      let dataIndex
      state.allBeneficiaries.forEach((element, index) => {
        if (element.id === payload.id) {
          dataIndex = index
        }
      })
      state.allBeneficiaries[dataIndex] = payload
    },
    setInitiative (state, payload) {
      state.allInitiatives.push(payload)
    },
    setAllInitiatives (state, payload) {
      state.allInitiatives = payload
    },
    updatePartaker (state, payload) {
      state.userSesion.partaker = payload
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
      return new Promise((resolve, reject) => {
        authService.logout()
          .then(response => {
            window.localStorage.removeItem('_token')
            context.commit('setLogged')
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
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
    authRecover (context, payload) {
      return new Promise((resolve, reject) => {
        authService.recover(payload)
          .then(response => {
            context.commit('authRecover', payload)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    authChange (context, payload) {
      return new Promise((resolve, reject) => {
        authService.change(payload)
          .then(response => {
            context.commit('authChange', payload)
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
    getTypeEntities (context, payload) {
      let dataFilters = ''
      if (payload) {
        dataFilters = Object.entries(payload)
          .map(pair => pair.map(encodeURIComponent).join('='))
          .join('&')
      }

      return new Promise((resolve, reject) => {
        typeEntitiesService.get(dataFilters)
          .then(response => {
            context.commit('getTypeEntities', response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getTypePrograms (context) {
      return new Promise((resolve, reject) => {
        typeProgramsService.get()
          .then(response => {
            context.commit('getTypePrograms', response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    putEntity (context, payload) {
      return new Promise((resolve, reject) => {
        entitiesService.put(payload)
          .then(response => {
            context.commit('getEntity', payload)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    validEntity (context, payload) {
      return new Promise((resolve, reject) => {
        entitiesService.put({ id: payload.item.id, state: payload.state })
          .then(response => {
            payload.item.state = payload.state
            context.commit('validEntity', payload.item)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getContactsByEntity (context, payload) {
      return new Promise((resolve, reject) => {
        contactsService.getByEntity(payload)
          .then(response => {
            context.commit('getContactsByEntity', response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    saveContact (context, payload) {
      return new Promise((resolve, reject) => {
        contactsService.save(payload)
          .then(response => {
            context.commit('setContact', response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    resetContacts (context, payload) {
      context.commit('getContactsByEntity', payload)
    },
    putContact (context, payload) {
      // debemos crear una funcion para limpiar antes los campos porque aqui estoy agregando y se duplican
      return new Promise((resolve, reject) => {
        contactsService.put(payload)
          .then(response => {
            context.commit('setContact', response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    saveImage (context, payload) {
      return new Promise((resolve, reject) => {
        imagesService.set(payload)
          .then(response => {
            context.commit('saveImage', response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    deleleImage (context, payload) {
      return new Promise((resolve, reject) => {
        imagesService.delete(payload)
          .then(response => {
            context.commit('deleteImage', response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    saveProgram (context, payload) {
      payload.start_date += '-01'
      return new Promise((resolve, reject) => {
        programsService.save(payload)
          .then(response => {
            context.commit('setProgram', response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    updateProgram (context, payload) {
      return new Promise((resolve, reject) => {
        let dataObject = Object.assign({}, payload)
        programsService.put(dataObject)
          .then(response => {
            context.commit('updateProgram', dataObject)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getAllEntities (context, payload) {
      let dataFilters = ''
      if (payload) {
        dataFilters = Object.entries(payload)
          .map(pair => pair.map(encodeURIComponent).join('='))
          .join('&')
      }

      return new Promise((resolve, reject) => {
        entitiesService.getAll(dataFilters)
          .then(response => {
            this.commit('setAllEntities', response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getAllPrograms (context, payload) {
      let dataFilters = ''
      if (payload) {
        dataFilters = Object.entries(payload)
          .map(pair => pair.map(encodeURIComponent).join('='))
          .join('&')
      }

      return new Promise((resolve, reject) => {
        programsService.getAll(dataFilters)
          .then(response => {
            this.commit('setAllPrograms', response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    deleteProgram (context, payload) {
      return new Promise((resolve, reject) => {
        programsService.delete(payload.id)
          .then(response => {
            this.commit('deleteProgram', payload.index)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    saveOtherContact (context, payload) {
      return new Promise((resolve, reject) => {
        contactsService.save(payload)
          .then(response => {
            context.commit('setOtherContact', response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getAllBeneficiaries (context, payload) {
      let dataFilters = ''
      if (payload) {
        dataFilters = Object.entries(payload)
          .map(pair => pair.map(encodeURIComponent).join('='))
          .join('&')
      }

      return new Promise((resolve, reject) => {
        beneficiariesServices.getAll(dataFilters)
          .then(response => {
            this.commit('setAllBeneficiaries', response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getTypeBeneficiaries (context, payload) {
      return new Promise((resolve, reject) => {
        typeBeneficiariesService.get()
          .then(response => {
            context.commit('setTypeBeneficiaries', response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    saveBeneficiary (context, payload) {
      return new Promise((resolve, reject) => {
        beneficiariesServices.save(payload)
          .then(response => {
            context.commit('setBeneficiary', payload)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    updateBeneficiary (context, payload) {
      return new Promise((resolve, reject) => {
        beneficiariesServices.update(payload)
          .then(response => {
            context.commit('updateBeneficiary', payload)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    saveInitiative (context, payload) {
      return new Promise((resolve, reject) => {
        initiativesService.save(payload)
          .then(response => {
            context.commit('setInitiative', payload)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getAllInitiatives (context, payload) {
      let dataFilters = ''
      if (payload) {
        dataFilters = Object.entries(payload)
          .map(pair => pair.map(encodeURIComponent).join('='))
          .join('&')
      }

      return new Promise((resolve, reject) => {
        initiativesService.getAll(dataFilters)
          .then(response => {
            this.commit('setAllInitiatives', response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    updatePartaker (context, payload) {
      return new Promise((resolve, reject) => {
        partakersService.put(payload)
          .then(response => {
            context.commit('updatePartaker', response)
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

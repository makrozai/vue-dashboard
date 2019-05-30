import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      socialRazon: '',
      comercialRazon: '',
      ruc: '',
      mail: '',
      password: '',
      phone: null
    },
    navbarDrawer: {
      items: [
        {
          title: 'Entidad',
          icon: 'dashboard',
          link: 'entidad'
        },
        {
          title: 'Programa',
          icon: 'dashboard',
          link: 'programa'
        },
        {
          title: 'Iniciativas',
          icon: 'question_answer',
          link: 'perfil'
        }
      ],
      reports: [
        {
          title: 'Indicadores',
          icon: 'dashboard',
          link: 'perfil'
        },
        {
          title: 'Inversión',
          icon: 'dashboard',
          link: 'perfil'
        },
        {
          title: 'Tipo de inversión',
          icon: 'dashboard',
          link: 'perfil'
        }
      ]
    }
  },
  getters: {

  },
  mutations: {

  },
  actions: {

  }
})

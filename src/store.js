import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      socialRazon: '',
      comercialRazon: '',
      ruc: '',
      mail:'',
      password:'',
      phone:null
    }
  },
  mutations: {

  },
  actions: {

  }
})

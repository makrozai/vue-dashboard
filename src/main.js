import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

// import of vee validate
import es from 'vee-validate/dist/locale/es'
import VeeValidate, { Validator } from 'vee-validate'

// import of vue resource
import VueResource from 'vue-resource'

// import of axios library
// import axios from 'axios'
// import VueAxios from 'vue-axios'
// Vue.use(VueAxios, axios)

Vue.use(VeeValidate)
Vue.use(VueResource)

Validator.localize('es', es)

Vue.config.productionTip = false

Vue.http.options.root = 'http://127.0.0.1:8000/api/v1/'
Vue.http.interceptors.push((request, next) => {
  request.headers.set('Authorization', `Bearer ${window.localStorage.getItem('_token')}`)
  next()
})

Vue.http.interceptors.push((request, next) => {
  store.commit('changePreload', true)
  next((response) => {
    store.commit('changePreload', false)
  })
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

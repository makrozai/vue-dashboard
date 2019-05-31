import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

// import of vee validate
import VeeValidate from 'vee-validate'

// import of vue resource
import VueResource from 'vue-resource'

// import of axios library
// import axios from 'axios'
// import VueAxios from 'vue-axios'
// Vue.use(VueAxios, axios)

Vue.use(VeeValidate)
Vue.use(VueResource)

Vue.config.productionTip = false

Vue.http.options.root = 'http://localhost:3002/api/'
Vue.http.interceptors.push((request, next) => {
  request.headers.set('Authorization', `Beader ${window.localStorage.getItem('_token')}`)
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'

Vue.http.options.root = 'http://127.0.0.1:8000/api/v1/'
Vue.http.interceptors.push((request, next) => {
  request.headers.set('Authorization', `Bearer ${window.localStorage.getItem('_token')}`)
  next()
})

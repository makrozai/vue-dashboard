import Vue from 'vue'
import store from './../store'

const authService = {
  login: (payload) => {
    return new Promise((resolve, reject) => {
      Vue.http.post('auth/login', payload)
        .then(user => {
          window.localStorage.setItem('_token', user.body.data.token)
          store.dispatch('getUser')
          resolve(user)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default authService

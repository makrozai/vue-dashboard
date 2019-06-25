import Vue from 'vue'

const authService = {
  login: (payload) => {
    return new Promise((resolve, reject) => {
      Vue.http.post('auth/login', payload)
        .then(response => {
          // guarda el token generado en localstorage
          window.localStorage.setItem('_token', response.body.data.token)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  register: (payload) => {
    return new Promise((resolve, reject) => {
      Vue.http.post('auth/register', payload)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  recover: (payload) => {
    return new Promise((resolve, reject) => {
      Vue.http.post('auth/recover-password', payload)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  change: (payload) => {
    return new Promise((resolve, reject) => {
      Vue.http.post('auth/recover-password/change-password', payload)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default authService

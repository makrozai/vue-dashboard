import Vue from 'vue'

const usersService = {
  save: (payload) => {
    return new Promise((resolve, reject) => {
      Vue.http.post('users', payload)
        .then(response => {
          // enruta correctamente el usuario a la respuesta
          response = response.body.data.user
          // retornna respuesta del usuario
          resolve(response)
        })
        .catch(error => {
          // retorna error de usuario
          reject(error)
        })
    })
  },
  get: (payload) => {
    return new Promise((resolve, reject) => {
      Vue.http.get(`users/${payload}`)
        .then(response => {
          // enruta correctamente el usuario a la respuesta
          response = response.body.data.user
          // retornna respuesta del usuario
          resolve(response)
        })
        .catch(error => {
          // retorna error de usuario
          reject(error)
        })
    })
  }
}

export default usersService

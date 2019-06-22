import Vue from 'vue'

const entitiesService = {
  set: (payload) => {
    return new Promise((resolve, reject) => {
      Vue.http.post('entities', payload)
        .then(response => {
          // enruta correctamente la entidad a la respuesta
          response = response.body.data.entity

          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  get: (payload) => {
    return new Promise((resolve, reject) => {
      Vue.http.get(`entities/${payload}`)
        .then(response => {
          // enruta correctamente el usuario a la respuesta
          response = response.body.data.entity
          // retornna respuesta del usuario
          resolve(response)
        })
        .catch(error => {
          // retorna error de usuario
          reject(error)
        })
    })
  },
  put: (payload) => {
    return new Promise((resolve, reject) => {
      Vue.http.put(`entities/${payload.id}`, payload)
        .then(response => {
          // enruta correctamente la entidad a la respuesta
          response = response.body.data.entity

          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  getAll: (payload) => {
    return new Promise((resolve, reject) => {
      Vue.http.get('entities')
        .then(response => {
          // enruta correctamente el usuario a la respuesta
          response = response.body.data.entities
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

export default entitiesService

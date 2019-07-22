import Vue from 'vue'

const entitiesService = {
  set: (payload) => {
    return new Promise((resolve, reject) => {
      Vue.http.post('entities', payload)
        .then(response => {
          // enruta correctamente la respuesta
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
          // enruta correctamente la respuesta
          response = response.body.data.entity
          // retornna respuesta
          resolve(response)
        })
        .catch(error => {
          // retorna error
          reject(error)
        })
    })
  },
  put: (payload) => {
    return new Promise((resolve, reject) => {
      Vue.http.put(`entities/${payload.id}`, payload)
        .then(response => {
          // enruta correctamente la respuesta
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
      Vue.http.get(`entities?${payload}`)
        .then(response => {
          // enruta correctamente la respuesta
          response = response.body.data.entities
          // retornna respuesta
          resolve(response)
        })
        .catch(error => {
          // retorna error
          reject(error)
        })
    })
  },
  count: () => {
    return new Promise((resolve, reject) => {
      Vue.http.get('entities/total')
        .then(response => {
          // enruta correctamente la respuesta
          response = response.body.data
          // retorna respuesta
          resolve(response)
        })
        .catch(error => {
          // retorna error
          reject(error)
        })
    })
  }
}

export default entitiesService

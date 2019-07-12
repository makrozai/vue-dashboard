import Vue from 'vue'

const partakersServices = {
  set: (payload) => {
    return new Promise((resolve, reject) => {
      Vue.http.post('partakers', payload)
        .then(response => {
          // enruta correctamente la entidad a la respuesta
          response = response.body.data.partaker

          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  get: (payload) => {
    return new Promise((resolve, reject) => {
      Vue.http.get(`partakers/${payload}`)
        .then(response => {
          // enruta correctamente el usuario a la respuesta
          response = response.body.data.partaker
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
      Vue.http.put(`partakers/${payload.id}`, payload)
        .then(response => {
          // enruta correctamente la entidad a la respuesta
          response = response.body.data.partaker

          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default partakersServices

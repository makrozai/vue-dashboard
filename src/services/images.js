import Vue from 'vue'

const imagesService = {
  set: (payload) => {
    return new Promise((resolve, reject) => {
      Vue.http.post('images', payload)
        .then(response => {
          // enruta correctamente la entidad a la respuesta
          response = response.body.data.image

          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  get: (payload) => {
    return new Promise((resolve, reject) => {
      Vue.http.get(`images/${payload}`)
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
  }
}

export default imagesService

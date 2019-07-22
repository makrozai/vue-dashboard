import Vue from 'vue'

const typeEntitiesService = {
  get: (payload) => {
    return new Promise((resolve, reject) => {
      Vue.http.get(`type-entities?${payload}`)
        .then(response => {
          // enruta correctamente a la respuesta
          response = response.body.data.type_entities
          // retornna respuesta
          resolve(response)
        })
        .catch(error => {
          // retorna error
          reject(error)
        })
    })
  }
}

export default typeEntitiesService

import Vue from 'vue'

const typeEntitiesService = {
  get: () => {
    return new Promise((resolve, reject) => {
      Vue.http.get('type-entities')
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

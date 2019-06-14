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
  }
}

export default entitiesService
import Vue from 'vue'

const initiativesService = {
  save: (payload) => {
    return new Promise((resolve, reject) => {
      Vue.http.post('initiatives', payload)
        .then(response => {
          // enruta correctamente a la respuesta
          response = response.body.data.initiative
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

export default initiativesService

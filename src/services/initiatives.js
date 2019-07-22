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
  },
  getAll: (payload) => {
    return new Promise((resolve, reject) => {
      Vue.http.get(`initiatives?${payload}`)
        .then(response => {
          // enruta correctamente a la respuesta
          response = response.body.data.initiatives
          // retorna respuesta
          resolve(response)
        })
        .catch(error => {
          // retornna error
          reject(error)
        })
    })
  },
  count: () => {
    return new Promise((resolve, reject) => {
      Vue.http.get('initiatives/total')
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

export default initiativesService

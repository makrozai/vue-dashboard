import Vue from 'vue'

const programsService = {
  save: (payload) => {
    return new Promise((resolve, reject) => {
      Vue.http.post('programs', payload)
        .then(response => {
          // enruta correctamente a la respuesta
          response = response.body.data.program
          // retorna respuesta
          resolve(response)
        })
        .catch(error => {
          // retornna error
          reject(error)
        })
    })
  },
  getAll: (payload) => {
    return new Promise((resolve, reject) => {
      Vue.http.get(`programs?${payload}`)
        .then(response => {
          // enruta correctamente a la respuesta
          response = response.body.data.programs
          // retorna respuesta
          resolve(response)
        })
        .catch(error => {
          // retornna error
          reject(error)
        })
    })
  },
  delete: (payload) => {
    return new Promise((resolve, reject) => {
      Vue.http.delete(`programs/${payload}`)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  put: (payload) => {
    console.log('ingresa al update service')
    return new Promise((resolve, reject) => {
      Vue.http.put(`programs/${payload.id}`, payload)
        .then(response => {
          response = response.body.data.program
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default programsService

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
    payload = Object.assign({}, payload)
    let arrayIds = []
    payload.entities.forEach(item => {
      arrayIds.push(item.id)
    })
    payload.entities = [...new Set(arrayIds)]

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
  },
  count: () => {
    return new Promise((resolve, reject) => {
      Vue.http.get('programs/total')
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

export default programsService

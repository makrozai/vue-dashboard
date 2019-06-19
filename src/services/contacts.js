import Vue from 'vue'

const contactsService = {
  save: (payload) => {
    return new Promise((resolve, reject) => {
      Vue.http.post('contacts', payload)
        .then(response => {
          // enruta correctamente a la respuesta
          response = response.body.data.contact
          // retorna respuesta
          resolve(response)
        })
        .catch(error => {
          // retornna error
          reject(error)
        })
    })
  },
  get: (payload) => {
    return new Promise((resolve, reject) => {
      Vue.http.get('contacts')
        .then(response => {
          // enruta correctamente a la respuesta
          response = response.body.data.contacts
          // retornna respuesta
          resolve(response)
        })
        .catch(error => {
          // retorna error
          reject(error)
        })
    })
  },
  getByEntity: (id) => {
    return new Promise((resolve, reject) => {
      Vue.http.get(`contacts?entity_id=${id}`)
        .then(response => {
          // enruta correctamente a la respuesta
          response = response.body.data.contacts
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
      Vue.http.put(`contacts/${payload.id}`, payload)
        .then(response => {
          // enruta correctamente la entidad a la respuesta
          response = response.body.data.contact

          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default contactsService

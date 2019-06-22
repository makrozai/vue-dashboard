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
  }
}

export default programsService

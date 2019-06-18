import Vue from 'vue'

const linesService = {
  get: () => {
    return new Promise((resolve, reject) => {
      Vue.http.get('lines')
        .then(response => {
          // enruta correctamente a la respuesta
          response = response.body.data.lines
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

export default linesService

import Vue from 'vue'

const typeProgramsService = {
  get: () => {
    return new Promise((resolve, reject) => {
      Vue.http.get('type-programs')
        .then(response => {
          // enruta correctamente a la respuesta
          response = response.body.data.type_programs
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

export default typeProgramsService

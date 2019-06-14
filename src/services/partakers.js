import Vue from 'vue'

const partakersServices = {
  set: (payload) => {
    return new Promise((resolve, reject) => {
      Vue.http.post('partakers', payload)
        .then(response => {
          // enruta correctamente la entidad a la respuesta
          response = response.body.data.partaker

          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default partakersServices

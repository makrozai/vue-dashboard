import Vue from 'vue'

const beneficiariesServices = {
  getAll: (payload) => {
    return new Promise((resolve, reject) => {
      Vue.http.get(`beneficiaries?${payload}`)
        .then(response => {
          // enruta correctamente a la respuesta
          response = response.body.data.beneficiaries
          // retornna respuesta
          resolve(response)
        })
        .catch(error => {
          // retorna error
          reject(error)
        })
    })
  },
  save: (payload) => {
    return new Promise((resolve, reject) => {
      Vue.http.post('beneficiaries', payload)
        .then(response => {
          // enruta correctamente a la respuesta
          response = response.body.data.beneficiary
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

export default beneficiariesServices

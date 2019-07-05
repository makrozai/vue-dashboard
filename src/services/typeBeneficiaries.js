import Vue from 'vue'

const typeBeneficiariesService = {
  get: () => {
    return new Promise((resolve, reject) => {
      Vue.http.get('type-beneficiaries')
        .then(response => {
          // enruta correctamente a la respuesta
          response = response.body.data.type_beneficiaries
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

export default typeBeneficiariesService

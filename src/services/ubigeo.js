import Vue from 'vue'

const ubigeoService = {
  getRegions: () => {
    return new Promise((resolve, reject) => {
      Vue.http.get('regions')
        .then(response => {
          // enruta correctamente a la respuesta
          response = response.body.data.regions
          // retornna respuesta
          resolve(response)
        })
        .catch(error => {
          // retorna error
          reject(error)
        })
    })
  },
  getProvinces: () => {
    return new Promise((resolve, reject) => {
      Vue.http.get('provinces')
        .then(response => {
          // enruta correctamente a la respuesta
          response = response.body.data.provinces
          // retornna respuesta
          resolve(response)
        })
        .catch(error => {
          // retorna error
          reject(error)
        })
    })
  },
  getDistricts: () => {
    return new Promise((resolve, reject) => {
      Vue.http.get('districts')
        .then(response => {
          // enruta correctamente a la respuesta
          response = response.body.data.districts
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

export default ubigeoService

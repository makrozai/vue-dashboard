const date = {}

function dateNoDay (date) {
  let dateNoFormat = date.split('-', 2)
  console.log(dateNoFormat)

  let arrayMonths = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

  return arrayMonths[ dateNoFormat[1] - 1 ] + ' del ' + dateNoFormat[0]
}

date.install = function (Vue) {
  Vue.filter('date-no-day', (val) => {
    return dateNoDay(val)
  })
}

export default date

import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

import es from 'vuetify/es5/locale/es'

Vue.use(Vuetify, {
  theme: {
    primary: '#81D7EA',
    secondary: '#FFDC6C',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  },
  options: {
    customProperties: true
  },
  iconfont: 'md',
  lang: {
    locales: { es },
    current: 'es'
  }
})

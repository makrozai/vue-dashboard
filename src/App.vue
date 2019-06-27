<template>
  <v-app>
    <transition>
      <div class="c-page-preload" v-show="preloadIframe">
        <v-progress-circular
          :size="70"
          :width="7"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>
    </transition>
    <v-content>

      <v-snackbar
        v-model="alert.state"
        :color="alert.type"
        :timeout="alert.time"
        right
        top
      >
        {{ alert.text }}
        <v-btn
          dark
          flat
          @click="setTimeVisible"
        >
          cerrar
        </v-btn>
      </v-snackbar>

      <transition>
        <router-view></router-view>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapState(['alert', 'preloadIframe'])
  },
  data () {
    return {
      alerTime: true
    }
  },
  mounted () {
  },
  methods: {
    ...mapActions(['setAlert']),
    setTimeVisible () {
      this.setAlert({})
    }
  }
}
</script>
<style lang="scss">
  @import './scss/global.scss';
</style>

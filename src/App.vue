<template>
  <v-app>
    <v-content>
      <v-alert
        v-model="alert.state"
        :dismissible="alert.dismissible"
        :type="alert.type"
        transition="scale-transition"
        class="c-global-alert"
      >
        {{ alert.text }}
      </v-alert>
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
    ...mapState(['alert'])
  },
  data () {
    return {
    }
  },
  watch: {
    alert: function (val) {
      if (val.time) {
        this.setTimeVisible(val.time)
      }
    }
  },
  methods: {
    ...mapActions(['setAlert']),
    setTimeVisible (time) {
      setTimeout(() => {
        this.setAlert({})
      }, time)
    }
  }
}
</script>
<style lang="scss">
  @import './scss/global.scss';
</style>

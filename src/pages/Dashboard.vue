<template>
  <v-layout
    fill-height="true"
    flex-start
  >
    <v-flex
      grow
      class="c-navbar__spacing"
      :class="{ 'active' : navbarStatus }"
    >
      <m-navigation @update-navbar="updateNavbar"></m-navigation>
    </v-flex>
    <v-flex
      xs12
    >
      <transition>
        <router-view/>
      </transition>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import MNavigation from '../components/navigation'
export default {
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      navbarStatus: false
    }
  },
  components: {
    MNavigation
  },
  created () {
    this.setAlert({
      text: 'Usuario no validado correctamente',
      state: true,
      dismissible: true,
      type: 'error'
    })
  },
  methods: {
    ...mapActions(['setAlert']),
    updateNavbar (response) {
      this.navbarStatus = response
    }
  }
}
</script>

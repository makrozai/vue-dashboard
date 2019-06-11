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
      <v-alert
        v-if="user.status == 'no-valid'"
        v-model="alert"
        type="error"
        class="mt-0"
      >
        El usuario aun no esta validado correctamente
      </v-alert>
      <transition>
        <router-view/>
      </transition>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import MNavigation from '../components/navigation'
export default {
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      alert: true,
      navbarStatus: false
    }
  },
  components: {
    MNavigation
  },
  methods: {
    updateNavbar (response) {
      this.navbarStatus = response
    }
  }
}
</script>

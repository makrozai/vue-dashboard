<template>
  <v-layout
    fill-height="true"
    flex-start
  >
    <v-flex
      shrink
      class="c-navbar__spacing"
      :class="{ 'active' : navbarStatus }"
    >
      <m-navigation @update-navbar="updateNavbar"></m-navigation>
    </v-flex>
    <v-flex
      grow
    >
      <v-alert
        v-model="alert"
        dismissible
        type="error"
        class="mt-0"
      >
        El usuario aun no esta validado correctamente
      </v-alert>
      <router-view/>
    </v-flex>
  </v-layout>
</template>

<script>
import MNavigation from '../components/navigation'
export default {
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

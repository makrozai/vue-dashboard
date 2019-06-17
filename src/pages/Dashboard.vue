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
  components: { MNavigation },
  computed: {
    ...mapState(['user', 'ubigeo'])
  },
  data () {
    return {
      navbarStatus: false
    }
  },
  created () {
    this.setAlert({
      text: 'Usuario no validado correctamente',
      state: true,
      dismissible: true,
      type: 'error'
    })


    if (!this.ubigeo.regions) {
      this.getRegions()
    }
    if (!this.ubigeo.provinces) {
      this.getProvinces()
    }
    if (!this.ubigeo.districts) {
      this.getDistricts()
    }
  },
  methods: {
    ...mapActions(['setAlert', 'getRegions', 'getProvinces', 'getDistricts']),
    updateNavbar (response) {
      this.navbarStatus = response
    }
  }
}
</script>

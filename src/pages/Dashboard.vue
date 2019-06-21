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
    ...mapState(['ubigeo'])
  },
  data () {
    return {
      navbarStatus: false
    }
  },
  created () {
    if (!this.ubigeo.regions) {
      this.getRegions()
    }
    if (!this.ubigeo.provinces) {
      this.getProvinces()
    }
    if (!this.ubigeo.districts) {
      this.getDistricts()
    }
    this.getLines()
    this.getTypeEntities()
    this.getTypePrograms()
  },
  methods: {
    ...mapActions(['getRegions', 'getProvinces', 'getDistricts', 'getLines', 'getTypeEntities', 'getTypePrograms']),
    updateNavbar (response) {
      this.navbarStatus = response
    }
  }
}
</script>

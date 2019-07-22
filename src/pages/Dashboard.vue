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
        :value="true"
        color="teal lighten-3"
        class="mt-0 center-align"
        v-if="userSesion.user.type_user_id === 2 && userSesion.entity.state === 2"
      >
        Completa tu ficha: es necesario completar los campos que seran validados para tener acceso total
      </v-alert>

      <router-view/>

    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import MNavigation from '../components/navigation'
export default {
  components: { MNavigation },
  computed: {
    ...mapState(['ubigeo', 'userSesion'])
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
    this.getTypeEntities({ with_total_entities: true })
    this.getTypePrograms()
    this.getTypeBeneficiaries()
  },
  methods: {
    ...mapActions(['getRegions', 'getProvinces', 'getDistricts', 'getLines', 'getTypeEntities', 'getTypePrograms', 'getTypeBeneficiaries']),
    updateNavbar (response) {
      this.navbarStatus = response
    }
  }
}
</script>

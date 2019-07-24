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
    ...mapState([
      'ubigeo',
      'userSesion',
      'lines',
      'typeEntities',
      'typePrograms',
      'typeBeneficiaries'
    ])
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
    if (this.lines.length === 0) {
      this.getLines()
    }
    if (this.typeEntities.length === 0) {
      this.getTypeEntities({ with_total_entities: true })
    }
    if (this.typePrograms.length === 0) {
      this.getTypePrograms()
    }
    if (this.typeBeneficiaries.length === 0) {
      this.getTypeBeneficiaries()
    }

    // -- get global data
    let filtersEntities = {}
    let filtersPrograms = {}
    let filterInitiatives = {}

    if (this.userSesion.user.type_user_id === 1) {
      filtersEntities = { with_contacts: true, state_in: '1,2,3,4' }
      filterInitiatives = { with_involveds: true }
    } else if (this.userSesion.user.type_user_id === 2) {
      filtersEntities = { with_contacts: true }
      filtersPrograms = { entity_id: this.userSesion.entity.id }
      filterInitiatives = { entity_id: this.userSesion.entity.id, with_involveds: true }
    }

    this.getAllEntities(filtersEntities)
      .then(response => {
        console.log('carga de entidades exitosa')
      })
      .catch(error => {
        console.log('error en carga de entidades', error)
      })

    this.getAllPrograms(filtersPrograms)
      .then(response => {
        console.log('carga de programas exitosa')
      })
      .catch(error => {
        console.log('error en carga de programas', error)
      })
    this.getAllInitiatives(filterInitiatives)
      .then(response => {
        console.log('carga de iniciativas exitosa')
      })
      .catch(error => {
        console.log('error en carga de iniciativas', error)
      })
  },
  methods: {
    ...mapActions([
      'getRegions',
      'getProvinces',
      'getDistricts',
      'getLines',
      'getTypeEntities',
      'getTypePrograms',
      'getTypeBeneficiaries',
      'getAllEntities',
      'getAllPrograms',
      'getAllInitiatives'
    ]),
    updateNavbar (response) {
      this.navbarStatus = response
    }
  }
}
</script>

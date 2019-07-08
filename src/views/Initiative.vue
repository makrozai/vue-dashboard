<template>
  <v-container class="c-container-dashboard">
    <v-layout
      wrap="true"
      justify-space-between
    >
      <v-flex
        xs12 md6 lg8
        class="c-dashboard-title"
      >
        <h2>iniciativa</h2>
      </v-flex>
      <v-flex
        xs12 md6 lg4
        class="c-dashboard-input"
      >
        <v-text-field
          box
          label=""
          prepend-inner-icon="search"
        ></v-text-field>
        <v-btn
          v-if="userSesion.user.type_user_id !== 3"
          fab
          color="primary"
          class="my-0 mr-0"
          @click.stop="formDrawner = !formDrawner"
        >
          <v-icon dark>add</v-icon>
        </v-btn>

      </v-flex>
      <v-flex
        xs12
        class="mt-2"
      >
        <m-programa-table></m-programa-table>
      </v-flex>

      <v-navigation-drawer
        v-model="formDrawner"
        temporary
        right
        fixed
        width="550"
      >
        <form-initiative class="u-form--white c-card-fixed"></form-initiative>
      </v-navigation-drawer>
    </v-layout>
  </v-container>
</template>

<script>
import FormInitiative from '../components/formInitiative'
import MProgramaTable from '../components/programaTable'

import { mapState } from 'vuex'

export default {
  components: { MProgramaTable, FormInitiative },
  computed: {
    ...mapState(['userSesion'])
  },
  data () {
    return {
      formDrawner: null
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

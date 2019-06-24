<template>
  <v-container class="c-container-dashboard">
    <v-layout
      wrap
      justify-space-between
    >
      <v-flex
        xs12 md6 lg8
        class="c-dashboard-title"
      >
        <h2>programa</h2>
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
        <form-program class="u-form--white"></form-program>
      </v-navigation-drawer>
    </v-layout>
  </v-container>
</template>

<script>
import FormProgram from '../components/formProgram'
import MProgramaTable from '../components/programaTable'

export default {
  components: { MProgramaTable, FormProgram },
  data () {
    return {
      formDrawner: null
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

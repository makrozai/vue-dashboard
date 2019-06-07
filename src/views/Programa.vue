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
        <v-list class="pa-1">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>John Leider</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

      </v-navigation-drawer>
    </v-layout>
  </v-container>
</template>

<script>
import MProgramaTable from '../components/programaTable'

export default {
  components: {
    MProgramaTable
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

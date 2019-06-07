<template>
  <v-container class="c-container-dashboard c-container-dashboard--small">
    <v-layout
      wrap="true"
      justify-space-between
    >
      <v-flex
        xs12
        class="c-dashboard-title"
      >
        <h2>Ficha de verificación de entidad</h2>
      </v-flex>
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

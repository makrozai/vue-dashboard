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
    <form class="c-verify-entity">
      <div class="c-verify-entity__row-small">

      </div>
      <div class="c-verify-entity__row-large">
        <v-layout wrap class="c-verify-entity__form">
          <v-flex xs12>
            <v-text-field
              v-model="razonComercial"
              v-validate="'required'"
              :error-messages="errors.collect('razonComercial')"
              label="Razón comercial o nombre de la organización"
              data-vv-name="razonComercial"
              required
              box
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md4>
            <v-text-field
                v-model="ruc"
                v-validate="'required|integer'"
                :error-messages="errors.collect('Ruc')"
                label="Ruc"
                data-vv-name="Ruc"
                required
                box
              ></v-text-field>
          </v-flex>
          <v-flex xs12 md8>
            <v-text-field
              v-model="razonSocial"
              v-validate="'required'"
              :error-messages="errors.collect('razonSocial')"
              label="Razón social"
              data-vv-name="razonSocial"
              required
              box
            ></v-text-field>
          </v-flex>
        </v-layout>
      </div>
    </form>
  </v-container>
</template>

<script>

export default {
  data () {
    return {
      ruc: '',
      razonSocial: '',
      razonComercial: ''
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

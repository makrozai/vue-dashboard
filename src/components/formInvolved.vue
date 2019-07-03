<template>
  <v-card class="c-form-involveds">
    <v-card-title>
      <h3>AGREGAR ENTIDAD COMPROMETIDA</h3>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-container grid-list-md class="py-0">
        <v-layout row wrap>
          <v-flex xs12>
            <v-text-field
              v-model="entity.name"
              label="Razón comercial"
              box
            ></v-text-field>
          </v-flex>
          <v-flex xs6>
            <v-text-field
              v-model="entity.social_reason"
              label="Razón social"
              box
            ></v-text-field>
          </v-flex>
          <v-flex xs6>
            <v-text-field
              v-model="entity.ruc"
              label="Ruc"
              box
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-tabs
              grow
              v-model="tab"
            >
              <v-tab>Donación</v-tab>
              <v-tab>Bienes</v-tab>
              <v-tab>Convenio</v-tab>
            </v-tabs>
          </v-flex>

          <v-flex xs12 class="mt-3">
            <v-tabs-items v-model="tab" class="c-form-involeds__tabs">
              <v-tab-item>
                <v-textarea
                  v-validate="'alpha_spaces'"
                  v-model="involeds.participations[0].description"
                  :error-messages="errors.collect('descripción de donación')"
                  data-vv-name="descripción de donación"
                  box
                  label="Descripción"
                ></v-textarea>
                <v-text-field
                  v-validate="'integer'"
                  v-model="involeds.participations[0].amount"
                  :error-messages="errors.collect('monto de donación')"
                  data-vv-name="monto de donación"
                  label="Monto"
                  box
                ></v-text-field>
              </v-tab-item>

              <v-tab-item>
                <v-textarea
                  v-validate="'alpha_spaces'"
                  v-model="involeds.participations[0].description"
                  :error-messages="errors.collect('descripción de bienes')"
                  data-vv-name="descripción de bienes"
                  box
                  label="Descripción"
                ></v-textarea>
                <v-text-field
                  v-validate="'integer'"
                  v-model="involeds.participations[0].amount"
                  :error-messages="errors.collect('monto de bienes')"
                  data-vv-name="monto de bienes"
                  label="Monto"
                  box
                ></v-text-field>
              </v-tab-item>

              <v-tab-item>
                <v-textarea
                  v-validate="'alpha_spaces'"
                  v-model="involeds.participations[0].description"
                  :error-messages="errors.collect('descripción de convenio')"
                  data-vv-name="descripción de convenio"
                  box
                  label="Descripción"
                ></v-textarea>
                <v-text-field
                  v-validate="'integer'"
                  v-model="involeds.participations[0].amount"
                  :error-messages="errors.collect('monto de convenio')"
                  data-vv-name="monto de convenio"
                  label="Monto"
                  box
                ></v-text-field>
              </v-tab-item>
            </v-tabs-items>
          </v-flex>
        </v-layout>
      </v-container>

    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-container class="py-1">
        <v-btn color="primary" @click="addInvolveds=false">Registrar</v-btn>
        <v-btn @click="addInvolveds=false">Cerrar</v-btn>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['entity'],
  data () {
    return {
      tab: null,
      involeds: {
        entity_id: null,
        participations: [
          {
            "type": 1,
            "description": "",
            "amount": null
          },
          {
            "type": 2,
            "description": "",
            "amount": null
          },
          {
            "type": 3,
            "description": "",
            "amount": null
          }
        ]
      }
    }
  },
  watch: {
  },
  created () {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>

</style>

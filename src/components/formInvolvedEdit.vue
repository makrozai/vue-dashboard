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
              v-validate="'required|max:180'"
              :disabled="bloquedEntity"
              v-model="entity.name"
              maxlength="180"
              label="Razón comercial"
              :error-messages="errors.collect('razón comercial involucrado')"
              data-vv-name="razón comercial involucrado"
              required
              box
            ></v-text-field>
          </v-flex>
          <v-flex xs6>
            <v-text-field
              v-validate="'required|max:180'"
              :disabled="bloquedEntity"
              v-model="involeds.social_reason"
              maxlength="180"
              label="Razón social"
              :error-messages="errors.collect('razón social involucrado')"
              data-vv-name="razón social involucrado"
              required
              box
            ></v-text-field>
          </v-flex>
          <v-flex xs6>
            <v-text-field
              v-validate="'required|integer|length:11'"
              :disabled="bloquedEntity"
              v-model="entity.ruc"
              maxlength="11"
              label="Ruc"
              :error-messages="errors.collect('ruc involucrado')"
              data-vv-name="ruc involucrado"
              required
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
                  v-model="involeds.participations[1].description"
                  :error-messages="errors.collect('descripción de bienes')"
                  data-vv-name="descripción de bienes"
                  box
                  label="Descripción"
                ></v-textarea>
                <v-text-field
                  v-validate="'integer'"
                  v-model="involeds.participations[1].amount"
                  :error-messages="errors.collect('monto de bienes')"
                  data-vv-name="monto de bienes"
                  label="Monto"
                  box
                ></v-text-field>
              </v-tab-item>

              <v-tab-item>
                <v-textarea
                  v-model="involeds.participations[2].description"
                  :error-messages="errors.collect('descripción de convenio')"
                  data-vv-name="descripción de convenio"
                  box
                  label="Descripción"
                ></v-textarea>
                <v-text-field
                  v-validate="'integer'"
                  v-model="involeds.participations[2].amount"
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
        <v-btn color="primary" @click="submit">Registrar</v-btn>
        <v-btn @click="close">Cerrar</v-btn>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  props: ['entity'],
  computed: {
    ...mapState(['allEntities']),
    ...mapGetters(['getOnlyEntity'])
  },
  data () {
    return {
      bloquedEntity: false,
      tab: null,
      involeds: {
        id: null,
        entity_id: null,
        name: '',
        social_reason: '',
        ruc: null,
        state: 2,
        participations: [
          {
            title: 'Donación o auspicio',
            type: 1,
            description: '',
            amount: null
          },
          {
            title: 'Bienes y servicios',
            type: 2,
            description: '',
            amount: null
          },
          {
            title: 'Convenio',
            type: 3,
            description: '',
            amount: null
          }
        ]
      }
    }
  },
  watch: {
    entity (value) {
      this.completeValue(value)
    }
  },
  created () {
    this.completeValue(this.entity)
  },
  methods: {
    submit () {
      this.$validator.validateAll()
        .then(result => {
          if (result) {

          }
        })
    },
    validParticipations (value) {
      let arrayParticipations = []
      this.involeds.participations.forEach(element => {
        if (element.description && element.amount) {
          arrayParticipations.push(element)
        }
      })
      return arrayParticipations
    },
    close () {
      this.$emit('modal-close', false)
    },
    completeValue (entities) {
      let entityData = this.getOnlyEntity(entities.entity_id)
      this.involeds.name = entityData.name
      this.involeds.social_reason = entityData.social_reason
      this.involeds.ruc = entityData.ruc

      this.involeds.participations.forEach((involed, index) => {
        entities.participations.forEach(entity => {
          if (involed.type === entity.type) {
            this.involeds.participations[index].description = entity.description
            this.involeds.participations[index].amount = entity.amount
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

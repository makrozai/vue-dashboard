<template>
  <v-card class="c-form-involveds">
    <v-card-title>
      <h3>AGREGAR BENEFICIARO</h3>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-container grid-list-md class="pb-0">
        <v-layout row wrap>
          <v-flex xs12>
            <v-select
              v-model="beneficiary.type_beneficiary_id"
              v-validate="'required'"
              :items="typeBeneficiaries"
              item-text="name"
              item-value="id"
              :error-messages="errors.collect('tipo de beneficiario')"
              data-vv-name="tipo de beneficiario"
              label="Tipo de beneficiarios"
              required
              box
            ></v-select>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              v-model="beneficiary.name"
              v-validate="'required'"
              :error-messages="errors.collect('nombre de beneficiado')"
              label="Nombre de Beneficiado"
              data-vv-name="nombre de beneficiado"
              required
              box
            ></v-text-field>
          </v-flex>
          <v-flex xs6>
            <v-select
              v-model="beneficiary.region_id"
              v-validate="'required'"
              :items="ubigeo.regions"
              item-text="name"
              item-value="id"
              :error-messages="errors.collect('departamento')"
              data-vv-name="departamento"
              label="Departamento"
              required
              box
            ></v-select>
          </v-flex>
          <v-flex xs6>
            <v-select
              v-model="beneficiary.province_id"
              v-validate="'required'"
              :items="getTypeProvinces(beneficiary.region_id)"
              item-text="name"
              item-value="id"
              :error-messages="errors.collect('provincia')"
              data-vv-name="provincia"
              label="Provincia"
              required
              box
            ></v-select>
          </v-flex>
          <v-flex xs12>
            <v-select
              v-model="beneficiary.district_id"
              v-validate="'required'"
              :items="getTypeDistricts(beneficiary.province_id)"
              item-text="name"
              item-value="id"
              :error-messages="errors.collect('distrito')"
              data-vv-name="distrito"
              label="Distrito"
              required
              box
            ></v-select>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-container class="py-0">
        <v-btn large color="primary" @click="submit">Guardar</v-btn>
        <v-btn @click="close">Cerrar</v-btn>
      </v-container>

    </v-card-actions>
   </v-card>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  props: ['entity'],
  computed: {
    ...mapState(['typeBeneficiaries', 'ubigeo']),
    ...mapGetters(['getTypeProvinces', 'getTypeDistricts'])
  },
  data () {
    return {
      beneficiary: {
        id: null,
        type_beneficiary_id: null,
        region_id: null,
        province_id: null,
        district_id: null,
        name: ''
      }
    }
  },
  watch: {
    entity (value) {
      this.beneficiary = value
    }
  },
  created () {
    this.beneficiary = this.entity
  },
  methods: {
    ...mapActions(['saveBeneficiary', 'getAllBeneficiaries', 'updateBeneficiary']),
    submit () {
      this.$validator.validateAll()
        .then(result => {
          if (result) {
            this.updateBeneficiary(this.beneficiary)
              .then(response => {
                this.$emit('beneficiary', response)
              })
              .catch(error => {
                console.log(error)
              })
          } else {
            console.log('los datos no estan validados')
          }
        })
    },
    close () {
      this.$emit('modal-close', false)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

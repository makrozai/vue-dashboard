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
              :error-messages="errors.collect('nombre de entidad')"
              label="Nombre de Entidad"
              data-vv-name="nombre de entidad"
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
      </v-container>

    </v-card-actions>
   </v-card>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  props: ['beneficiary'],
  computed: {
    ...mapState(['typeBeneficiaries', 'ubigeo']),
    ...mapGetters(['getTypeProvinces', 'getTypeDistricts'])
  },
  data () {
    return {
      beneficiary: {
        type_beneficiary_id: null,
        region_id: null,
        province_id: null,
        district_id: null,
        name: ''
      }
    }
  },
  methods: {
    ...mapActions(['saveBeneficiary', 'getAllBeneficiaries']),
    submit () {
      this.$validator.validateAll()
        .then(result => {
          if (result) {
            this.saveBeneficiary(this.beneficiary)
              .then(response => {
                this.$emit('beneficiary', response)
                this.resetForm()
              })
              .catch(error => {
                console.log(error)
              })
          } else {
            console.log('los datos no estan validados')
          }
        })
    },
    resetForm () {
      this.beneficiary.type_beneficiary_id = null
      this.beneficiary.region_id = null
      this.beneficiary.province_id = null
      this.beneficiary.district_id = null
      this.beneficiary.name = ''
      this.$validator.reset()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

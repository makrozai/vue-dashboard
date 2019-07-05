<template>
  <v-card class="c-form-involveds">
    <v-card-title>
      <h3>AGREGAR BENEFICIARO</h3>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-container grid-list-md class="py-0">
        <v-layout row wrap>
          <v-flex xs12>
            <v-select
              v-model="beneficiarie.type_beneficiary_id"
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
              v-model="beneficiarie.name"
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
              v-model="beneficiarie.region_id"
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
              v-model="beneficiarie.province_id"
              v-validate="'required'"
              :items="getTypeProvinces(beneficiarie.region_id)"
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
              v-model="beneficiarie.district_id"
              v-validate="'required'"
              :items="getTypeDistricts(beneficiarie.province_id)"
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
   </v-card>
</template>

<script>
import { mapState,mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState(['typeBeneficiaries','ubigeo']),
    ...mapGetters(['getTypeProvinces','getTypeDistricts'])
  },
  data () {
    return {
      beneficiarie: {
        type_beneficiary_id: null,
        region_id: null,
        province_id: null,
        district_id: null,
        name: ''
      }
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>

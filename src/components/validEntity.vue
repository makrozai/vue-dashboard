<template>
  <v-card class="c-form-program">
    <v-card-title>
      <v-container class="py-0">
        <h2>ENTIDAD</h2>

        <v-text-field
          disabled
          v-model="fullName"
          label="Empresa u operador (creadora de la iniciativa)"
          required
          box
          class="none-errors pt-2"
        ></v-text-field>
      </v-container>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="c-valid-entity">
      <v-container grid-list-md >
        <v-layout wrap>
          <v-flex xs12>
            <h3>Información general</h3>
            <p>la entidad requiere una validación de parte del administrador</p>
          </v-flex>
          <v-flex xs8>
            <v-text-field
              disabled
              v-model="entity.social_reason"
              label="Razón social"
              box
            ></v-text-field>
            <v-text-field
              disabled
              v-model="entity.line_id"
              label="Tipo de rubro"
              box
            ></v-text-field>
          </v-flex>
          <v-flex xs4>
            <img :src="entity.logo_image_link || require('../assets/default-img.svg')" alt="">
          </v-flex>
          <v-flex xs12>
            <v-text-field
              disabled
              v-model="entity.type_entity_id"
              label="Tipo de entidad"
              box
            ></v-text-field>

          </v-flex>
          <v-flex xs12>
            <v-text-field
              disabled
              v-model="entity.website"
              label="Sitio web"
              box
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-textarea
                disabled
                v-model="addressComplete"
                label="Dirección"
                box
              ></v-textarea>
          </v-flex>
          <v-flex xs12>
            <h3>Informacion de usuario</h3>
            <p>informacion principal de la cuenta(no informacion de contacto)</p>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              disabled
              v-model="entity.main_phone"
              label="Numero de teléfono"
              box
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-container class="py-0">
        <v-btn
          large
          color="success"
          @click="submit"
          :disabled="entity.state == 1"
        >
          Validar
        </v-btn>
      </v-container>
    </v-card-actions>
  </v-card>

</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: ['entity'],
  computed: {
    ...mapState(['allEntities', 'ubigeo']),
    fullName () {
      let namePlaceholder = 'RUC ' + this.entity.ruc + ' ' + this.entity.name

      return namePlaceholder.toUpperCase()
    },
    addressComplete () {
      let districtLabel = this.ubigeo.districts.filter(item => item.id === this.entity.districts_id)[0]
      let provinceLabel = this.ubigeo.provinces.filter(item => item.id === this.entity.provinces_id)[0]
      let regionLabel = this.ubigeo.regions.filter(item => item.id === this.entity.regions_id)[0]

      return this.entity.address + ' - ' + districtLabel.name + ', ' + provinceLabel.name + ' | ' + regionLabel.name
    }
  },
  methods: {
    ...mapActions(['putEntity']),
    submit () {
      console.log('validado', this.entity.id)
      this.putEntity({ id: this.entity.id, state: 1 })
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

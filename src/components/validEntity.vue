<template>
  <v-card class="c-form-program c-card-fixed u-form--white">
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
              v-model="entity.item.social_reason"
              label="Razón social"
              box
            ></v-text-field>
            <v-text-field
              disabled
              v-model="typeLine"
              label="Tipo de rubro"
              box
            ></v-text-field>
          </v-flex>
          <v-flex xs4>
            <img :src="entity.item.logo_image_link || require('../assets/default-img.svg')" alt="">
          </v-flex>
          <v-flex xs12>
            <v-text-field
              disabled
              v-model="typeEntity"
              label="Tipo de entidad"
              box
            ></v-text-field>

          </v-flex>
          <v-flex xs12>
            <v-text-field
              disabled
              v-model="entity.item.website"
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
              v-model="entity.item.main_phone"
              label="Numero de teléfono"
              box
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-container class="py-0">
        <v-btn
          :disabled="entity.item.state == 1"
          large
          color="success"
          @click="submit(1)"
        >
          {{ textButton }}
        </v-btn>
        <v-btn
          :disabled="entity.item.state == 3"
          large
          color="error"
          @click="submit(3)"
        >
          Rechazar
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
    ...mapState(['allEntities', 'ubigeo', 'typeEntities', 'lines']),
    fullName () {
      let namePlaceholder = 'RUC ' + this.entity.item.ruc + ' ' + this.entity.item.name

      return namePlaceholder.toUpperCase()
    },
    addressComplete () {
      let districtLabel = this.ubigeo.districts.filter(item => item.id === this.entity.item.districts_id)[0] || ''
      let provinceLabel = this.ubigeo.provinces.filter(item => item.id === this.entity.item.provinces_id)[0] || ''
      let regionLabel = this.ubigeo.regions.filter(item => item.id === this.entity.item.regions_id)[0] || ''

      if (this.entity.address) {
        return this.entity.address + ' - ' + districtLabel.name + ', ' + provinceLabel.name + ' | ' + regionLabel.name
      }
      return districtLabel.name + ', ' + provinceLabel.name + ' | ' + regionLabel.name
    },
    typeEntity () {
      if (this.entity.item.line_id) {
        let nameEntity = this.typeEntities.filter(item => item.id === this.entity.item.type_entity_id)[0]
        return nameEntity.name
      }
      return 'no selecionó tipo de entidad'
    },
    typeLine () {
      if (this.entity.item.line_id) {
        let nameLine = this.lines.filter(item => item.id === this.entity.item.line_id)[0]
        return nameLine.name
      }
      return 'no seleccionó rubro'
    }
  },
  data () {
    return {
      textButton: 'Validar',
      valid: false
    }
  },
  mounted () {
    let fixedCard = document.querySelector('.c-card-fixed')
    let fixedCardTitle = fixedCard.querySelector('.v-card__title').clientHeight
    let fixedCardAction = fixedCard.querySelector('.v-card__actions').clientHeight
    let fixedCardText = fixedCard.querySelector('.v-card__text')

    // define la altura del contenedor
    fixedCardText.style.height = window.innerHeight - fixedCardTitle - fixedCardAction + 'px'
    // agrega marginTop al contendor
    fixedCardText.style.marginTop = fixedCardTitle + 'px'
    // agrega marginBottom al contenedor
    fixedCardText.style.marginBottom = fixedCardAction + 'px'
  },
  methods: {
    ...mapActions(['validEntity', 'getAllEntities']),
    submit (status) {
      this.validEntity({ state: status, index: this.entity.index, item: this.entity.item })
        .then(response => {
          // esto de aca no se puede quedar asi
          this.textButton = 'Validado'

          this.$emit('response-valid', status)
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

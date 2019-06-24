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
    <v-card-text>
      <v-container grid-list-md >
        <v-layout wrap>
          <v-flex xs8>
            <v-text-field
              disabled
              v-model="entity.social_reason"
              label="Razón social"
              box
            ></v-text-field>
          </v-flex>
          <v-flex xs4>
            <img :src="entity.logo_image_link || require('../assets/default-img.svg')" alt="">
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>

</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props:['entity'],
  computed: {
    ...mapState(['allEntities']),
    fullName (){
      var namePlaceholder = 'RUC ' + this.entity.ruc + ' ' + this.entity.name
      return namePlaceholder.toUpperCase()
    }
  },
  /*created () {
    console.log(this.entity)
    console.log(this.allEntities.filter(item => item.id === this.entity))
  },*/
  data () {
    return {
      valueEntity : {}
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

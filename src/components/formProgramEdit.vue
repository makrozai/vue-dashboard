<template>
    <v-card class="c-form-program">
      <v-card-title>
        <v-container class="py-0">
          <h2>PROGRAMA</h2>

          <v-text-field
            disabled
            v-model="entityFullName"
            v-validate="'required'"
            :error-messages="errors.collect('empresa creadora')"
            label="Empresa u operador (creadora de la iniciativa)"
            data-vv-name="empresa creadora"
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
            <!--@ tab select type program-->

            <!--@ program form-->

            <!--@ select entities in group program-->
            <template v-if="program.category == 2">

              <v-flex xs12>
                <h3>Entidades parte del programa :</h3>
                <p>grupo de entidades comprometidas</p>
              </v-flex>

              <v-flex xs12 class="px-4">
                <!--@ contenedor de programas-->
                  <card-entity :entities="program.entities" only-remove ></card-entity>
                  <!--@ contenedor de programas-->
              </v-flex>
            </template>
            <!--@ select entities in group program-->

            <!--@ program information-->
            <v-flex xs8>
              <v-text-field
                disabled
                v-model="program.name"
                label="Nombre de programa"
                box
              ></v-text-field>
              <v-select
                disabled
                v-model="program.type_program_id"
                :items="typePrograms"
                item-text="name"
                item-value="id"
                label="Seleccionar el tipo de programa"
                required
                box
              ></v-select>

              <v-text-field
                disabled
                v-model="program.start_date"
                label="Nombre de programa"
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <img :src="program.logo_image_link || require('../assets/default-img.svg')" alt="">
              <p class="center-align pt-3">Imagen del programa</p>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                disabled
                v-model="program.description"
                label="Descripción del programa"
                data-vv-name="descripción  del programa"
                box
              ></v-textarea>
            </v-flex>
            <v-flex xs12>
              <h3>Tipo de servicio :</h3>
              <p>formación para el trabajo</p>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                disabled
                v-model="program.website"
                label="Pagina web"
                box
              >
                <i slot="append-outer" class="icon-home"></i>
              </v-text-field>
            </v-flex>
            <!--@ program information-->

            <!--@ social inputs -->
            <v-flex xs6>
              <v-text-field
                disabled
                v-model="program.twitter"
                label="Twitter"
                box
              >
                <i slot="append-outer" class="icon-twitter"></i>
              </v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                disabled
                v-model="program.facebook"
                label="Facebook"
                box
              >
                <i slot="append-outer" class="icon-facebook"></i>
              </v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                disabled
                v-model="program.youtube"
                label="Youtube"
                box
              >
                <i slot="append-outer" class="icon-youtube"></i>
              </v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                disabled
                v-model="program.instagram"
                label="Intagram"
                box
              >
                <i slot="append-outer" class="icon-instagram"></i>
              </v-text-field>
            </v-flex>
            <!--@ social inputs -->

            <!--@ program form-->
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import CardEntity from './cardEntity'

export default {
  props: ['program'],
  components: { CardEntity },
  computed: {
    ...mapState(['userSesion', 'typePrograms', 'allEntities']),
    entityFullName () {
      let fullname = 'no existe entidad asociada'
      if (this.program.entities[0]) {
        fullname = 'RUC ' + this.program.entities[0].ruc + ' ' + this.program.entities[0].name
      }

      return fullname.toUpperCase()
    }
  },
  data () {
    return {
      // placeholder
      entityModel: null,
      dialog: false
    }
  },
  watch: {
    dateStartModal (value) {
      value && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  created () {
  },
  methods: {
    ...mapActions(['saveProgram', 'getAllEntities'])
  }
}
</script>

<style lang="scss" scoped>
  img{
    display: block;
    width: 100%;
  }
</style>

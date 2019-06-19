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
            <v-flex xs12>
              <h3>¿El programa es propio?</h3>
            </v-flex>
            <v-flex xs6>
              <div
                class="c-program-type"
                :class="type_program == 'propio' ? 'active':''"
                @click="changeTypeProgram('propio')"
              >
                <i class="icon-huella"></i>
                <p>
                  Propia<br>
                  El programa es de mi propia autoria como Entidad y esta registrada
                </p>
              </div>
            </v-flex>
            <v-flex xs6 class="mb-4">
              <div
                class="c-program-type"
                :class="type_program == 'convenio' ? 'active':''"
                @click="changeTypeProgram('convenio')"
              >
                <i class="icon-archivo"></i>
                <p>
                  En convenio<br>
                  El programa le pertenece a un grupo de Entidades
                </p>
              </div>
            </v-flex>
            <!--@ tab select type program-->

            <!--@ formulario de programa-->
            <template v-if="type_program == 'convenio'">
              <v-flex xs10>
                <v-combobox
                  v-model="entityModel"
                  :items="people"
                  label="Buscar entidad propietaria del programa"
                  item-text="name"
                  item-value="name"
                  box
                >
                  <template v-slot:item="data">
                    <v-list-tile-avatar>
                      <img :src="data.item.avatar">
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                      <v-list-tile-sub-title v-html="data.item.group"></v-list-tile-sub-title>
                    </v-list-tile-content>
                  </template>
                </v-combobox>

              </v-flex>
              <v-flex xs2 class="text-xs-center pt-2">
                <v-btn fab small color="primary" @click="addEntityGroup">
                  <v-icon dark>add</v-icon>
                </v-btn>
              </v-flex>
              <v-flex xs12>
                <!--@ contenedor de programas-->
                  <div class="c-verify-entity__add-program">
                    <div class="c-verify-entity__add-program__item" v-for="(entity, index) in entitiesPlaceholder" :key="index">
                      <img :src="entity.image" alt="">
                      <div class="information">
                        <p>{{ entity.name }} {{ index }}</p>
                        <span>{{ entity.from.day }} {{ entity.from.mounth }} {{ entity.from.year }} hasta la actualidad</span>
                      </div>
                      <v-btn
                        fab
                        small
                        outline
                        color="error"
                        @click="removeProgram(index)"
                      >
                        <v-icon dark>remove</v-icon>
                      </v-btn>
                    </div>
                  </div>
                  <!--@ contenedor de programas-->
              </v-flex>
            </template>

            <v-flex xs8>
              <v-text-field
                v-model="programOwn.name"
                v-validate="'required'"
                :error-messages="errors.collect('nombre de programa')"
                label="Nombre de programa"
                data-vv-name="nombre de programa"
                required
                box
              ></v-text-field>
              <v-select
                v-model="programOwn.type_program"
                :items="typeLines"
                v-validate="'required'"
                :error-messages="errors.collect('tipo de programa')"
                label="Seleccionar el tipo de programa"
                data-vv-name="tipo de programa"
                required
                box
              ></v-select>
              <v-text-field
                v-model="programOwn.year_start"
                v-validate="'required'"
                :error-messages="errors.collect('año de inicio')"
                label="Año de inicio"
                data-vv-name="año de inicio"
                required
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <label class="c-verify-entity__upload c-verify-entity__upload--large">
                <img :src="fileImage" alt="">
                <p>Formato válido (jpg, png), máximo 20MB</p>
                <input type="file" name="" @change="updateLocal" ref="myFiles">
              </label>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                v-model="programOwn.description"
                v-validate="'alpha|required'"
                :error-messages="errors.collect('descripción  del programa')"
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
                v-model="programOwn.website"
                v-validate="'required'"
                :error-messages="errors.collect('sitio web')"
                data-vv-name="sitio web"
                label="Pagina web"
                box
              >
                <i slot="append-outer" class="icon-home"></i>
              </v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                v-model="programOwn.social.twitter"
                v-validate="'required'"
                :error-messages="errors.collect('twitter')"
                data-vv-name="twitter"
                label="Twitter"
                box
              >
                <i slot="append-outer" class="icon-twitter"></i>
              </v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field

                v-model="programOwn.social.facebook"
                v-validate="'required'"
                :error-messages="errors.collect('facebook')"
                data-vv-name="facebook"
                label="Facebook"
                box
              >
                <i slot="append-outer" class="icon-facebook"></i>
              </v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                v-model="programOwn.social.youtube"
                v-validate="'required'"
                :error-messages="errors.collect('youtube')"
                data-vv-name="youtube"
                label="Youtube"
                box
              >
                <i slot="append-outer" class="icon-youtube"></i>
              </v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                v-model="programOwn.social.instagram"
                v-validate="'required'"
                :error-messages="errors.collect('instagram')"
                data-vv-name="instagram"
                label="Intagram"
                box
              >
                <i slot="append-outer" class="icon-instagram"></i>
              </v-text-field>
            </v-flex>

            <!--<v-flex xs12 class="mt-4">
              <form-program-own v-if="program.type == 'propio'" :submit="stateSubmit"></form-program-own>
              <form-program-group v-if="program.type == 'convenio'"></form-program-group>
            </v-flex>-->
            <!--@ formulario de programa-->
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
import { mapState } from 'vuex'
import formProgramGroup from './formProgramGroup'
import formProgramOwn from './formProgramOwn'

export default {
  components: { formProgramOwn, formProgramGroup },
  computed: {
    ...mapState(['userSesion']),
    entityFullName () {
      let fullname = 'RUC ' + this.userSesion.entity.ruc + ' ' + this.userSesion.entity.name
      return fullname.toUpperCase()
    }
  },
  data () {
    return {
      stateSubmit: false,
      type_program: 'convenio',
      programOwn: {
        name: '',
        type_program: null,
        year_start: null,
        description: null,
        website: '',
        social: {
          twitter: '',
          facebook: '',
          youtube: '',
          instagram: ''
        }
      },
      // placeholder
      fileImage: require('../assets/default-img.svg'),
      typeLines: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      people: [
        { name: 'Sandra Adams', group: 'Group 1', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
        { name: 'Ali Connors', group: 'Group 1', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { name: 'Trevor Hansen', group: 'Group 1', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { name: 'Tucker Smith', group: 'Group 1', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { name: 'Britta Holt', group: 'Group 1', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
        { name: 'Jane Smith ', group: 'Group 1', avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg' },
        { name: 'John Smith', group: 'Group 1', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
        { name: 'Sandra Williams', group: 'Group 1', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' }
      ],
      entitiesPlaceholder: [
        {
          id: 1,
          // eslint-disable-next-line
          image: require('../assets/default-img.svg'),
          name: 'Proyecto de educación APC',
          from: {
            day: 3,
            mounth: 'Febrero',
            year: 2017
          },
          to: {
            day: 3,
            mounth: 'Febrero',
            year: 2017
          }
        }
      ],
      entityModel: null,
      isEditing: true,
    }
  },
  methods: {
    changeTypeProgram (type) {
      this.type_program = type
    },
    formData (response) {
      console.log(response)
    },
    submit() {
      this.stateSubmit = !this.stateSubmit
      console.log(this.stateSubmit)
    },
    updateLocal () {
      console.log(this.$refs.myFiles.files[0])
      const file = this.$refs.myFiles.files[0]
      this.fileImage = URL.createObjectURL(file)
    },
    addEntityGroup () {
      console.log(this.entityModel)
      // this.programs.push(entityModel)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

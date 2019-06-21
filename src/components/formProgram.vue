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
                :class="programOwn.category == 1 ? 'active':''"
                @click="programOwn.category = 1"
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
                :class="programOwn.category == 2 ? 'active':''"
                @click="programOwn.category = 2"
              >
                <i class="icon-archivo"></i>
                <p>
                  En convenio<br>
                  El programa le pertenece a un grupo de Entidades
                </p>
              </div>
            </v-flex>
            <!--@ tab select type program-->

            <!--@ program form-->

            <!--@ select entities in group program-->
            <template v-if="programOwn.category == 2">
              <v-flex xs12 class="c-input__button-action">
                <v-combobox
                  v-model="entityModel"
                  :items="people"
                  label="Buscar entidad propietaria del programa"
                  item-text="name"
                  item-value="name"
                  class="pt-2"
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
                <v-btn fab small color="primary" @click="addEntityGroup">
                  <v-icon dark>add</v-icon>
                </v-btn>
              </v-flex>

              <v-flex xs12>
                <!--@ contenedor de programas-->
                  <card-entity :entities="programOwn.entities" only-remove class="mb-4"></card-entity>
                  <!--@ contenedor de programas-->
              </v-flex>
            </template>
            <!--@ select entities in group program-->

            <!--@ program information-->
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
                v-model="programOwn.type_program_id"
                :items="typePrograms"
                item-text="name"
                item-value="id"
                v-validate="'required'"
                :error-messages="errors.collect('tipo de programa')"
                label="Seleccionar el tipo de programa"
                data-vv-name="tipo de programa"
                required
                box
              ></v-select>

              <v-dialog
                ref="dialog"
                v-model="dateStartModal"
                :return-value.sync="programOwn.start_date"
                lazy
                full-width
                width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="programOwn.start_date"
                    v-validate="'required'"
                    :error-messages="errors.collect('año de inicio')"
                    label="Año de inicio"
                    data-vv-name="año de inicio"
                    required
                    readonly
                    box
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  ref="picker"
                  v-model="programOwn.start_date"
                  type="month"
                  locale="es"
                  :max="new Date().toISOString().substr(0, 10)"
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="dateStartModal = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.dialog.save(programOwn.start_date)">OK</v-btn>
                </v-date-picker>
              </v-dialog>
            </v-flex>
            <v-flex xs4>
              <upload-image
                @image-resolve="uploadImage"
              ></upload-image>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                v-model="programOwn.description"
                v-validate="'required'"
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
            <!--@ program information-->

            <!--@ social inputs -->
            <v-flex xs6>
              <v-text-field
                v-model="programOwn.twitter"
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

                v-model="programOwn.facebook"
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
                v-model="programOwn.youtube"
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
                v-model="programOwn.instagram"
                v-validate="'required'"
                :error-messages="errors.collect('instagram')"
                data-vv-name="instagram"
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
import UploadImage from './uploadImage'
import CardEntity from './cardEntity'

export default {
  components: { UploadImage, CardEntity },
  computed: {
    ...mapState(['userSesion','typePrograms']),
    entityFullName () {
      let fullname = 'RUC ' + this.userSesion.entity.ruc + ' ' + this.userSesion.entity.name
      return fullname.toUpperCase()
    }
  },
  data () {
    return {
      dateStartModal: false,
      programOwn: {
        category: 1,
        image: null,
        name: '',
        type_program_id: null,
        start_date: new Date().toISOString().substr(0, 7),
        description: null,
        website: '',
        twitter: '',
        facebook: '',
        youtube: '',
        instagram: '',
        entities: [
          {
            id: 1,
            // eslint-disable-next-line
            image: require('../assets/default-img.svg'),
            name: 'Proyecto de educación APC',
            ruc: 13213123211
          }
        ]
      },
      // placeholder
      // eslint-disable-next-line
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
      isEditing: true
    }
  },
  watch: {
    dateStartModal (value) {
      value && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  methods: {
    formData (response) {
      console.log(response)
    },
    submit () {
      this.$validator.validateAll()
        .then(result => {
          if (result) {
            console.log('hello')
            console.log(this.programOwn)
          } else {
            console.log('bye')
          }
        })
    },
    updateLocal () {
      console.log(this.$refs.myFiles.files[0])
      const file = this.$refs.myFiles.files[0]
      this.fileImage = URL.createObjectURL(file)
    },
    addEntityGroup () {
      console.log(this.entityModel)
      // this.programs.push(entityModel)
    },
    uploadImage (image) {
      this.programOwn.image = image
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

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
                  :items="allEntities"
                  label="Buscar entidad propietaria del programa"
                  item-text="name"
                  item-value="name"
                  @keyup.enter="submit"
                  class="pt-2"
                  box
                >
                  <template v-slot:item="data">
                    <v-list-tile-avatar>
                      <img :src="data.item.logo_image_link || require('./../assets/default-img.svg')">
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                      <v-list-tile-sub-title v-html="data.item.ruc"></v-list-tile-sub-title>
                    </v-list-tile-content>
                  </template>
                </v-combobox>
                <v-btn fab small color="primary" @click="addEntityGroup">
                  <v-icon dark>add</v-icon>
                </v-btn>
              </v-flex>

              <v-flex xs12>
                <!--@ contenedor de programas-->
                  <card-entity :entities="programOwn.entities" only-remove ></card-entity>
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
                @keyup.enter="submit"
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
                @keyup.enter="submit"
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
                    @keyup.enter="submit"
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
                type="program_logo"
              ></upload-image>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                v-model="programOwn.description"
                v-validate="'required'"
                :error-messages="errors.collect('descripción  del programa')"
                label="Descripción del programa"
                data-vv-name="descripción  del programa"
                @keyup.enter="submit"
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
                @keyup.enter="submit"
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
                :error-messages="errors.collect('twitter')"
                data-vv-name="twitter"
                @keyup.enter="submit"
                label="Twitter"
                box
              >
                <i slot="append-outer" class="icon-twitter"></i>
              </v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field

                v-model="programOwn.facebook"
                :error-messages="errors.collect('facebook')"
                data-vv-name="facebook"
                @keyup.enter="submit"
                label="Facebook"
                box
              >
                <i slot="append-outer" class="icon-facebook"></i>
              </v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                v-model="programOwn.youtube"
                :error-messages="errors.collect('youtube')"
                data-vv-name="youtube"
                @keyup.enter="submit"
                label="Youtube"
                box
              >
                <i slot="append-outer" class="icon-youtube"></i>
              </v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                v-model="programOwn.instagram"
                :error-messages="errors.collect('instagram')"
                data-vv-name="instagram"
                @keyup.enter="submit"
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

      <v-dialog v-model="dialog" max-width="500px" scrollable>
        <form-register-contact @entity="addOtherEntity"></form-register-contact>
      </v-dialog>
    </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import UploadImage from './uploadImage'
import CardEntity from './cardEntity'
import FormRegisterContact from './formRegisterContact'

export default {
  components: { UploadImage, CardEntity, FormRegisterContact },
  computed: {
    ...mapState(['userSesion', 'typePrograms', 'allEntities']),
    entityFullName () {
      let fullname = 'RUC ' + this.userSesion.entity.ruc + ' ' + this.userSesion.entity.name
      return fullname.toUpperCase()
    }
  },
  data () {
    return {
      dateStartModal: false,
      programOwn: {
        owner_id: null,
        category: 1,
        logo_image_id: null,
        name: '',
        type_program_id: null,
        start_date: new Date().toISOString().substr(0, 7),
        description: null,
        website: '',
        twitter: '',
        facebook: '',
        youtube: '',
        instagram: '',
        entities: []
      },
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
    this.programOwn.owner_id = this.userSesion.entity.id

    if (this.allEntities.length === 0) {
      this.getAllEntities()
    }
  },
  methods: {
    ...mapActions(['saveProgram', 'getAllEntities']),
    submit () {
      this.$validator.validateAll()
        .then(result => {
          if (result) {
            console.log('formulario enviado correctamente')
            if (this.programOwn.entities.length > 1) {
              this.programOwn.entities = this.getArrayByObjs(this.programOwn.entities)
            }
            this.programOwn.entities.push(this.userSesion.entity.id)
            this.programOwn.entities = [...new Set(this.programOwn.entities)]

            console.log(this.programOwn)
            this.saveProgram(this.programOwn)
              .then(response => {
                this.resetFields()
                this.$emit('modal-state', false)
              })
              .catch(error => {
                console.log(error)
              })
          } else {
            console.log('formulario invalido revise los campos')
          }
        })
    },
    addEntityGroup () {
      console.log(this.entityModel)
      if (typeof this.entityModel === 'object' && this.entityModel) {
        this.programOwn.entities.push(this.entityModel)
        console.log('se guardo')
        this.entityModel = null
      } else {
        console.log('se abrira el modal')
        this.dialog = true
      }

      // this.programs.push(entityModel)
    },
    addOtherEntity (value) {
      this.programOwn.entities.push(value)
      this.dialog = false
    },
    uploadImage (image) {
      this.programOwn.logo_image_id = image
    },
    getArrayByObjs (objResolve) {
      let arrayIds = []
      objResolve.forEach(item => {
        console.log(item)
        arrayIds.push(item.id)
      })
      return arrayIds
    },
    resetFields () {
      this.programOwn.owner_id = null
      this.programOwn.category = 1
      this.programOwn.logo_image_id = null
      this.programOwn.name = ''
      this.programOwn.type_program_id = null
      this.programOwn.start_date = new Date().toISOString().substr(0, 7)
      this.programOwn.description = null
      this.programOwn.website = ''
      this.programOwn.twitter = ''
      this.programOwn.facebook = ''
      this.programOwn.youtube = ''
      this.programOwn.instagram = ''
      this.programOwn.entities = []
      this.$validator.reset()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

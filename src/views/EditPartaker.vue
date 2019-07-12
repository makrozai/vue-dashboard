<template>
  <v-container class="c-container-dashboard c-container-dashboard--small">
    <v-layout
      wrap="true"
      justify-space-between
    >
      <v-flex
        xs12
        class="c-dashboard-title mb-4"
      >
        <h2>Actualizar perfil</h2>
      </v-flex>
    </v-layout>
    <form class="c-verify-entity ">
      <div class="c-verify-entity__row mb-5 c-verify-entity--main">
        <div class="c-verify-entity__row-small">
          <upload-image
            @image-resolve="uploadImage"
            @image-url="changeImageLink"
            :image="{url: partaker.logo_image_link, id: partaker.logo_image_id}"
            type="entity_logo"
          ></upload-image>
        </div>
        <div class="c-verify-entity__row-large">
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field
                :disabled="loadingSubmit"
                v-model="partaker.name"
                v-validate="'required|alpha_spaces|max:60'"
                maxlength="60"
                :error-messages="errors.collect('nombre')"
                label="Nombre"
                data-vv-name="nombre"
                @keyup.enter="submit"
                required
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                :disabled="loadingSubmit"
                v-model="partaker.lastname"
                v-validate="'required|alpha_spaces|max:60'"
                maxlength="60"
                :error-messages="errors.collect('apellidos')"
                label="Apellidos"
                data-vv-name="apellidos"
                @keyup.enter="submit"
                required
                box
              ></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-radio-group
                :disabled="loadingSubmit"
                v-validate="'required'"
                :error-messages="errors.collect('Tipo de identidad')"
                data-vv-name="Tipo de identidad"
                @keyup.enter="submit"
                v-model="partaker.type_doc"
                :mandatory="false"
                required
                class="c-register__particular__radio"
              >
                <v-radio label="DNI" value="DNI" color="primary"></v-radio>
                <v-radio label="Doc. Extranjería" value="DEX" color="primary"></v-radio>
              </v-radio-group>
            </v-flex>

            <v-flex xs12 md6>
              <v-text-field
                :disabled="loadingSubmit"
                v-model="partaker.nro_doc"
                v-validate="'required|integer|max:12'"
                maxlength="12"
                :error-messages="errors.collect('Documento de identidad')"
                label="Nº Documento de identidad"
                data-vv-name="Documento de identidad"
                @keyup.enter="submit"
                required
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field
                :disabled="loadingSubmit"
                v-model="partaker.phone"
                v-validate="'required|integer|max:12'"
                maxlength="12"
                :error-messages="errors.collect('Nº Celular')"
                label="Nº Celular"
                data-vv-name="Nº Celular"
                @keyup.enter="submit"
                required
                box
              ></v-text-field>
            </v-flex>
          </v-layout>

          <v-btn
            :disabled="loadingSubmit"
            :color="statusSubmit"
            large
            class="c-verify-entity__submit mt-4"
            @click="submit"
          >
            Actualizar
            <v-progress-circular
              indeterminate
              color="gray"
              class="ml-4"
              v-if="loadingSubmit"
            ></v-progress-circular>
          </v-btn>
        </div>
      </div>

      <span class="c-verify-entity__spacer"></span>

    </form>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import UploadImage from '../components/uploadImage'

export default {
  components: { UploadImage },
  computed: {
    ...mapState(['userSesion'])
  },
  data () {
    return {
      partaker: {
        id: null,
        logo_image_id: null,
        logo_image_link: null,
        name: '',
        lastname: '',
        type_doc: '',
        phone: ''
      },
      loadingSubmit: false,
      statusSubmit: 'primary'
    }
  },
  created () {
    Object.assign(this.partaker, this.userSesion.partaker)
  },
  methods: {
    ...mapActions(['image', 'setAlert', 'updatePartaker']),
    uploadImage (image) {
      this.entity.logo_image_id = image
    },
    changeImageLink (image) {
      this.entity.logo_image_link = image
    },
    submit () {
      this.loadingSubmit = true

      this.$validator.validateAll()
        .then(result => {
          if (result) {
            this.updatePartaker(this.partaker)
              .then(response => {
                console.log(response)
                this.loadingSubmit = false
                this.statusSubmit = 'success'

                this.setAlert({
                  text: 'Verifica correctamente los campos',
                  state: true,
                  dismissible: false,
                  type: 'success',
                  time: 4000
                })
              })
              .catch(error => {
                this.setAlert({
                  text: error.message,
                  state: true,
                  dismissible: false,
                  type: 'error',
                  time: 4000
                })
              })
          } else {
            this.loadingSubmit = false
            this.statusSubmit = 'error'

            this.setAlert({
              text: 'Verifica correctamente los campos',
              state: true,
              dismissible: false,
              type: 'error',
              time: 4000
            })
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

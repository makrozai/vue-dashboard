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
        <h2>Ficha de verificación de entidad</h2>
      </v-flex>
    </v-layout>
    <form class="c-verify-entity">
      <div class="c-verify-entity__row mb-5">
        <div class="c-verify-entity__row-small">
          <upload-image
            @image-resolve="uploadImage"
            :image="{url: entity.logo_image_link, id: entity.logo_image_id}"
            type="entity_logo"
          ></upload-image>
        </div>
        <div class="c-verify-entity__row-large">
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field
                :disabled="loadingSubmit"
                v-model="entity.name"
                v-validate="'required|max:180'"
                maxlength="180"
                :error-messages="errors.collect('razón comercial')"
                label="Razón comercial o nombre de la organización"
                data-vv-name="razón comercial"
                @keyup.enter="submit"
                required
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md4>
              <v-text-field
                :disabled="loadingSubmit"
                v-model="entity.ruc"
                v-validate="'required|integer|length:11'"
                maxlength="11"
                :error-messages="errors.collect('ruc')"
                label="Ruc"
                data-vv-name="ruc"
                @keyup.enter="submit"
                required
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md8>
              <v-text-field
                :disabled="loadingSubmit"
                v-model="entity.social_reason"
                v-validate="'required|max:180'"
                maxlength="180"
                :error-messages="errors.collect('razón social')"
                label="Razón social"
                data-vv-name="razón social"
                @keyup.enter="submit"
                required
                box
              ></v-text-field>
            </v-flex>
          </v-layout>
        </div>
      </div>

      <span class="c-verify-entity__spacer"></span>

      <!--@ informacion de entidad-->
      <div class="c-verify-entity__row">
        <div class="c-verify-entity__row-small">
          <div class="c-verify-entity__section complete">
            <span>1</span>
          </div>
        </div>
        <div class="c-verify-entity__row-large">
          <v-layout wrap>
            <v-flex xs12>
              <h3 class="c-verify-entity__title">Información de la entidad</h3>
            </v-flex>
            <v-flex xs12>
              <v-select
                :disabled="loadingSubmit"
                v-if="lines"
                v-model="entity.line_id"
                :items="lines"
                item-text="name"
                item-value="id"
                v-validate="'required|integer'"
                :error-messages="errors.collect('tipo de rubro')"
                label="Seleccione tipo de rubro"
                data-vv-name="tipo de rubro"
                required
                box
              ></v-select>
            </v-flex>
            <v-flex xs12>
              <v-select
                :disabled="loadingSubmit"
                v-if="typeEntities"
                v-model="entity.type_entity_id"
                :items="typeEntities"
                item-text="name"
                item-value="id"
                v-validate="'required|integer'"
                :error-messages="errors.collect('tipo de entidad')"
                label="Tipo de entidad"
                data-vv-name="tipo de entidad"
                required
                box
              ></v-select>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                :disabled="loadingSubmit"
                v-model="entity.website"
                v-validate="'required|max:90'"
                maxlength="90"
                :error-messages="errors.collect('sitio web')"
                label="Sitio web"
                data-vv-name="sitio web"
                @keyup.enter="submit"
                required
                box
              ></v-text-field>
            </v-flex>
            <div class="c-verify-entity__inputs-equals">
              <v-flex xs6>
                <v-textarea
                  :disabled="loadingSubmit"
                  v-model="entity.address"
                  v-validate="'required'"
                  :error-messages="errors.collect('dirección')"
                  data-vv-name="dirección"
                  @keyup.enter="submit"
                  label="Dirección de oficina"
                  required
                  box
                ></v-textarea>
              </v-flex>
              <v-flex xs6>
                <v-select
                  :disabled="loadingSubmit"
                  v-if="ubigeo.regions"
                  v-model="entity.regions_id"
                  :items="ubigeo.regions"
                  item-text="name"
                  item-value="id"
                  @change="selectRegion"
                  v-validate="'required'"
                  :error-messages="errors.collect('departamento')"
                  label="Seleccione departamento"
                  data-vv-name="departamento"
                  required
                  box
                ></v-select>
                <v-select
                  :disabled="loadingSubmit"
                  v-if="ubigeoPrepare.provinces"
                  v-model="entity.provinces_id"
                  :items="ubigeoPrepare.provinces"
                  item-text="name"
                  item-value="id"
                  @change="selectProvince"
                  v-validate="'required'"
                  :error-messages="errors.collect('provincia')"
                  label="Seleccione provincia"
                  data-vv-name="provincia"
                  required
                  box
                ></v-select>
                <v-select
                  :disabled="loadingSubmit"
                  v-if="ubigeoPrepare.districts && ubigeo.districts"
                  v-model="entity.districts_id"
                  :items="ubigeoPrepare.districts"
                  item-text="name"
                  item-value="id"
                  v-validate="'required'"
                  :error-messages="errors.collect('distrito')"
                  label="Seleccione distrito"
                  data-vv-name="distrito"
                  required
                  box
                ></v-select>
              </v-flex>
            </div>
          </v-layout>
        </div>
      </div>
      <!--@ informacion de entidad-->

      <!--@ informacion de contacto-->
      <div class="c-verify-entity__row">
        <div class="c-verify-entity__row-small">
          <div class="c-verify-entity__section">
            <span>2</span>
          </div>
        </div>
        <div class="c-verify-entity__row-large">
          <h3 class="c-verify-entity__title">Información contacto directo con Empresarios por la educación</h3>

          <v-layout wrap v-for="(perfil, index) in perfilContact" :key="index">
            <v-flex xs12 class="mt-4" v-if="index > 0">
              <h3 class="c-verify-entity__subtitle">Información del contacto {{ index + 1 }}</h3>
              <v-divider class="mt-3 mb-4"></v-divider>
            </v-flex>
            <v-flex xs12 md7>
              <v-text-field
                :disabled="loadingSubmit"
                v-model="perfil.name"
                v-validate="'required'"
                maxlength="100"
                :error-messages="errors.collect(getNameSpace('nombre',index))"
                label="Nombre Completo"
                :data-vv-name="getNameSpace('nombre',index)"
                @keyup.enter="submit"
                required
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md5>
              <v-text-field
                :disabled="loadingSubmit"
                v-model="perfil.lastname"
                v-validate="'required'"
                maxlength="100"
                :error-messages="errors.collect(getNameSpace('apellido',index))"
                label="Apellido"
                :data-vv-name="getNameSpace('apellido',index)"
                @keyup.enter="submit"
                required
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md7>
              <v-text-field
                :disabled="loadingSubmit"
                v-model="perfil.position"
                v-validate="'required'"
                maxlength="150"
                :error-messages="errors.collect(getNameSpace('posición',index))"
                label="cargo"
                :data-vv-name="getNameSpace('posición',index)"
                @keyup.enter="submit"
                required
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md5>
              <v-text-field
                :disabled="loadingSubmit"
                v-model="perfil.nro_doc"
                v-validate="'required|integer'"
                maxlength="12"
                :error-messages="errors.collect(getNameSpace('dni',index))"
                label="DNI"
                :data-vv-name="getNameSpace('dni',index)"
                required
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <p class="c-verify-entity__subtitle">Indícanos datos de contacto para la validación y contacto de la cuenta</p>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                :disabled="loadingSubmit"
                v-model="perfil.email"
                v-validate="'required|email'"
                maxlength="150"
                :error-messages="errors.collect(getNameSpace('email',index))"
                label="Correo electrónico"
                :data-vv-name="getNameSpace('email',index)"
                @keyup.enter="submit"
                required
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                :disabled="loadingSubmit"
                v-model="perfil.cellphone"
                v-validate="'required|integer'"
                maxlength="11"
                :error-messages="errors.collect(getNameSpace('celular',index))"
                label="Nº Celular"
                :data-vv-name="getNameSpace('celular',index)"
                @keyup.enter="submit"
                required
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md7>
              <v-text-field
                :disabled="loadingSubmit"
                v-model="perfil.phone"
                v-validate="'required|integer'"
                maxlength="11"
                :error-messages="errors.collect(getNameSpace('teléfono',index))"
                label="Nº Fijo"
                :data-vv-name="getNameSpace('teléfono',index)"
                @keyup.enter="submit"
                required
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md5>
              <v-text-field
                :disabled="loadingSubmit"
                v-model="perfil.anexo"
                v-validate="'required|integer'"
                maxlength="10"
                :error-messages="errors.collect(getNameSpace('anexo',index))"
                label="Anexo"
                :data-vv-name="getNameSpace('anexo',index)"
                @keyup.enter="submit"
                required
                box
              ></v-text-field>
            </v-flex>
          </v-layout>
          <div class="c-verify-entity__add-contact" v-if="perfilContact.length < 2">
            <v-btn fab dark  color="primary" @click="addContact">
              <v-icon dark>add</v-icon>
            </v-btn>
            <span>Agregar otro contacto</span>
          </div>

        </div>
      </div>
      <!--@ informacion de contacto-->

      <!--@ registro de programa-->
      <div class="c-verify-entity__row">
        <div class="c-verify-entity__row-small">
          <div class="c-verify-entity__section">
            <span>3</span>
          </div>
        </div>
        <div class="c-verify-entity__row-large">
          <h3 class="c-verify-entity__title">Programas</h3>
          <p class="c-verify-entity__subtitle">Ingresa mínimo un programa</p>

          <span class="c-verify-entity__span">Entidades beneficiadas</span>
          <!--@ contenedor de programas-->
          <div class="c-verify-entity__add-program">
            <div class="c-verify-entity__add-program__item" v-for="(program, index) in userSesion.entity.programs" :key="index">
              <img :src="program.logo_image_link || require('../assets/default-img.svg')" alt="">
              <div class="information">
                <p>{{ program.name }} {{ index }}</p>
                <span>{{ program.start_date }} hasta la actualidad</span>
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
          <div class="c-verify-entity__add-contact">
            <v-btn fab color="primary" @click="dialog = true">
              <v-icon>add</v-icon>
            </v-btn>
            <span>Agregar otro contacto</span>
          </div>

        </div>
      </div>

      <v-dialog v-model="dialog" max-width="600px" scrollable>
        <form-program @modal-state="changeActivityModal"></form-program>
      </v-dialog>
      <!--@ registro de programa-->

      <!--@ terminos y condiciones-->
      <div class="c-verify-entity__row">
        <div class="c-verify-entity__row-small">
          <div class="c-verify-entity__section c-verify-entity__section--final">
            <span>4</span>
          </div>
        </div>
        <div class="c-verify-entity__row-large">
          <h3 class="c-verify-entity__title">Confirmación y protección de datos</h3>

          <v-radio-group
            :disabled="loadingSubmit"
            v-model="entity.conditions"
            class="c-verify-entity__radios"
            v-validate="'required'"
            :error-messages="errors.collect('terminos y condiciones')"
            data-vv-name="terminos y condiciones"
            required
          >
            <v-radio value="accept" color="primary">
              <template v-slot:label>
                <p>Términos y condiciones</p>
                <p>El responsable de la organización, recoge estos datos a través de Google Forms para ser ingresada  en la base de datos de Empresarios por la Educación.</p>
                <p>Al marcar la casilla de aceptación da pleno consentimiento. Puedes ver su política de privacidad en y los términos y condiciones.</p>
              </template>
            </v-radio>

          </v-radio-group>

          <div
            class="c-recaptcha mb-4"
            :class="alertRecaptcha ? '': 'c-recaptcha--error'"
          >
            <vue-recaptcha :sitekey="recaptchaCode" @verify="onVerify" ></vue-recaptcha>
            <span>Necesita verificar el codigo captcha</span>
          </div>

          <v-btn
            :disabled="loadingSubmit"
            :color="statusSubmit"
            large
            class="c-verify-entity__submit"
            @click="submit"
          >
            Registrate
            <v-progress-circular
              indeterminate
              color="gray"
              class="ml-4"
              v-if="loadingSubmit"
            ></v-progress-circular>
          </v-btn>
        </div>
      </div>
      <!--@ terminos y condiciones-->
    </form>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import FormProgram from '../components/formProgram'
import UploadImage from '../components/uploadImage'
import VueRecaptcha from 'vue-recaptcha'

export default {
  components: { VueRecaptcha, FormProgram, UploadImage },
  computed: {
    ...mapState(['userSesion', 'ubigeo', 'lines', 'typeEntities', 'recaptchaCode']),
    ...mapGetters(['getTypeProvinces', 'getTypeDistricts'])
  },
  data () {
    return {
      // eslint-disable-next-line
      entity: {
        id: null,
        logo_image_id: null,
        name: '',
        ruc: null,
        social_reason: '',
        line_id: null,
        type_entity_id: '',
        address: '',
        regions_id: '',
        provinces_id: '',
        districts_id: '',
        website: '',
        conditions: null
      },
      ubigeoPrepare: {
        districts: [],
        provinces: []
      },
      dialog: false,
      perfilContact: [
        {
          name: '',
          lastname: '',
          position: '',
          nro_doc: null,
          email: '',
          cellphone: null,
          phone: null,
          anexo: null,
          entity_id: null
        }
      ],
      verifyRecaptcha: null,
      alertRecaptcha: true,
      loadingSubmit: false,
      statusSubmit: 'primary',
    }
  },
  created () {
    // this.entity = this.userSesion.entity
    Object.assign(this.entity, this.userSesion.entity)

    this.getContactsByEntity(this.entity.id)
      .then(response => {
        this.perfilContact = response

        this.ubigeoPrepare.provinces = this.getTypeProvinces(this.entity.regions_id)
        this.ubigeoPrepare.districts = this.getTypeDistricts(this.entity.provinces_id)
      })
      .catch(error => {
        console.log(error)
      })
    if(this.userSesion.entity.state === 1) {
      this.$router.push({ name: 'home' })
    }

  },
  methods: {
    ...mapActions(['putEntity', 'getContactsByEntity', 'saveContact', 'putContact', 'getContactsByEntity', 'resetContacts', 'image']),
    addContact () {
      let contact = {
        name: '',
        lastname: '',
        position: '',
        nro_doc: null,
        email: '',
        cellphone: null,
        phone: null,
        anexo: null,
        entity_id: null
      }
      this.perfilContact.push(contact)
    },
    removeProgram (index) {
      this.programs.splice(index, 1)
    },
    getNameSpace (name, value) {
      return name + ' ' + value
    },
    submit () {
      this.loadingSubmit = true

      this.$validator.validateAll()
        .then(result => {
          if (result && this.verifyRecaptcha) {
            this.putEntity(this.entity)
              .then(response => {
                this.resetContacts([])
                this.perfilContact.forEach(contact => {
                  contact.entity_id = this.entity.id
                  if (contact.id) {
                    this.putContact(contact).catch(error => { this.statusSubmit = 'error' })
                  } else {
                    this.saveContact(contact).catch(error => { this.statusSubmit = 'error' })
                  }
                })
                this.loadingSubmit = false
                this.statusSubmit = 'success'
              })
              .then(() => {
                this.$router.push({ name: 'ficha-aprobada' })
              })
              .catch(error => { this.statusSubmit = 'error' })

          } else if (!this.verifyRecaptcha) {
            this.alertRecaptcha = false
            this.loadingSubmit = false
            this.statusSubmit = 'error'
            console.log('falta validar el recaptcha')
          } else {
            this.loadingSubmit = false
            this.statusSubmit = 'error'
          }
        })
    },
    valuesObject (obj, key) {
      let arrayObj = []
      obj.forEach(item => {
        arrayObj.push(item[key])
      })
      console.log(arrayObj)
      return arrayObj
    },
    selectRegion (value) {
      this.ubigeoPrepare.provinces = this.getTypeProvinces(value)
    },
    selectProvince (value) {
      this.ubigeoPrepare.districts = this.getTypeDistricts(value)
    },
    uploadImage (image) {
      this.entity.logo_image_id = image
    },
    changeActivityModal (value) {
      this.dialog = value
    },
    onVerify (response) {
      this.verifyRecaptcha = response
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

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
        <h2>Editar Perfil</h2>
      </v-flex>
    </v-layout>
    <form class="c-verify-entity ">
      <div class="c-verify-entity__row mb-5 c-verify-entity--main">
        <div class="c-verify-entity__row-small">
          <upload-image
            @image-resolve="uploadImage"
            @image-url="changeImageLink"
            :image="{url: entity.logo_image_link, id: entity.logo_image_id}"
            type="entity_logo"
          ></upload-image>
        </div>
        <div class="c-verify-entity__row-large">
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field
                disabled
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
                disabled
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
                disabled
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
          <div class="c-verify-entity__section">
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
                v-validate="{required: true,url: {require_protocol: true }}"
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
          <div class="c-verify-entity__section c-verify-entity__section--final">
            <span>2</span>
          </div>
        </div>
        <div class="c-verify-entity__row-large">
          <h3 class="c-verify-entity__title">Información de contacto directo con Empresarios por la Educación</h3>

          <v-layout wrap v-for="(perfil, index) in perfilContact" :key="index">
            <v-flex xs12 class="mt-4" v-if="index > 0">
              <h3 class="c-verify-entity__subtitle">Información del contacto {{ index + 1 }}</h3>
              <v-divider class="mt-3 mb-4"></v-divider>
            </v-flex>
            <v-flex xs12 md6>
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
            <v-flex xs12 md6>
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
            <v-flex xs12>
              <v-radio-group
                :disabled="loadingSubmit"
                v-validate="'required'"
                :error-messages="errors.collect(getNameSpace('tipo doc',index))"
                :data-vv-name="getNameSpace('tipo doc',index)"
                @keyup.enter="submit"
                v-model="perfil.type_doc"
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
            <v-flex xs12 md6>
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
            <v-flex xs12>
              <p class="c-verify-entity__subtitle">Indícanos datos de contacto para la validación y contacto de la cuenta</p>
            </v-flex>
            <v-flex xs6>
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
            <v-flex xs6>
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
                v-validate="'integer'"
                maxlength="11"
                :error-messages="errors.collect(getNameSpace('teléfono',index))"
                label="Nº Fijo"
                :data-vv-name="getNameSpace('teléfono',index)"
                @keyup.enter="submit"
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md5>
              <v-text-field
                :disabled="loadingSubmit"
                v-model="perfil.anexo"
                v-validate="'integer'"
                maxlength="10"
                :error-messages="errors.collect(getNameSpace('anexo',index))"
                label="Anexo"
                :data-vv-name="getNameSpace('anexo',index)"
                @keyup.enter="submit"
                box
              ></v-text-field>
            </v-flex>
          </v-layout>
          <div class="c-verify-entity__add-contact" v-if="perfilContact.length < 2">
            <v-btn fab dark small color="primary" @click="addContact">
              <v-icon dark>add</v-icon>
            </v-btn>
            <span>Agregar otro contacto</span>
          </div>

          <!--@ registro de programa-->
          <v-btn
            :disabled="loadingSubmit"
            :color="statusSubmit"
            large
            class="c-verify-entity__submit mt-5"
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
          <!--@ registro de programa-->

        </div>
      </div>
      <!--@ informacion de contacto-->

    </form>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import UploadImage from '../components/uploadImage'

export default {
  components: { UploadImage },
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
        logo_image_link: null,
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
      loadingSubmit: false,
      statusSubmit: 'primary'
    }
  },
  created () {
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
  },
  methods: {
    ...mapActions(['putEntity', 'getContactsByEntity', 'saveContact', 'putContact', 'resetContacts', 'image', 'setAlert']),
    addContact () {
      let contact = {
        name: '',
        lastname: '',
        position: '',
        type_doc: '',
        nro_doc: null,
        email: '',
        cellphone: null,
        phone: null,
        anexo: null,
        entity_id: null
      }
      this.perfilContact.push(contact)
    },
    getNameSpace (name, value) {
      return name + ' ' + (value + 1)
    },
    submit () {
      this.loadingSubmit = true

      this.$validator.validateAll()
        .then(result => {
          if (result) {
            this.putEntity(this.entity)
              .then(response => {
                this.resetContacts([])
                this.perfilContact.forEach(contact => {
                  contact.entity_id = this.entity.id
                  if (contact.id) {
                    this.putContact(contact)
                      .catch(error => {
                        this.statusSubmit = 'error'
                        console.log(error)
                      })
                  } else {
                    this.saveContact(contact)
                      .catch(error => {
                        this.statusSubmit = 'error'
                        console.log(error)
                      })
                  }
                })
                this.loadingSubmit = false
                this.statusSubmit = 'success'
              })
              .then(() => {
                this.setAlert({
                  text: 'Perfil actualizado con exito',
                  state: true,
                  dismissible: false,
                  type: 'success',
                  time: 6000
                })
              })
              .catch(error => {
                this.loadingSubmit = false
                this.statusSubmit = 'error'

                this.setAlert({
                  text: error.body.message,
                  state: true,
                  dismissible: false,
                  type: 'error',
                  time: 1000
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
    changeImageLink (image) {
      this.entity.logo_image_link = image
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

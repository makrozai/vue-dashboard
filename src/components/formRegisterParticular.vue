<template>
  <div class="c-form-home__container">
    <h2>Registro</h2>
    <p class="mt-0">Para tener acceso a la plataforma por favor ingresar los campos solicitados en la plataforma para ingresar.</p>
    <!--@FORM LAYOUT START-->
    <form class="c-form-home__inputs" @submit.prevent="submit">
      <v-layout wrap>
        <v-flex xs12>
          <v-text-field
            :disabled="loadingSubmit"
            v-model="userInfo.email"
            v-validate="'required|email|max:50'"
            :error-messages="errors.collect('Correo electrónico')"
            label="Correo electrónico"
            data-vv-name="Correo electrónico"
            @keyup.enter="submit"
            required
            box
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            :disabled="loadingSubmit"
            v-model="userInfo.password"
            v-validate="'required|min:8|max:30'"
            maxlength="30"
            :append-icon="show1 ? 'visibility' : 'visibility_off'"
            :type="show1 ? 'text' : 'password'"
            :error-messages="errors.collect('Contraseña')"
            label="Contraseña"
            data-vv-name="Contraseña"
            @keyup.enter="submit"
            required
            box
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <p class="mt-0">Indícanos datos de contacto para la validación y contacto de la cuenta</p>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            :disabled="loadingSubmit"
            v-model="partakerInfo.name"
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
        <v-flex xs6>
          <v-text-field
            :disabled="loadingSubmit"
            v-model="partakerInfo.lastname"
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
            v-validate="'required'"
            :error-messages="errors.collect('Tipo de identidad')"
            data-vv-name="Tipo de identidad"
            @keyup.enter="submit"
            v-model="partakerInfo.type_doc"
            :mandatory="false"
            required
            class="c-register__particular__radio"
          >
            <v-radio label="DNI" value="DNI" color="primary"></v-radio>
            <v-radio label="Doc. Extranjería" value="DEX" color="primary"></v-radio>
          </v-radio-group>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            :disabled="loadingSubmit"
            v-model="partakerInfo.nro_doc"
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

        <v-flex xs12>
          <v-text-field
            :disabled="loadingSubmit"
            v-model="partakerInfo.phone"
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
        <v-flex xs12>
          <div class="c-checkbox-register">
            <v-checkbox
              v-validate="'required'"
              :error-messages="errors.collect('autorizacion')"
              data-vv-name="autorizacion"
              @keyup.enter="submit"
              v-model="autorization"
              label=""
              class="mt-0"
              color="primary"
              required
            ></v-checkbox>
            <a @click="dialogTerms = true">¿Autoriza usted, que sus datos personales puedan ser tratados, para enviarle información y compartir la información relativa?</a>
            <v-dialog v-model="dialogTerms" persistent max-width="560">
              <v-card>
                <iframe src="https://vuetifyjs.com/" height="650px" width="100%"></iframe>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" flat @click="dialogTerms = false">Aceptar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </v-flex>
        <v-flex xs12>
          <div class="c-recaptcha">
            <vue-recaptcha :sitekey="recaptchaCode" @verify="onVerify"></vue-recaptcha>
          </div>
        </v-flex>
        <v-flex xs12>
          <v-btn
            :disabled="loadingSubmit"
            large
            :color='statusSubmit'
            class="elevation-0"
            @click="submit"
          >
            Registrar
            <v-progress-circular
              indeterminate
              color="gray"
              class="ml-4"
              v-if="loadingSubmit"
            ></v-progress-circular>
          </v-btn>
        </v-flex>
        <p class="text-xs-center">¿Ya tienes una cuenta?
          <router-link :to="{name:'login'}" class="red--text">Inicia sesión</router-link>
        </p>
      </v-layout>
    </form>
    <!--@FORM LAYOUT END-->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import VueRecaptcha from 'vue-recaptcha'
export default {
  components: { VueRecaptcha },
  computed: {
    ...mapState(['recaptchaCode'])
  },
  data () {
    return {
      userInfo: {
        type_user_id: 3,
        email: '',
        password: ''
      },
      partakerInfo: {
        name: '',
        lastname: '',
        type_doc: null,
        nro_doc: null,
        phone: null,
        user_id: null
      },
      loadingSubmit: false,
      statusSubmit: 'primary',
      dialogTerms: false,
      autorization: null,
      show1: false,
      verifyRecaptcha: null
    }
  },
  methods: {
    ...mapActions(['setAlert', 'login', 'authRegister']),
    submit () {
      this.loadingSubmit = true

      this.$validator.validateAll()
        .then(response => {
          if (this.verifyRecaptcha && response) {
            // save information in state and database
            this.authRegister({ user: this.userInfo, partaker: this.partakerInfo })
              .then(response => {
                // login de usuario
                this.login({ email: this.userInfo.email, password: this.userInfo.password })
                  .then(logged => {
                    // - redireccion de pagina
                    this.$router.push({ name: 'home' })
                  })
              })
              .catch(error => {
                this.loadingSubmit = false
                this.statusSubmit = 'error'

                this.setAlert({
                  text: error.body.message,
                  state: true,
                  dismissible: true,
                  type: 'error'
                })
              })
              .finally(() => {
                // this.loadingSubmit = false
              })
            // change state of button
          } else {
            this.loadingSubmit = false
            this.statusSubmit = 'error'
          }
        })
    },
    onVerify (response) {
      this.verifyRecaptcha = response
    },
    openTerms () {

    }
  }
}
</script>

<style lang="scss" scoped>
  .c-recaptcha{
    display: flex;
    justify-content: center;
    padding-bottom: 2em;
    width: 100%;
  }
</style>

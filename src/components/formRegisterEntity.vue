<template>
  <div class="c-form-home__container">
    <h2>Registro de entidad</h2>
    <p class="mt-0">En el siguiente formulario ingresa los campos obligatorios que utilizaremos para la validación y contacto de la plataforma.</p>
    <!--@FORM LAYOUT START-->
    <form class="c-form-home__inputs" @submit.prevent="submit">
      <v-layout wrap>
        <v-flex xs12>
          <v-text-field
            :disabled="loadingSubmit"
            v-model="entityInfo.name"
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
            v-model="entityInfo.ruc"
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
            v-model="entityInfo.social_reason"
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
        <v-flex xs12>
          <p class="mt-0">Ingresa una contraseña legible y segura para ingresar al sistema</p>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            :disabled="loadingSubmit"
            v-model="userInfo.email"
            v-validate="'required|email|max:50'"
            maxlength="50"
            :error-messages="errors.collect('correo electrónico')"
            label="Correo electrónico"
            data-vv-name="correo electrónico"
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
            :error-messages="errors.collect('contraseña')"
            label="Contraseña"
            data-vv-name="contraseña"
            @keyup.enter="submit"
            required
            box
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <p class="mt-0">Indícanos datos de contacto para la validación y contacto de la cuenta</p>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            :disabled="loadingSubmit"
            v-model="entityInfo.main_phone"
            v-validate="'required|integer|max:15'"
            maxlength="15"
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
              v-model="entityInfo.autorization"
              v-validate="'required'"
              :error-messages="errors.collect('autorización')"
              label=""
              data-vv-name="autorización"
              @keyup.enter="submit"
              required
              color="primary"
              class="mt-0"
            ></v-checkbox>
            <a @click="dialogTerms = true">¿Autoriza usted, que sus datos personales puedan ser tratados, para enviarle información y compartir la información relativa?</a>
            <v-dialog v-model="dialogTerms" persistent max-width="560">
              <v-card>
                <iframe :src="settings.iframeTG" height="650px" width="100%"></iframe>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" flat @click="dialogTerms = false">Aceptar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </v-flex>
        <v-flex xs12>
          <div
            class="c-recaptcha mb-4"
            :class="alertRecaptcha ? '': 'c-recaptcha--error'"
          >
            <vue-recaptcha :sitekey="recaptchaCode" @verify="onVerify" ></vue-recaptcha>
            <span>Necesita verificar el codigo captcha</span>
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
          <router-link :to="{name:'login'}">Inicia sesión</router-link>
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
    ...mapState(['recaptchaCode', 'settings'])
  },
  data () {
    return {
      userInfo: {
        type_user_id: 2,
        email: '',
        password: ''
      },
      entityInfo: {
        name: '',
        social_reason: '',
        ruc: null,
        main_phone: null,
        state: 2,
        user_id: null,
        autorization: false
      },
      loadingSubmit: false,
      statusSubmit: 'primary',
      show1: false,
      dialogTerms: false,
      verifyRecaptcha: null,
      alertRecaptcha: true
    }
  },
  methods: {
    ...mapActions(['setAlert', 'authRegister', 'login']),
    submit () {
      this.loadingSubmit = true

      this.$validator.validateAll()
        .then(result => {
          if (this.verifyRecaptcha && result && this.entityInfo.autorization) {
            // save information in state and database
            this.authRegister({ user: this.userInfo, entity: this.entityInfo })
              .then(response => {
                // login de usuario
                this.login({ email: this.userInfo.email, password: this.userInfo.password })
                  .then(logged => {
                    // - redireccion de pagina
                    this.$router.push({ name: 'ficha-de-verificacion' })
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
          } else if (!this.verifyRecaptcha) {
            this.alertRecaptcha = false
            this.loadingSubmit = false
            this.statusSubmit = 'error'
          } else {
            this.loadingSubmit = false
            this.statusSubmit = 'error'
          }
        })
    },
    onVerify (response) {
      this.verifyRecaptcha = response
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
    flex-wrap: wrap;
  }
</style>

<template>
  <div class="c-form-home__container">
    <h2>Registro de entidad</h2>
    <p class="mt-0">En el siguiente formulario ingresa los campos obligatorios que utilizaremos para la validación y contacto del sistema y de la entidad</p>
    <!--@FORM LAYOUT START-->
    <form class="c-form-home__inputs">
      <v-layout wrap>
        <v-flex xs12>
          <v-text-field
            :disabled="loadingSubmit"
            v-model="entityInfo.name"
            v-validate="'required|alpha_spaces'"
            :error-messages="errors.collect('razón comercial')"
            label="Razón comercial o nombre de la organización"
            data-vv-name="razón comercial"
            required
            box
          ></v-text-field>
        </v-flex>
        <v-flex xs12 md4>
          <v-text-field
            :disabled="loadingSubmit"
            v-model="entityInfo.ruc"
            v-validate="'required|integer|length:11'"
            :error-messages="errors.collect('ruc')"
            label="Ruc"
            data-vv-name="ruc"
            required
            box
          ></v-text-field>
        </v-flex>
        <v-flex xs12 md8>
          <v-text-field
            :disabled="loadingSubmit"
            v-model="entityInfo.social_reason"
            v-validate="'required|alpha_spaces'"
            :error-messages="errors.collect('razón social')"
            label="Razón social"
            data-vv-name="razón social"
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
            v-validate="'required|email'"
            :error-messages="errors.collect('correo electronico')"
            label="Correo electronico"
            data-vv-name="correo electronico"
            required
            box
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            :disabled="loadingSubmit"
            v-model="userInfo.password"
            v-validate="'required|alpha_dash|min:6'"
            :append-icon="show1 ? 'visibility' : 'visibility_off'"
            :type="show1 ? 'text' : 'password'"
            :error-messages="errors.collect('contraseña')"
            label="Contraseña"
            data-vv-name="contraseña"
            required
            box
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <p class="mt-0">Indicanos datos de contacto para la validacion y contacto de la cuenta</p>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            :disabled="loadingSubmit"
            v-model="entityInfo.main_phone"
            v-validate="'required|integer'"
            :error-messages="errors.collect('Nº Celular')"
            label="Nº Celular"
            data-vv-name="Nº Celular"
            required
            box
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-checkbox
            v-model="autorization"
            v-validate="'required'"
            :error-messages="errors.collect('autorización')"
            label="¿Autoriza usted, que sus datos personales puedan ser tratados, para enviarle información y compartir la información relativa?"
            data-vv-name="autorización"
            color="primary"
            class="mt-0"
          ></v-checkbox>
        </v-flex>
        <v-flex xs12>
          <div class="c-recaptcha">
            <vue-recaptcha sitekey="6LcIM6cUAAAAAFuysxLaVyFwlzCQjqmLcXo8a0W2"  @verify="onVerify"></vue-recaptcha>
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
      </v-layout>
    </form>
    <!--@FORM LAYOUT END-->
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import VueRecaptcha from 'vue-recaptcha'
export default {
  components: { VueRecaptcha },
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
        user_id: null
      },
      loadingSubmit: false,
      statusSubmit: 'primary',
      autorization: false,
      show1: false,
      verifyRecaptcha: null
    }
  },
  methods: {
    ...mapActions(['setUser', 'setEntity', 'setAlert','getUser']),
    submit () {
      this.loadingSubmit = true
      let alertError = null
      this.$validator.validateAll()
        .then(response => {
          if (this.verifyRecaptcha && response) {
            // save information in state and database
            this.setUser(this.userInfo)
              .then(response => {
                this.entityInfo.user_id = response.id

                this.setEntity(this.entityInfo)
                  .then(result => {
                    this.$http.post('auth/login', { email: this.userInfo.email, password: this.userInfo.password })
                      .then(user => {
                        window.localStorage.setItem('_token', user.body.data.token)
                        this.getUser()
                        // - redireccion de pagina
                        this.$router.push({ name: 'ficha-de-verificacion' })
                      })
                  })
                  .catch(error => {
                    // - envia la alerta
                    alertError = error
                  })

                this.statusSubmit = 'success'
              })
              .catch(error => {
                // - envia la alerta
                alertError = error
                // - stado del boton
                this.statusSubmit = 'error'
              })
              .finally(() => {
                this.loadingSubmit = false

                // - comprueba si existe un error y despliega la alerta
                if (alertError) {
                  this.setAlert({
                    text: alertError.body.message,
                    state: true,
                    dismissible: true,
                    type: 'error'
                  })
                }
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

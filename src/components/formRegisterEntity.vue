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
            v-model="comercialReason"
            v-validate="'required'"
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
            v-model="ruc"
            v-validate="'required|integer'"
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
            v-model="socialReason"
            v-validate="'required'"
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
            v-model="email"
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
            v-model="password"
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
            v-model="phone"
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
      loadingSubmit: false,
      statusSubmit: 'primary',

      comercialReason: '',
      socialReason: '',
      ruc: null,
      autorization: false,
      phone: null,
      show1: false,
      password: '',
      email: '',
      verifyRecaptcha: null
    }
  },
  methods: {
    ...mapActions(['setUser', 'setEntity']),
    submit () {
      this.loadingSubmit = true

      this.$validator.validateAll()
        .then(response => {
          setInterval(() => {
            this.loadingSubmit = false
          }, 3000)

          if (this.verifyRecaptcha && response) {
            var user = {
              email: this.email,
              password: this.password
            }
            var entity = {
              comercialReason: this.comercialReason,
              socialReason: this.socialReason,
              ruc: this.ruc,
              phone: this.phone
            }
            // save information in state and database
            this.setUser(user)
            this.setEntity(entity)
            // change state of button
            this.statusSubmit = 'success'
          } else {
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

<template>
  <div class="c-form-home__container">
    <h2>Registro</h2>
    <p class="mt-0">Para poder acceder a la plataforma por favor ingresar los campos solicitados en la plataforma para ingresar</p>
    <!--@FORM LAYOUT START-->
    <form class="c-form-home__inputs">
      <v-layout wrap>
        <v-flex xs12>
          <p class="mt-0">Ingresa un contraseña legible y segura para la validación y contacto de la plataforma.</p>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            v-model="email"
            v-validate="'required|email'"
            :error-messages="errors.collect('Correo electronico')"
            label="Correo electronico"
            data-vv-name="Correo electronico"
            required
            box
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            v-model="password"
            v-validate="'required|alpha_dash|min:6'"
            :append-icon="show1 ? 'visibility' : 'visibility_off'"
            :type="show1 ? 'text' : 'password'"
            :error-messages="errors.collect('Contraseña')"
            label="Contraseña"
            data-vv-name="Contraseña"
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
            v-model="identidad"
            v-validate="'required|integer'"
            :error-messages="errors.collect('Documento de identidad')"
            label="Nº Documento de identidad"
            data-vv-name="Documento de identidad"
            required
            box
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-radio-group
            v-validate="'required'"
            :error-messages="errors.collect('Tipo de identidad')"
            data-vv-name="Tipo de identidad"
            v-model="typeIdentity"
            :mandatory="false"
            required
            class="c-register__particular__radio"
          >
            <v-radio label="DNI" value="radio-1" color="primary"></v-radio>
            <v-radio label="Doc. Extranjería" value="radio-2" color="primary"></v-radio>
          </v-radio-group>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            v-model="phone"
            v-validate="'required|integer|min:9'"
            :error-messages="errors.collect('Nº Celular')"
            label="Nº Celular"
            data-vv-name="Nº Celular"
            required
            box
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-checkbox
            v-validate="'required'"
            :error-messages="errors.collect('Autorizacion')"
            data-vv-name="Autorizacion"
            v-model="autorization"
            label="¿Autoriza usted, que sus datos personales puedan ser tratados, para enviarle información y compartir la información relativa?"
            class="mt-0"
            color="primary"
            required
          ></v-checkbox>
        </v-flex>
        <v-flex xs12>
          <div class="c-recaptcha">
            <vue-recaptcha sitekey="6LcIM6cUAAAAAFuysxLaVyFwlzCQjqmLcXo8a0W2" @verify="onVerify"></vue-recaptcha>
          </div>
        </v-flex>
        <v-flex xs12>
          <v-btn
            large
            color="primary"
            class="elevation-0"
            @click="submit"
          >
            Registrar
          </v-btn>
        </v-flex>
      </v-layout>
    </form>
    <!--@FORM LAYOUT END-->
  </div>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha'
export default {
  components: { VueRecaptcha },
  data () {
    return {
      typeIdentity: null,
      identidad: null,
      autorization: null,
      phone: null,
      show1: false,
      password: '',
      email: '',
      verifyRecaptcha: null
    }
  },
  mounted () {
    this.$validator.localize('es', this.dictionary)
  },

  methods: {
    submit () {
      this.$validator.validateAll()
        .then(reponse => {

        })
    },
    clear () {
      this.typeIdentidad = null
      this.identidad = null
      this.checkbox = false
      this.phone = null
      this.email = ''
      this.password = ''
      this.$validator.reset()
    },
    onVerify (response) {
      this.verifyRecaptcha = response
    },
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

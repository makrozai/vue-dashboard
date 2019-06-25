<template>
  <v-layout wrap fill-height>
    <div class="c-logo__intro">
      <a :href="website">
        <img src="../assets/logo-principal.svg" alt="" class="hidden-sm-and-down">
        <img src="../assets/exe.svg" alt="" class="hidden-md-and-up">
      </a>
    </div>
    <slider-home></slider-home>
    <v-flex md5 xs12 offset-md7 class="c-form-home">
      <v-btn
        fab
        color="primary"
        class="c-btn-return elevation-0 hidden-md-and-up"
        :to="{name:'login'}"
      >
        <v-icon>navigate_before</v-icon>
      </v-btn>
      <div class="c-form-home__container">
        <h2>Iniciar sesión</h2>
        <!--@FORM LAYOUT START-->
        <form class="c-form-home__inputs" @submit.prevent="submit">
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field
                :disabled="loadingSubmit"
                v-model="email"
                v-validate="'required|email|max:50'"
                maxlength="50"
                :error-messages="errors.collect('Correo electronico')"
                label="Correo electronico"
                data-vv-name="Correo electronico"
                @keyup.enter="submit"
                required
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                :disabled="loadingSubmit"
                v-model="password"
                v-validate="'required|min:6'"
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
              <v-btn
                :disabled="loadingSubmit"
                large
                :color='statusSubmit'
                class="elevation-0"
                @click="submit"
              >
                Ingresar
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
        <p class="text-xs-center">¿No puedes acceder?
          <router-link :to="{name:'recuperar-contrasena'}" class="red--text">Recupera tu clave</router-link>
        </p>
        <p class="text-xs-center">Deseo ser parte</p>
        <v-btn
          :to="{name:'register'}"
          color="primary"
          class="elevation-0 c-btn-register"
          large
          outline
        >
          Regístrate
        </v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import SliderHome from '../components/sliderHome'

import { mapState, mapActions } from 'vuex'
export default {
  components: { SliderHome },
  computed: {
    ...mapState(['website'])
  },
  data () {
    return {
      loadingSubmit: false,
      statusSubmit: 'primary',
      show1: false,
      password: '',
      email: ''
    }
  },

  methods: {
    ...mapActions(['getUser', 'setAlert', 'login']),
    submit () {
      // - bloquea el boton
      this.loadingSubmit = true

      this.$validator.validateAll()
        .then(result => {
          if (!result) {
            // - estado del boton
            this.loadingSubmit = false
            this.statusSubmit = 'error'
          } else {
            this.login({ email: this.email, password: this.password })
              .then(logged => {
                this.$router.push({ name: 'ficha-de-verificacion' })
              })
              .catch(error => {
                // - despliega la alerta
                this.setAlert({
                  text: error.body.message,
                  state: true,
                  dismissible: false,
                  type: 'error',
                  time: 60000
                })
                // - stado del boton
                this.loadingSubmit = false
                this.statusSubmit = 'error'
              })
          }
        })
    }
  }
}
</script>
<style lang="scss" scoped>
  .c-btn-register{
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>

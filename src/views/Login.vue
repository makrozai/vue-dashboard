<template>
  <v-layout wrap fill-height>
    <div class="c-logo__intro">
      <a href="#!">
        <img src="../assets/logo-principal.svg" alt="">
      </a>
    </div>
    <v-flex md6 xs12 class="hidden-sm-and-down c-slider">
      <v-carousel
        height="100vh"
        hide-controls
        class="elevation-0 c-slider-dashboard"
      >
        <v-carousel-item
          v-for="(item,i) in items"
          :key="i"
          :src="item.src"
        >
          <h3>{{ item.title }}</h3>
        </v-carousel-item>
      </v-carousel>
    </v-flex>
    <v-flex md6 xs12 class="c-form-home">
      <v-btn
        fab
        color="primary"
        class="c-btn-return elevation-0 hidden-sm-and-up"
        :to="{name:'home'}"
      >
        <v-icon>navigate_before</v-icon>
      </v-btn>
      <div class="c-form-home__container">
        <h2>Iniciar sesión</h2>
        <!--@FORM LAYOUT START-->
        <form class="c-form-home__inputs">
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field
                :disabled="loadingSubmit"
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
                :disabled="loadingSubmit"
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
import { mapActions } from 'vuex'
export default {
  computed: {
  },
  data () {
    return {
      loadingSubmit: false,
      statusSubmit: 'primary',
      items: [
        {
          title: 'Se beneficiaron un 11% de alumnos en Lima, La Libertad y Cajamarca',
          // eslint-disable-next-line
          src: require('../assets/slider-1.jpg')
        },
        {
          title: 'Se beneficiaron un 11% de alumnos en Lima, La Libertad y',
          // eslint-disable-next-line
          src: require('../assets/slider-2.jpg')
        },
        {
          title: 'Se beneficiaron un 11% de alumnos en Lima, La Libertad y',
          // eslint-disable-next-line
          src: require('../assets/slider-5.jpg')
        },
        {
          title: 'Se beneficiaron un 11% de alumnos en Lima, La Libertad y',
          // eslint-disable-next-line
          src: require('../assets/slider-4.jpg')
        }
      ],
      show1: false,
      password: '',
      email: ''
    }
  },

  methods: {
    ...mapActions(['getUser']),
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
            this.$http.post('auth/login', { email: this.email, password: this.password })
              .then(user => {
                window.localStorage.setItem('_token', user.body.data.token)
                this.getUser()
                // - stado del boton
                this.loadingSubmit = false
                this.statusSubmit = 'success'
                // - redireccion de pagina
                this.$router.push({ name: 'ficha-de-verificacion' })
              })
              .catch(error => {
                // - stado del boton
                console.log(error)
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

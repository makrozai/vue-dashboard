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
          <h3>Se beneficiaron un 11% de alumnos en Lima, La Libertad y Cajamarca</h3>
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
                v-model="email"
                v-validate="'required|email'"
                :error-messages="errors.collect('email')"
                label="Correo electronico"
                data-vv-name="email"
                required
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                v-model="password"
                v-validate="'required|alpha_dash'"
                :append-icon="show1 ? 'visibility' : 'visibility_off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                :error-messages="errors.collect('password')"
                label="Contraseña"
                hint="At least 6 characters"
                data-vv-name="password"
                required
                counter
                box
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-btn
                large
                color="primary"
                class="elevation-0"
                @click="submit"
              >
                Ingresar
              </v-btn>
            </v-flex>
          </v-layout>
        </form>
        <!--@FORM LAYOUT END-->
        <p class="text-xs-center">¿No puedes acceder?
          <router-link :to="{name:'register'}" class="red--text">Recupera tu clave</router-link>
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
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState(['user', 'logged'])
  },
  data () {
    return {
      items: [
        {
          src: 'https://live.staticflickr.com/921/28751703687_ce438f4081_h.jpg'
        },
        {
          src: 'https://live.staticflickr.com/838/28751699137_14d73b2068_k.jpg'
        }
      ],
      name: '',
      show1: false,
      password: '',
      email: '',
      rules: {
        required: value => !!value || 'requerido.',
        min: v => v.length >= 6 || 'Min 6 characters',
        emailMatch: () => ('The email and password you entered don\'t match')
      },
      dictionary: {
        attributes: {
          email: 'E-mail Address'
          // custom attributes
        }
      }
    }
  },
  mounted () {
    this.$validator.localize('es', this.dictionary)
  },

  methods: {
    ...mapActions(['login']),
    submit () {
      this.$validator.validateAll()
        .then(result => {
          if (!result) {

          } else {
            this.login({ email: this.email, password: this.password })
              .then(user => {
                this.$router.push({ name: 'programa' })
              })
          }
        })
    },
    clear () {
      this.email = ''
      this.password = ''
      this.$validator.reset()
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

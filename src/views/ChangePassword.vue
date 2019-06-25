<template>
  <v-layout wrap fill-height>
    <div class="c-logo__intro">
      <a :href="website">
        <img src="../assets/logo-principal.svg" alt="">
      </a>
    </div>
    <slider-home></slider-home>
    <v-flex md5 xs12 offset-md7 class="c-form-home">
      <v-btn
        fab
        color="primary"
        class="c-btn-return elevation-0 hidden-sm-and-up"
        :to="{name:'login'}"
      >
        <v-icon>navigate_before</v-icon>
      </v-btn>
      <div class="c-form-home__container">
        <h2>Cambiar contraseña</h2>
        <p class="c-form-home__description" v-if="!mailSuccess">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
        <!--@FORM LAYOUT START-->
        <form class="c-form-home__inputs" v-if="!mailSuccess" @submit.prevent="submit">
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field
                :disabled="loadingSubmit"
                v-model="password"
                v-validate="'required|min:8'"
                :append-icon="show1 ? 'visibility' : 'visibility_off'"
                :type="show1 ? 'text' : 'password'"
                :error-messages="errors.collect('Contraseña')"
                label="Contraseña"
                ref="password"
                data-vv-name="Contraseña"
                required
                box
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                :disabled="loadingSubmit"
                v-model="passwordComfirmed"
                v-validate="'required|min:8|confirmed:password'"
                :append-icon="show2 ? 'visibility' : 'visibility_off'"
                :type="show2 ? 'text' : 'password'"
                :error-messages="errors.collect('Confirma Contraseña')"
                label="Confirma Contraseña"
                data-vv-name="Confirma Contraseña"
                required
                box
                @click:append="show2 = !show2"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 class="mt-4">
              <v-btn
                :disabled="loadingSubmit"
                large
                :color='statusSubmit'
                class="elevation-0"
                @click="submit"
              >
                cambiar
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
        <div v-if="mailSuccess" class="c-accept-entity">
          <span class="c-check-entity">
            <v-icon>done</v-icon>
          </span>
          <span>actualizado correctamente</span>
        </div>
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
      show2: false,
      password: '',
      passwordComfirmed: '',
      token: '',
      mailSuccess: false
    }
  },
  created () {
    let routeParam = window.location.href
    routeParam = new URL(routeParam)
    this.token = routeParam.searchParams.get('rpt')
  },
  methods: {
    ...mapActions(['authChange', 'setAlert']),
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
            this.authChange({ token: this.token, newpassword: this.password })
              .then(response => {
                if (response.body.code === 'password_updated') {
                  this.mailSuccess = true
                }
                // - estado del boton
                this.statusSubmit = 'success'

                setTimeout(function () {
                  this.$router.push({ name: 'login' })
                }, 3000)
              })
              .catch(error => {
                console.log(error)
                this.setAlert({
                  text: error.body.message,
                  state: true,
                  dismissible: false,
                  type: 'error',
                  time: 4000
                })
                // - estado del boton
                this.statusSubmit = 'error'
              })
              .finally(() => {
                this.loadingSubmit = false
              })
          }
        })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

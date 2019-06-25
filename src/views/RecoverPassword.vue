<template>
  <v-layout wrap fill-height>
    <div class="c-logo__intro">
      <a href="#!">
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
        <h2>Recuperar contraseña</h2>
        <p class="c-form-home__description" v-if="!mailSuccess">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum error voluptatum officiis ad porro temporibus vel voluptatibus non odio? Similique ratione aliquam nostrum?</p>
        <!--@FORM LAYOUT START-->
        <form class="c-form-home__inputs" v-if="!mailSuccess" @submit.prevent="submit">
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
            <v-flex xs12 class="mt-4">
              <v-btn
                :disabled="loadingSubmit"
                large
                :color='statusSubmit'
                class="elevation-0"
                @click="submit"
              >
                Recuperar
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
import { mapActions } from 'vuex'
export default {
  components: { SliderHome },
  computed: {
  },
  data () {
    return {
      loadingSubmit: false,
      statusSubmit: 'primary',
      email: '',
      mailSuccess: false
    }
  },

  methods: {
    ...mapActions(['authRecover', 'setAlert']),
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
            this.authRecover({ email: this.email })
              .then(response => {
                if (response.body.code === 'request_sent_correctly') {
                  this.mailSuccess = true
                }
                // - estado del boton
                this.statusSubmit = 'success'

                setTimeout((() => {
                  this.$router.push({ name: 'login' })
                }), 3000)
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

<template>
  <v-layout wrap fill-height>
    <div class="c-logo__intro">
      <a href="#!">
        <img src="../assets/logo-principal.svg" alt="">
      </a>
    </div>
    <v-flex md7 xs12 class="hidden-sm-and-down c-slider">
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
    <v-flex md5 xs12 class="c-form-home">
      <v-btn
        fab
        color="primary"
        class="c-btn-return elevation-0 hidden-sm-and-up"
        :to="{name:'home'}"
      >
        <v-icon>navigate_before</v-icon>
      </v-btn>
      <div class="c-form-home__container">
        <h2>Recuperar contraseña</h2>
        <p class="c-form-home__description">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum error voluptatum officiis ad porro temporibus vel voluptatibus non odio? Similique ratione aliquam nostrum? Ducimus deserunt sed a harum, optio perspiciatis.</p>
        <!--@FORM LAYOUT START-->
        <form class="c-form-home__inputs">
          <v-layout wrap>
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
      email: ''
    }
  },

  methods: {
    ...mapActions(['login']),
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

          }
        })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

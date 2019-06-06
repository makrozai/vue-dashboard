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
        class="elevation-0 c-slider-dashboard "
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
        <h2>Registro</h2>
        <p class="mt-0">En el siguiente formulario ingresa los campos obligatorios que utilizaremos para la validación y contacto del sistema y de la entidad</p>
        <!--@FORM LAYOUT START-->
        <form class="c-form-home__inputs">
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field
                v-model="razonComercial"
                v-validate="'required'"
                :error-messages="errors.collect('razonComercial')"
                label="Razón comercial o nombre de la organización"
                data-vv-name="razonComercial"
                required
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md8>
              <v-text-field
                v-model="razonSocial"
                v-validate="'required'"
                :error-messages="errors.collect('razonSocial')"
                label="Razón social"
                data-vv-name="razonSocial"
                required
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md4>
              <v-text-field
                v-model="ruc"
                v-validate="'required|integer'"
                :error-messages="errors.collect('Ruc')"
                label="Ruc"
                data-vv-name="Ruc"
                required
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <p class="mt-0">Ingresa una contraseña legible y segura para ingresar al sistema</p>
            </v-flex>
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
                hint="At least 8 characters"
                data-vv-name="password"
                required
                counter
                box
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <p class="mt-0">Indicanos datos de contacto para la validacion y contacto de la cuenta</p>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                v-model="phone"
                v-validate="'required|integer'"
                :error-messages="errors.collect('phone')"
                label="Nª Celular"
                data-vv-name="phone"
                required
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-checkbox
                v-model="checkbox"
                label="¿Autoriza usted, que sus datos personales puedan ser tratados, para enviarle información y compartir la información relativa?"
                class="mt-0"
              ></v-checkbox>
            </v-flex>
            <v-flex xs12>
              <div class="c-recaptcha">
                <vue-recaptcha sitekey="6LcIM6cUAAAAAFuysxLaVyFwlzCQjqmLcXo8a0W2"></vue-recaptcha>
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
    </v-flex>
  </v-layout>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha'
export default {
  components: { VueRecaptcha },
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
      razonComercial: '',
      razonSocial: '',
      ruc: null,
      checkbox: false,
      phone: null,
      show1: false,
      password: '',
      email: '',
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
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
    submit () {
      this.$validator.validateAll()
    },
    clear () {
      this.razonComercial = ''
      this.razonSocial = ''
      this.ruc = null
      this.checkbox = false
      this.phone = null
      this.email = ''
      this.password = ''
      this.$validator.reset()
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

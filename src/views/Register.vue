<template>
  <v-layout wrap fill-height>
    <div class="c-logo__intro">
      <a :href="website">
        <img src="../assets/logo-principal.svg" alt="" class="hidden-sm-and-down">
        <img src="../assets/exe.svg" alt="" class="hidden-md-and-up">
      </a>
    </div>
    <slider-home></slider-home>

    <v-flex md6 lg5 xs12 offset-md6 offset-lg7 class="c-form-home c-form-home--register">
      <v-btn
        fab
        color="primary"
        class="c-btn-return elevation-0 hidden-md-and-up"
        :to="{name:'login'}"
      >
        <v-icon>navigate_before</v-icon>
      </v-btn>
      <div class="c-register" v-if="registerPage == 'home'">
        <h2>Regístrate</h2>
        <p>Indícanos que tipo de rol necesitas crear para ingresar a la plataforma, selecciona según las activiadades que realizaras en la plataforma <b>EXE Plataforma Interconexion</b></p>

        <div class="c-register__forms">
          <div class="c-register__forms__item">
            <h3>Consultas</h3>
            <i class="icon-consultas"></i>
            <p>¿Deseas consultar información de la plataforma <b>EXE Plataforma Interconexion</b></p>
            <v-btn color="primary" @click="registerPage = 'particular'">Regístrate</v-btn>
          </div>
          <div class="c-register__forms__item">
            <h3>Entidad</h3>
            <i class="icon-entidad"></i>
            <p>Manejas o ejecutas proyectos relacionados a la educación y soy parte de <b>EXE Plataforma Interconexion</b></p>
            <v-btn color="primary" @click="registerPage = 'entity'">Regístrate</v-btn>
          </div>
        </div>
      </div>
      <form-register-entity v-if="registerPage == 'entity'"></form-register-entity>
      <form-register-particular v-if="registerPage == 'particular'"></form-register-particular>

      <p class="text-xs-center">¿Ya tienes una cuenta?
        <router-link :to="{name:'login'}" >Inicia sesión</router-link>
      </p>
    </v-flex>
  </v-layout>
</template>

<script>
import SliderHome from '../components/sliderHome'
import formRegisterEntity from '../components/formRegisterEntity'
import formRegisterParticular from '../components/formRegisterParticular'

import { mapState } from 'vuex'
export default {
  components: { formRegisterEntity, formRegisterParticular, SliderHome },
  computed: {
    ...mapState(['website'])
  },
  data () {
    return {
      registerPage: 'home'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

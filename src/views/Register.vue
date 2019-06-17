<template>
  <v-layout wrap fill-height>
    <div class="c-logo__intro">
      <a href="#!">
        <img src="../assets/logo-principal.svg" alt="" class="hidden-sm-and-down">
        <img src="../assets/exe.svg" alt="" class="hidden-md-and-up">
      </a>
    </div>
    <v-flex md7 xs12 class="hidden-sm-and-down c-slider">
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

    <v-flex md5 xs12 class="c-form-home">
      <v-btn
        fab
        color="primary"
        class="c-btn-return elevation-0 hidden-md-and-up"
        :to="{name:'home'}"
      >
        <v-icon>navigate_before</v-icon>
      </v-btn>
      <div class="c-register" v-if="registerPage == 'home'">
        <h2>Registrate</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum dignissimos nostrum ea nisi assumenda error dolor quidem illo? Iure est autem provident laborum at. Enim dolorum consequatur earum facilis deserunt. <b>EXE Plataforma Interconexion</b></p>

        <div class="c-register__forms">
          <div class="c-register__forms__item">
            <h3>Consultas</h3>
            <i class="icon-consultas"></i>
            <p>¿Deseas consultar información de la plataforma <b>EXE Perú</b></p>
            <v-btn color="primary" @click="registerPage = 'particular'">Registrate</v-btn>
          </div>
          <div class="c-register__forms__item">
            <h3>Entidad</h3>
            <i class="icon-entidad"></i>
            <p>Manejas o ejecutas proyectos relacionados a la educación y soy parte de EXE Perú</p>
            <v-btn color="primary" @click="registerPage = 'entity'">Registrate</v-btn>
          </div>
        </div>
      </div>
      <form-register-entity v-if="registerPage == 'entity'"></form-register-entity>
      <form-register-particular v-if="registerPage == 'particular'"></form-register-particular>
    </v-flex>
  </v-layout>
</template>

<script>
import formRegisterEntity from '../components/formRegisterEntity'
import formRegisterParticular from '../components/formRegisterParticular'
export default {
  components: { formRegisterEntity, formRegisterParticular },
  data () {
    return {
      registerPage: 'home',
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
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

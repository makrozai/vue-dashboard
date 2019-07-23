<template>
  <v-container class="c-container-dashboard c-container-dashboard--xsmall">
    <v-layout
      wrap="true"
      justify-space-between
    >
      <v-flex
        xs12
        class="c-dashboard-title mb-4"
      >
        <h2>cambiar contraseña</h2>
      </v-flex>
      <p>Es necesario llenar los campos correctamente para poder cambiar la contraseña.</p>
      <v-flex xs12>
        <v-text-field
          :disabled="loadingSubmit"
          v-model="labels.oldpassword"
          v-validate="'required|min:8'"
          :append-icon="show3 ? 'visibility' : 'visibility_off'"
          :type="show3 ? 'text' : 'password'"
          :error-messages="errors.collect('contraseña actual')"
          label="Contraseña Actual"
          data-vv-name="contraseña actual"
          required
          box
          @click:append="show3 = !show3"
        ></v-text-field>
      </v-flex>
      <p>Recuerde generar una contraseña diferente a la anterior.</p>
      <v-flex xs12>
        <v-text-field
          :disabled="loadingSubmit"
          v-model="labels.newpassword"
          v-validate="'required|min:8'"
          :append-icon="show1 ? 'visibility' : 'visibility_off'"
          :type="show1 ? 'text' : 'password'"
          :error-messages="errors.collect('nueva contraseña')"
          label="Nueva Contraseña"
          ref="password"
          data-vv-name="nueva contraseña"
          required
          box
          @click:append="show1 = !show1"
        ></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field
          :disabled="loadingSubmit"
          v-model="labels.passwordComfirmed"
          v-validate="'required|min:8|confirmed:password'"
          :append-icon="show2 ? 'visibility' : 'visibility_off'"
          :type="show2 ? 'text' : 'password'"
          :error-messages="errors.collect('confirma nueva contraseña')"
          label="Confirma Nueva Contraseña"
          data-vv-name="confirma nueva contraseña"
          required
          box
          @click:append="show2 = !show2"
        ></v-text-field>
      </v-flex>
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
    </v-layout>
  </v-container>
</template>

<script>
import usersService from './../services/users'

import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      loadingSubmit: false,
      statusSubmit: 'primary',
      show1: false,
      show2: false,
      show3: false,
      labels: {
        id: null,
        oldpassword: '',
        newpassword: '',
        passwordComfirmed: ''
      }
    }
  },
  computed: {
    ...mapState(['userSesion'])
  },
  created () {
    this.labels.id = this.userSesion.user.id
  },
  methods: {
    ...mapActions(['setAlert']),
    submit () {
      this.loadingSubmit = true

      this.$validator.validateAll()
        .then(result => {
          if (result) {
            if(this.labels.oldpassword !== this.labels.newpassword) {
              usersService.password(this.labels)
                .then(response => {
                  this.setAlert({
                    text: response.message,
                    state: true,
                    dismissible: false,
                    type: 'success',
                    time: 5000
                  })
                  this.loadingSubmit = false
                  this.$router.push({ name: 'home' })
                })
                .catch(error => {
                  this.setAlert({
                    text: error.message,
                    state: true,
                    dismissible: false,
                    type: 'success',
                    time: 5000
                  })
                  this.loadingSubmit = false
                })
            } else {
              this.setAlert({
                text: 'debes ingresar una contraseña distinta ',
                state: true,
                dismissible: false,
                type: 'warning',
                time: 5000
              })
              this.loadingSubmit = false
            }

          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

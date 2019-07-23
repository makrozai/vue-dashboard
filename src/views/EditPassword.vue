<template>
  <v-container class="c-container-dashboard c-container-dashboard--small">
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
          v-model="passwordOld"
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
      <v-flex xs12>
        <v-text-field
          :disabled="loadingSubmit"
          v-model="password"
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
          v-model="passwordComfirmed"
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
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        loadingSubmit: false,
        statusSubmit: 'primary',
        show1: false,
        show2: false,
        show3: false,
        passwordOld: '',
        password: '',
        passwordComfirmed: ''
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>

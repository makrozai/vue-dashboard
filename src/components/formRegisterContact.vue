<template>
  <v-card>
    <v-card-text>
      <v-container grid-list-md class="pa-1">
        <form @submit.prevent="submit">

          <v-layout wrap>
            <v-flex xs12>
              <h3>EMPRESA / CONTACTO</h3>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                v-model="tempEntity.name"
                v-validate="'required'"
                :error-messages="errors.collect('razón comercial')"
                label="Razón comercial o nombre de la organización"
                data-vv-name="razón comercial"
                required
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                v-model="tempEntity.social_reason"
                v-validate="'required'"
                :error-messages="errors.collect('razón social')"
                label="Razón social"
                data-vv-name="razón social"
                required
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                v-model="tempEntity.ruc"
                v-validate="'required'"
                :error-messages="errors.collect('ruc')"
                label="RUC"
                data-vv-name="ruc"
                required
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <h3>INFORMACIÓN DE CONTACTO</h3>
            </v-flex>

            <v-flex xs6>
              <v-text-field
                v-model="tempContact.name"
                v-validate="'required'"
                :error-messages="errors.collect('nombre')"
                label="Nombre"
                data-vv-name="nombre"
                required
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                v-model="tempContact.lastname"
                v-validate="'required'"
                :error-messages="errors.collect('apellido')"
                label="Apellido"
                data-vv-name="apellido"
                required
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                v-model="tempContact.cellphone"
                v-validate="'required|integer'"
                :error-messages="errors.collect('celular')"
                label="Celular"
                data-vv-name="celular"
                required
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                v-model="tempContact.nro_doc"
                v-validate="'required|integer'"
                :error-messages="errors.collect('dni')"
                label="DNI"
                data-vv-name="dni"
                required
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                v-model="tempContact.position"
                v-validate="'required'"
                :error-messages="errors.collect('cargo')"
                label="Cargo"
                data-vv-name="cargo"
                required
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                v-model="tempContact.email"
                v-validate="'required|email'"
                :error-messages="errors.collect('email')"
                label="Correo electrónico"
                data-vv-name="email"
                required
                box
              ></v-text-field>
            </v-flex>
          </v-layout>
        </form>

      </v-container>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn large color="primary" @click="submit">Guardar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

import { mapActions } from 'vuex'
export default {
  data () {
    return {
      tempEntity: {
        name: '',
        social_reason: '',
        ruc: null,
        state: 2
      },
      tempContact: {
        name: '',
        lastname: '',
        entity_id: null,
        nro_doc: null,
        position: '',
        email: '',
        cellphone: ''
      }
    }
  },
  methods: {
    ...mapActions(['setEntity', 'saveOtherContact']),
    submit () {
      this.$validator.validateAll()
        .then(result => {
          if (result) {
            this.setEntity(this.tempEntity)
              .then(response => {
                this.tempContact.entity_id = response.id
                this.saveOtherContact(this.tempContact)
                  .then(contact => {
                    console.log(contact)
                    this.$emit('entity', response)
                  })
                  .catch(error => {
                    console.log(error)
                  })
              })
              .catch(error => {
                console.log(error)
              })
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

<template>
  <v-card class="c-form-involveds">
    <v-card-title>
      <h3>AGREGAR ENTIDAD COMPROMETIDA</h3>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-container grid-list-md class="py-0">
        <v-layout row wrap>
          <v-flex xs12>
            <v-text-field
              v-model="entityMounth.name"
              label="Razón comercial"
              box
            ></v-text-field>
          </v-flex>
          <v-flex xs6>
            <v-text-field
              label="Razón social"
              box
            ></v-text-field>
          </v-flex>
          <v-flex xs6>
            <v-text-field
              label="Ruc"
              box
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-tabs
              grow
              v-model="tab"
            >
              <v-tab>Donación</v-tab>
              <v-tab>Bienes</v-tab>
              <v-tab>Convenio</v-tab>
            </v-tabs>
          </v-flex>

          <v-flex xs12 class="mt-3">
            <v-tabs-items v-model="tab" class="c-form-involveds__tabs">
              <v-tab-item>
                <v-textarea
                  box
                  label="Descripción"
                ></v-textarea>
                <v-text-field
                  label="Monto"
                  box
                ></v-text-field>
              </v-tab-item>
              <v-tab-item>
                <v-textarea
                  box
                  label="Descripción"
                ></v-textarea>
                <v-text-field
                  label="Monto"
                  box
                ></v-text-field>
              </v-tab-item>
              <v-tab-item>
                <v-textarea
                  box
                  label="Descripción"
                ></v-textarea>
                <v-text-field
                  label="Monto"
                  box
                ></v-text-field>
              </v-tab-item>
            </v-tabs-items>
          </v-flex>
        </v-layout>
      </v-container>

    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-container class="py-1">
        <v-btn color="primary" @click="addInvolveds=false">Registrar</v-btn>
        <v-btn @click="addInvolveds=false">Cerrar</v-btn>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['entity'],
  data () {
    return {
      tab: null,
      entityMounth: {}
    }
  },
  watch: {
    entity () {
      if (this.entity === 'object' && this.entity) {
        this.entityMounth = this.entity
      }
    }
  },
  created () {
    if (this.entity === 'object' && this.entity) {
      this.entityMounth = this.entity
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>

</style>

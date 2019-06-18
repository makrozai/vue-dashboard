<template>
  <div class="c-form-program c-form-program--dialog">
    <v-card class="c-form-program__card">
      <v-card-title>
        <v-container class="pb-0">
          <h2>PROGRAMA</h2>
        </v-container>
      </v-card-title>
      <v-card-text class="pt-0">
        <v-container grid-list-md class="py-0">
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field
                disabled
                v-model="program.name"
                v-validate="'required'"
                :error-messages="errors.collect('empresa creadora')"
                label="Empresa u operador (creadora de la iniciativa)"
                data-vv-name="empresa creadora"
                required
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <h3>¿El programa es propio?</h3>
            </v-flex>
            <v-flex xs6>
              <div
                class="c-program-type"
                :class="program.type == 'propio' ? 'active':''"
                @click="changeTypeProgram('propio')"
              >
                <i class="icon-huella"></i>
                <p>
                  Propia<br>
                  El programa es de mi propia autoria como Entidad y esta registrada
                </p>
              </div>
            </v-flex>
            <v-flex xs6>
              <div
                class="c-program-type"
                :class="program.type == 'convenio' ? 'active':''"
                @click="changeTypeProgram('convenio')"
              >
                <i class="icon-archivo"></i>
                <p>
                  En convenio<br>
                  El programa le pertenece a un grupo de Entidades
                </p>
              </div>
            </v-flex>
            <!--@ formulario de programa propio-->
            <v-flex xs12 class="mt-4">
              <form-program-own v-if="program.type == 'propio'"></form-program-own>
              <form-program-group v-if="program.type == 'convenio'"></form-program-group>
            </v-flex>
            <!--@ formulario de programa propio-->
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>

    <div class="c-form-program__footer">
      <v-btn large color="primary">Guardar</v-btn>
    </div>
  </div>
</template>

<script>
import formProgramGroup from './formProgramGroup'
import formProgramOwn from './formProgramOwn'

export default {
  components: { formProgramOwn, formProgramGroup },
  data () {
    return {
      program: {
        name: 'RUC 234523432 EMPRESARIOS POR LA EDUCACIÓN',
        type: 'convenio'
      }
    }
  },
  methods: {
    changeTypeProgram (type) {
      this.program.type = type
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

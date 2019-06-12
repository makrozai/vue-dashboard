<template>
  <v-layout wrap>
    <v-flex xs8>
      <v-text-field
        v-model="program"
        v-validate="'required'"
        :error-messages="errors.collect('nombre de programa')"
        label="Nombre de programa"
        data-vv-name="nombre de programa"
        required
        box
      ></v-text-field>
      <v-select
        v-model="typeProgram"
        :items="tipoRubroItems"
        v-validate="'required'"
        :error-messages="errors.collect('tipo de programa')"
        label="Seleccionar el tipo de programa"
        data-vv-name="tipo de programa"
        required
        box
      ></v-select>
      <v-text-field
        v-model="startYear"
        v-validate="'required'"
        :error-messages="errors.collect('año de inicio')"
        label="Año de inicio"
        data-vv-name="año de inicio"
        required
        box
      ></v-text-field>
    </v-flex>
    <v-flex xs4>
      <label class="c-verify-entity__upload c-verify-entity__upload--large">
        <img :src="fileImage" alt="">
        <p>Formato válido (jpg, png), máximo 20MB</p>
        <input type="file" name="" @change="updateLocal" ref="myFiles">
      </label>
    </v-flex>
    <v-flex xs12>
      <v-textarea
        v-model="programDescription"
        v-validate="'alpha|required'"
        :error-messages="errors.collect('descripción  del programa')"
        label="Descripción del programa"
        data-vv-name="descripción  del programa"
        box
      ></v-textarea>
    </v-flex>
    <v-flex xs12>
      <h3>Tipo de servicio :</h3>
      <p>formación para el trabajo</p>
    </v-flex>
    <v-flex xs12>
      <v-text-field
        box
        label="Pagina web"
      >
        <i slot="append-outer" class="icon-home"></i>
      </v-text-field>
    </v-flex>
    <v-flex xs6>
      <v-text-field
        box
        label="Twitter"
      >
        <i slot="append-outer" class="icon-twitter"></i>
      </v-text-field>
    </v-flex>
    <v-flex xs6>
      <v-text-field
        box
        label="Facebook"
      >
        <i slot="append-outer" class="icon-facebook"></i>
      </v-text-field>
    </v-flex>
    <v-flex xs6>
      <v-text-field
        box
        label="Youtube"
      >
        <i slot="append-outer" class="icon-youtube"></i>
      </v-text-field>
    </v-flex>
    <v-flex xs6>
      <v-text-field
        box
        label="Intagram"
      >
        <i slot="append-outer" class="icon-instagram"></i>
      </v-text-field>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        program: '',
        typeProgram: '',
        programDescription: '',
        startYear: '',
        tipoRubroItems: ['Foo', 'Bar', 'Fizz', 'Buzz'],
        // eslint-disable-next-line
        fileImage: require('../assets/default-img.svg'),
      }
    },
    methods: {
      updateLocal () {
        console.log(this.$refs.myFiles.files[0])
        const file = this.$refs.myFiles.files[0]
        this.fileImage = URL.createObjectURL(file)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>

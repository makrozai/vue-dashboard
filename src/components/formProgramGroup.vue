<template>
  <v-layout wrap>
    <v-flex xs10>
      <v-combobox
        v-model="entityModel"
        :items="people"
        label="Buscar entidad propietaria del programa"
        item-text="name"
        item-value="name"
        box
      >
        <template v-slot:item="data">
          <v-list-tile-avatar>
            <img :src="data.item.avatar">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
            <v-list-tile-sub-title v-html="data.item.group"></v-list-tile-sub-title>
          </v-list-tile-content>
        </template>
      </v-combobox>

    </v-flex>
    <v-flex xs2 class="text-xs-center pt-2">
      <v-btn fab small color="primary" @click="addEntityGroup">
        <v-icon dark>add</v-icon>
      </v-btn>
    </v-flex>
    <v-flex xs12>
      <!--@ contenedor de programas-->
        <div class="c-verify-entity__add-program">
          <div class="c-verify-entity__add-program__item" v-for="(program, index) in programs" :key="index">
            <img :src="program.image" alt="">
            <div class="information">
              <p>{{ program.name }} {{ index }}</p>
              <span>{{ program.from.day }} {{ program.from.mounth }} {{ program.from.year }} hasta la actualidad</span>
            </div>
            <v-btn
              fab
              small
              outline
              color="error"
              @click="removeProgram(index)"
            >
              <v-icon dark>remove</v-icon>
            </v-btn>
          </div>
        </div>
        <!--@ contenedor de programas-->
    </v-flex>
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
      entityModel: null,
      isEditing: true,
      program: '',
      typeProgram: '',
      programDescription: '',
      startYear: '',
      tipoRubroItems: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      // eslint-disable-next-line
      fileImage: require('../assets/default-img.svg'),
      programs: [
        {
          id: 1,
          // eslint-disable-next-line
          image: require('../assets/default-img.svg'),
          name: 'Proyecto de educación APC',
          from: {
            day: 3,
            mounth: 'Febrero',
            year: 2017
          },
          to: {
            day: 3,
            mounth: 'Febrero',
            year: 2017
          }
        }
      ],
      people: [
        { name: 'Sandra Adams', group: 'Group 1', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
        { name: 'Ali Connors', group: 'Group 1', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { name: 'Trevor Hansen', group: 'Group 1', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { name: 'Tucker Smith', group: 'Group 1', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { name: 'Britta Holt', group: 'Group 1', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
        { name: 'Jane Smith ', group: 'Group 1', avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg' },
        { name: 'John Smith', group: 'Group 1', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
        { name: 'Sandra Williams', group: 'Group 1', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' }
      ]
    }
  },
  methods: {
    updateLocal () {
      console.log(this.$refs.myFiles.files[0])
      const file = this.$refs.myFiles.files[0]
      this.fileImage = URL.createObjectURL(file)
    },
    addEntityGroup () {
      console.log(this.entityModel)
      // this.programs.push(entityModel)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

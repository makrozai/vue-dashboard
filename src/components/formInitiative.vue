<template>
    <v-card class="c-form-program">
      <v-card-text>
        <v-container grid-list-md >
          <v-layout wrap>
            <h2>INICIATIVA</h2>

            <v-flex xs10>
              <v-select
                v-model="programOwn.type_program"
                :items="typeLines"
                v-validate="'required'"
                :error-messages="errors.collect('tipo de programa')"
                label="Seleccionar el tipo de programa"
                data-vv-name="tipo de programa"
                class="pt-2"
                required
                box
              ></v-select>
            </v-flex>
            <v-flex xs2 class="text-xs-center pt-3">
              <v-btn fab small color="primary">
                <i class="icon-dots"></i>
              </v-btn>
            </v-flex>
            <v-flex xs12>
              <div class="c-card-program">
                <div class="c-card-program__image">
                  <img src="../assets/default-img.svg" alt="">
                  <div class="c-card-program__image__icon">
                    <img src="../assets/icons/user.svg" alt="">
                  </div>
                </div>
                <p class="c-card-project__description">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia omnis nostrum, natus ipsam quo quidem fugit dignissimos dicta doloribus modi neque sunt ex provident. Porro enim tempora modi labore mollitia?
                </p>
              </div>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                v-model="programOwn.name"
                v-validate="'required'"
                :error-messages="errors.collect('nombre de iniciativa')"
                label="Nombre de iniciativa"
                data-vv-name="nombre de iniciativa"
                required
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-dialog
                ref="dialog"
                v-model="dateStartModal"
                :return-value.sync="date"
                lazy
                full-width
                width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="programOwn.year_start"
                    v-validate="'required'"
                    :error-messages="errors.collect('año de inicio')"
                    label="Año de inicio"
                    data-vv-name="año de inicio"
                    readonly
                    box
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="programOwn.year_start" type="month" locale="es" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="dateStartModal = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                </v-date-picker>
              </v-dialog>
            </v-flex>
            <v-flex xs6>
              <v-select
                v-model="programOwn.type_program"
                :items="typeLines"
                v-validate="'required'"
                :error-messages="errors.collect('periodo de intervención')"
                label="Periodo de intervención"
                data-vv-name="periodo de intervención"
                required
                box
              ></v-select>
            </v-flex>
            <v-flex xs12 class="mb-2">
              <h3>Entidad(es) comprometida(s)</h3>
            </v-flex>
            <v-flex xs12>
              <v-combobox
                v-model="entityModel"
                :items="people"
                label="Buscar entidad propietaria del programa"
                item-text="name"
                item-value="name"
                prepend-inner-icon="search"
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

            <v-flex xs12>
              <div class="c-card-entity">
                <div class="c-card-entity__header">
                  <v-btn fab small color="primary">
                    <v-icon>remove</v-icon>
                  </v-btn>
                  <div class="c-card-entity__title">
                    <img src="../assets/default-img.svg" alt="">
                    <div>
                      <h3><b>RUC: </b>13200214</h3>
                      <p>Grupo Graña y Montero <v-icon dark class="c-card-entity__badge">check</v-icon></p>
                    </div>
                  </div>
                  <v-btn fab small color="primary">
                    <v-icon>add</v-icon>
                  </v-btn>
                </div>
                <div class="c-card-entity__body">
                  <ul>
                    <li>
                      <b>Donación o auspicio</b>
                      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium nobis maiores suscipit quo quae.</p>
                      <b>S/ 95 552.00</b>
                    </li>
                    <li>
                      <b>Bienes y servicios</b>
                      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium nobis maiores suscipit quo quae.</p>
                      <b>S/ 95 552.00</b>
                    </li>
                  </ul>
                </div>

              </div>
              <div class="c-card-entity">
                <div class="c-card-entity__header">
                  <v-btn fab small color="primary">
                    <v-icon>remove</v-icon>
                  </v-btn>
                  <div class="c-card-entity__title">
                    <img src="../assets/default-img.svg" alt="">
                    <div>
                      <h3><b>RUC: </b>13200214</h3>
                      <p>Combativa SAC <v-icon dark class="c-card-entity__badge">check</v-icon></p>
                    </div>
                  </div>
                  <v-btn fab small color="primary">
                    <v-icon>add</v-icon>
                  </v-btn>
                </div>
                <div class="c-card-entity__body">
                  <ul>
                    <li>
                      <b>Convenios</b>
                      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                      <b>S/ 95 552.00</b>
                    </li>
                  </ul>
                </div>

              </div>
            </v-flex>

          </v-layout>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-container class="py-0">
          <v-btn large color="primary" @click="submit">Guardar</v-btn>
        </v-container>

      </v-card-actions>
    </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['userSesion']),
    entityFullName () {
      let fullname = 'RUC ' + this.userSesion.entity.ruc + ' ' + this.userSesion.entity.name
      return fullname.toUpperCase()
    }
  },
  data () {
    return {
      date: new Date().toISOString().substr(0, 7),
      dateStartModal: false,

      stateSubmit: false,
      type_program: 'propio',
      programOwn: {
        name: '',
        type_program: null,
        year_start: null,
        description: null,
        website: '',
        social: {
          twitter: '',
          facebook: '',
          youtube: '',
          instagram: ''
        }
      },
      // placeholder
      // eslint-disable-next-line
      fileImage: require('../assets/default-img.svg'),
      typeLines: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      people: [
        { name: 'Sandra Adams', group: 'Group 1', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
        { name: 'Ali Connors', group: 'Group 1', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { name: 'Trevor Hansen', group: 'Group 1', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { name: 'Tucker Smith', group: 'Group 1', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { name: 'Britta Holt', group: 'Group 1', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
        { name: 'Jane Smith ', group: 'Group 1', avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg' },
        { name: 'John Smith', group: 'Group 1', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
        { name: 'Sandra Williams', group: 'Group 1', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' }
      ],
      entitiesPlaceholder: [
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
      entityModel: null,
      isEditing: true
    }
  },
  methods: {
    changeTypeProgram (type) {
      this.type_program = type
    },
    formData (response) {
      console.log(response)
    },
    submit () {
      this.$validator.validateAll()
        .then(result => {
          if (result) {
            console.log('hello')
            console.log(this.programOwn)
          } else {
            console.log('bye')
          }
        })
    },
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

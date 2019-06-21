<template>
    <v-card class="c-form-program">
      <v-card-text>
        <v-container grid-list-md >
          <v-layout wrap>
            <h2>INICIATIVA</h2>

            <v-flex xs12 class="c-input__button-action">
              <v-select
                v-model="initiativeData.program"
                :items="programs"
                item-text="name"
                item-value="name"
                v-validate="'required'"
                :error-messages="errors.collect('programa')"
                label="Seleccionar el programa"
                data-vv-name="programa"
                class="pt-2"
                required
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
              </v-select>
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
                v-model="initiativeData.name"
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
                :return-value.sync="initiativeData.date"
                lazy
                full-width
                width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="initiativeData.date"
                    v-validate="'required'"
                    :error-messages="errors.collect('año de inicio')"
                    label="Año de inicio"
                    data-vv-name="año de inicio"
                    readonly
                    box
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="initiativeData.date" type="month" locale="es" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="dateStartModal = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.dialog.save(initiativeData.date)">OK</v-btn>
                </v-date-picker>
              </v-dialog>
            </v-flex>
            <v-flex xs6>
              <v-select
                v-model="initiativeData.period"
                :items="typeLines"
                item-text="name"
                item-value="id"
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
            <!--autocompletado-->
            <v-flex xs12>
              <v-combobox
                v-model="entitySelect"
                :items="people"
                label="Buscar entidad comprometida"
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
            <!--autocompletado-->
            <v-flex xs12>
              <card-entity :entities="entitiesParticipans"></card-entity>
            </v-flex>
            <v-flex xs12 class="mb-2">
              <h3>Beneficiados</h3>
            </v-flex>
            <!--autocompletado-->
            <v-flex xs12>
              <v-combobox
                v-model="benefitSelect"
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
            <!--autocompletado-->
            <v-flex xs12 class="mb-4">
              <card-benefit :entities="benefitiesParticipans"></card-benefit>
            </v-flex>
            <v-flex xs7>
              <p>Indicar el monto en soles de la inversión generada en la iniciativa</p>
            </v-flex>
            <v-flex xs5>
              <v-text-field
                v-model="initiativeData.inversion"
                v-validate="'required'"
                :error-messages="errors.collect('Inversión')"
                label="Inversión"
                data-vv-name="Inversión"
                required
                box
              ></v-text-field>
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
import CardEntity from './cardEntity'
import CardBenefit from './cardBenefit'

export default {
  components: { CardEntity, CardBenefit },
  computed: {
    ...mapState(['userSesion']),
    entityFullName () {
      let fullname = 'RUC ' + this.userSesion.entity.ruc + ' ' + this.userSesion.entity.name
      return fullname.toUpperCase()
    }
  },
  data () {
    return {
      dateStartModal: false,
      initiativeData: {
        program: null,
        name: '',
        date: new Date().toISOString().substr(0, 7),
        period: null,
        inversion: null
      },
      // placeholder
      entitySelect: null,
      benefitSelect: null,
      entitiesParticipans: [
        {
          ruc: '13200214',
          name: 'Grupo Graña y Montero',
          status: 'verify',
          participations: [
            {
              title: 'Donación o auspicio',
              description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium nobis maiores suscipit quo quae.',
              price: '95 552.00'
            },
            {
              title: 'Bienes y servicios',
              description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium nobis maiores suscipit quo quae.',
              price: '95 552.00'
            }
          ]
        },
        {
          ruc: '13200214',
          name: 'Combativa SAC',
          status: 'verify',
          participations: [
            {
              title: 'Convenio',
              description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
              price: '95 552.00'
            }
          ]
        }
      ],
      benefitiesParticipans: [
        {
          type: 'Institución educativa',
          name: 'Colegio educativo San Nicolas',
          address: {
            region: 'La Libertad',
            province: 'Trujillo',
            district: 'Trujillo'
          }
        },
        {
          type: 'Docente',
          name: 'Colegio Inicial 203 San Martín',
          address: {
            region: 'Lima',
            province: 'Lima',
            district: 'Santiago de Surco'
          }
        },
        {
          type: 'Zona geográfica-comunidad',
          name: 'Santa Rosa de Lima',
          address: {
            region: 'La Libertad',
            province: 'Trujillo',
            district: 'Trujillo'
          }
        }
      ],
      // eslint-disable-next-line
      typeLines: [
        {
          id: 1,
          name: '1 mes'
        },
        {
          id: 2,
          name: '2 meses'
        },
        {
          id: 3,
          name: '3 meses'
        },
        {
          id: 4,
          name: '4 meses'
        },
        {
          id: 5,
          name: '5 meses'
        },
        {
          id: 5,
          name: '5 meses'
        },
        {
          id: 6,
          name: '6 meses'
        },
        {
          id: 7,
          name: '7 meses'
        },
        {
          id: 8,
          name: '8 meses'
        },
        {
          id: 9,
          name: '9 meses'
        },
        {
          id: 10,
          name: '10 meses'
        },
        {
          id: 11,
          name: '11 meses'
        },
        {
          id: 12,
          name: '12 meses'
        },
        {
          id: 13,
          name: '13 meses'
        },
        {
          id: 14,
          name: '14 meses'
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
      ],
      programs: [
        { name: 'PROGRAMA 1', group: 'Año de inicio', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
        { name: 'PROGRAMA 2', group: 'Año de inicio', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { name: 'PROGRAMA 3', group: 'Año de inicio', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' }
      ],
    }
  },
  methods: {
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
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

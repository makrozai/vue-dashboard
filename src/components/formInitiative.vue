<template>
    <v-card class="c-form-program">
      <v-card-text>
        <v-container grid-list-md >
          <v-layout wrap>
            <h2>INICIATIVA</h2>

            <v-flex xs12 class="c-input__button-action">
              <v-select
                v-model="programSelected"
                :items="allPrograms"
                item-text="name"
                item-value="id"
                v-validate="'required'"
                return-object
                :error-messages="errors.collect('programa')"
                label="Seleccionar el programa"
                data-vv-name="programa"
                class="pt-2"
                required
                box
              >
                <template v-slot:item="data">
                  <v-list-tile-avatar>
                    <img :src="data.item.logo_image_link || require('../assets/default-img.svg')">
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="data.item.type_program_name"></v-list-tile-sub-title>
                  </v-list-tile-content>
                </template>
              </v-select>
              <v-btn fab small color="primary">
                <i class="icon-dots"></i>
              </v-btn>
            </v-flex>

            <v-flex xs12>
              <div class="c-card-program" v-if="programSelected">
                <div class="c-card-program__image">
                  <img :src="programSelected.logo_image_link || require('../assets/default-img.svg')" alt="">
                  <div class="c-card-program__image__icon" v-if="programSelected.entities.length !== 0">
                    <img  :src="programSelected.entities[0].logo_image_link || require('../assets/icons/user.svg')" alt="">
                  </div>
                </div>
                <p class="c-card-project__description">
                  {{ programSelected.description }}
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
                :return-value.sync="initiativeData.start_date"
                lazy
                full-width
                width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="initiativeData.start_date"
                    v-validate="'required'"
                    :error-messages="errors.collect('año de inicio')"
                    label="Año de inicio"
                    data-vv-name="año de inicio"
                    readonly
                    box
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="initiativeData.start_date" type="month" locale="es" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="dateStartModal = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.dialog.save(initiativeData.start_date)">OK</v-btn>
                </v-date-picker>
              </v-dialog>
            </v-flex>
            <v-flex xs6>
              <v-select
                v-model="initiativeData.intervention_period"
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
            <v-flex xs12 class="c-input__button-action">
              <v-combobox
                v-model="entitySelect"
                :items="allEntities"
                label="Buscar entidad comprometida"
                item-text="name"
                item-value="id"
                prepend-inner-icon="search"
                box
              >
                <template v-slot:item="data">
                  <v-list-tile-avatar>
                    <img :src="data.item.logo_image_link || require('../assets/default-img.svg')">
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="data.item.ruc"></v-list-tile-sub-title>
                  </v-list-tile-content>
                </template>
              </v-combobox>
              <v-btn fab small color="primary" class="mt-2" @click="registerInvolved">
                <v-icon>add</v-icon>
              </v-btn>

              <v-dialog
                ref="dialog"
                v-model="addInvolveds"
                lazy
                full-width
                width="500px"
              >
                <form-involved :entity="openEntityInvoled" :change-value="checkOtherEntity" @involed="AddInvoled"></form-involved>
              </v-dialog>

            </v-flex>

            <!--autocompletado-->
            <v-flex xs12>
              <card-entity :entities="entitiesParticipans"></card-entity>
            </v-flex>
            <v-flex xs12 class="mb-2">
              <h3>Beneficiados</h3>
            </v-flex>
            <!--autocompletado-->
            <v-flex xs12 class="c-input__button-action">
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
              <v-btn fab small color="primary" class="mt-2" @click="registerBeneficiare">
                <v-icon>add</v-icon>
              </v-btn>

              <v-dialog
                ref="dialog"
                v-model="addBeneficiaries"
                lazy
                full-width
                width="500px"
              >
                <form-beneficiaries></form-beneficiaries>
              </v-dialog>
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
                v-model="initiativeData.total_investment_amount"
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
import { mapState, mapGetters, mapActions } from 'vuex'
import CardEntity from './cardEntity'
import CardBenefit from './cardBenefit'
import FormInvolved from './formInvolved'
import FormBeneficiaries from './formBeneficiaries'

export default {
  components: { CardEntity, CardBenefit, FormInvolved, FormBeneficiaries },
  computed: {
    ...mapState(['userSesion', 'allPrograms', 'allEntities']),
    ...mapGetters(['getOnlyEntity']),
    entityFullName () {
      let fullname = 'RUC ' + this.userSesion.entity.ruc + ' ' + this.userSesion.entity.name
      return fullname.toUpperCase()
    }
  },
  data () {
    return {
      checkOtherEntity: false,
      addInvolveds: false,
      addBeneficiaries: false,
      programSelected: null,
      dateStartModal: false,
      initiativeData: {
        program_id: null,
        name: '',
        start_date: new Date().toISOString().substr(0, 7),
        intervention_period: null,
        total_investment_amount: null
      },
      // placeholder
      openEntityInvoled: null,
      entityAddDialog: null,
      entitySelect: null,
      benefitSelect: null,
      entitiesParticipans: [],
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
      ]
    }
  },
  created () {
    if (this.allPrograms.length === 0) {
      // en caso el usuario es tipo entidad
      if (this.userSesion.user.type_user_id === 2) {
        this.getAllPrograms({ entity_id: this.userSesion.user.entity.id })
          .then(response => {

          })
      }
      // en caso el usuario es tipo administrador
      if (this.userSesion.user.type_user_id === 1) {
        this.getAllPrograms()
          .then(response => {

          })
      }
    }
    if (this.allEntities.length === 0) {
      this.getAllEntities({ state_in: '1,2,4' })
    }
  },
  methods: {
    ...mapActions([ 'getAllPrograms', 'getAllEntities', 'getAllBeneficiaries' ]),
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
    registerInvolved () {
      // se ejecuta cuando se desea abrir el modal

      this.checkOtherEntity = !this.checkOtherEntity
      // abre el modal
      this.addInvolveds = true
      // prepara el objeto de entidad para enviarlo al modal
      this.openEntityInvoled = this.entitySelect
    },
    registerBeneficiare () {
      // abre el modal
      this.addBeneficiaries = true
    },
    AggreEntityInvoled (involeds) {
      let onliEntity = this.getOnlyEntity(involeds.entity_id)
      let objectInvoled = {
        entity_id: onliEntity.id,
        ruc: onliEntity.ruc,
        name: onliEntity.name,
        status: onliEntity.state,
        participations: involeds.participations,
        logo_image_link: onliEntity.logo_image_link
      }
      return objectInvoled
    },
    AddInvoled (value) {
      this.addInvolveds = false
      let generateInvoled = Object.assign({}, value)
      let arrayParticipations = this.deleteReactive(value.participations)
      generateInvoled.participations = arrayParticipations

      let responseInvoled = {
        entity_id: generateInvoled.entity_id,
        participations: arrayParticipations
      }
      console.log(responseInvoled)
      this.entitiesParticipans.push(this.AggreEntityInvoled(responseInvoled))
    },
    deleteReactive (arrayReactive) {
      let returnNoReactive = []
      arrayReactive.forEach(element => {
        returnNoReactive.push(Object.assign({}, element))
      })
      return returnNoReactive
    },
    validEntityEnvoled (id) {
      this.entitiesParticipans.forEach(element => {
        if (element.entity_id === id) {
          console.log('entidad repetida')
          return true
        }
      })
      return false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

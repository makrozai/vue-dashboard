<template>
  <v-card class="c-form-program">
    <v-card-text>
      <v-container grid-list-md >
        <v-layout wrap>
          <h2>INICIATIVA</h2>

          <v-flex xs12>
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
          </v-flex>

          <v-flex xs12>
            <div class="c-card-program" v-if="programSelected">
              <div class="c-card-program__image">
                <img :src="programSelected.logo_image_link || require('../assets/default-img.svg')" alt="">
                <div class="c-card-program__image__icon" v-if="programSelected.entities.length !== 0 && programSelected.entities[0].logo_image_link">
                  <img :src="programSelected.entities[0].logo_image_link" alt="">
                </div>
              </div>
              <p class="c-card-project__description" v-html="programSelected.description.substr(0,160) + ' ...' ">
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
          <v-flex xs5>
            <v-dialog
              ref="dialogDate"
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
                  :error-messages="errors.collect('fecha de inicio')"
                  label="Fecha de inicio"
                  data-vv-name="fecha de inicio"
                  @keyup.enter="submit"
                  required
                  readonly
                  box
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                ref="picker"
                v-model="initiativeData.start_date"
                type="month"
                locale="es"
                :max="new Date().toISOString().substr(0, 10)"
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="dateStartModal = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.dialogDate.save(initiativeData.start_date)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-flex>
          <v-flex xs4>
            <v-text-field
              v-model="initiativeData.intervention_period"
              v-validate="'required|integer|max:4'"
              :error-messages="errors.collect('periodo')"
              label="Periodo"
              data-vv-name="periodo"
              required
              box
            ></v-text-field>
          </v-flex>
          <v-flex xs3>
            <p class="mt-2 c-period__text">meses de <br> actividad</p>
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
              @keyup.enter="registerInvolved"
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
            <v-btn color="primary" class="mt-2" @click="registerInvolved">
              Agregar
            </v-btn>

          </v-flex>
          <v-dialog
            v-model="addInvolveds"
            lazy
            full-width
            width="500px"
            persistent
          >
            <form-involved :entity="openEntityInvoled" :change-value="checkOtherEntity" @involed="AddInvoled" @modal-close="closeInvoled"></form-involved>
          </v-dialog>
          <v-dialog
            v-model="EditInvolveds"
            lazy
            full-width
            width="500px"
            persistent
          >
            <form-involved-edit :entity="editEntityInvoled" @modal-close="closeInvoled" @change-value="changeInvoled"></form-involved-edit>
          </v-dialog>

          <!--autocompletado-->
          <v-flex xs12>
            <card-entity v-if="cardEntitiesVisibility" :entities="entitiesParticipans" @remove-item="removeInvoled" @edit-item="editInvoled"></card-entity>
          </v-flex>
          <v-flex xs12 class="mb-2">
            <h3>Beneficiados</h3>
          </v-flex>
          <!--autocompletado-->
          <v-flex xs12 class="c-input__button-action">
            <v-combobox
              v-model="benefitSelect"
              :items="allBeneficiaries"
              label="Buscar entidad propietaria del programa"
              item-text="name"
              item-value="id"
              prepend-inner-icon="search"
              @keyup.enter="registerBeneficiare"
              return-object
              box
            >
            </v-combobox>
            <v-btn color="primary" class="mt-2" @click="registerBeneficiare">
              Agregar
            </v-btn>

            <v-dialog
              v-model="addBeneficiaries"
              lazy
              full-width
              width="500px"
              persistent
            >
              <form-beneficiaries @beneficiary="addBeneficiary" @modal-close="closeBeneficiaries"></form-beneficiaries>
            </v-dialog>

            <v-dialog
              v-model="editBeneficiaryDialog"
              lazy
              full-width
              width="500px"
              persistent
            >
              <form-beneficiaries-edit :entity="editBeneficiaryData" @beneficiary="editBeneficiaryUpdate" @modal-close="closeEditBeneficiaries"></form-beneficiaries-edit>
            </v-dialog>
          </v-flex>
          <!--autocompletado-->
          <v-flex xs12 class="mb-4">
            <card-benefit :entities="benefitiesParticipans" @delete="deleteBeneficiary" @edit="editBeneficiary"></card-benefit>
          </v-flex>
          <v-flex xs7>
            <p>Indicar el monto en soles de la inversión generada en la iniciativa</p>
          </v-flex>
          <v-flex xs5>
            <v-text-field
              v-model="initiativeData.total_investment_amount"
              v-validate="'integer'"
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
import FormInvolvedEdit from './formInvolvedEdit'
import FormBeneficiaries from './formBeneficiaries'
import FormBeneficiariesEdit from './formBeneficiariesEdit'

export default {
  components: { CardEntity, CardBenefit, FormInvolved, FormInvolvedEdit, FormBeneficiaries, FormBeneficiariesEdit },
  computed: {
    ...mapState(['userSesion', 'allPrograms', 'allEntities', 'allBeneficiaries']),
    ...mapGetters(['getOnlyEntity']),
    entityFullName () {
      let fullname = 'RUC ' + this.userSesion.entity.ruc + ' ' + this.userSesion.entity.name
      return fullname.toUpperCase()
    }
  },
  data () {
    return {
      cardEntitiesVisibility: true,
      checkOtherEntity: false,
      addInvolveds: false,
      EditInvolveds: false,
      addBeneficiaries: false,
      programSelected: null,
      dateStartModal: false,
      initiativeData: {
        program_id: null,
        name: '',
        start_date: null,
        intervention_period: null,
        total_investment_amount: null
      },
      editBeneficiaryDialog: false,
      editBeneficiaryData: null,
      editEntityInvoled: null,
      // placeholder
      openEntityInvoled: null,
      entityAddDialog: null,
      entitySelect: null,
      benefitSelect: null,
      entitiesParticipans: [],
      benefitiesParticipans: []
    }
  },
  watch: {
    dateStartModal (value) {
      value && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
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

    if (this.allBeneficiaries.length === 0) {
      this.getAllBeneficiaries()
        .then(response => {
        })
    }
  },
  mounted () {
    if (document.querySelector('.c-card-fixed')) {
      let fixedCard = document.querySelectorAll('.c-card-fixed')

      fixedCard.forEach(element => {
        let fixedCardAction = element.querySelector('.v-card__actions').clientHeight
        let fixedCardText = element.querySelector('.v-card__text')

        // define la altura del contenedor
        fixedCardText.style.height = window.innerHeight - fixedCardAction + 'px'
        // agrega marginBottom al contenedor
        fixedCardText.style.marginBottom = fixedCardAction + 'px'
      })
    }
  },
  methods: {
    ...mapActions([ 'getAllPrograms', 'getAllEntities', 'getAllBeneficiaries', 'saveInitiative', 'setAlert' ]),
    submit () {
      this.$validator.validateAll()
        .then(result => {
          if (result) {
            if (this.entitiesParticipans.length === 0 || this.benefitiesParticipans.length === 0) {
              this.setAlert({
                text: 'Es necesario agregar participantes o beneficiarios',
                state: true,
                dismissible: false,
                type: 'error',
                time: 3000
              })
            } else {
              let arrayBeneficiaries = []
              this.initiativeData.start_date = this.initiativeData.start_date + '-01'
              this.benefitiesParticipans.forEach(element => {
                arrayBeneficiaries.push(element.id)
              })
              let submitData = {
                involveds: this.entitiesParticipans,
                beneficiaries: arrayBeneficiaries
              }
              this.initiativeData.program_id = this.programSelected.id
              submitData = Object.assign(submitData, this.initiativeData)

              this.saveInitiative(submitData)
                .then(response => {
                  this.$emit('modal-state', false)
                })
                .then(() => {
                  this.resetLabels()
                })
            }
          } else {
            console.log('valid no correct')
          }
        })
    },
    registerInvolved () {
      let validationDoble = false
      if (this.entitySelect && this.entitySelect.id) {
        this.entitiesParticipans.forEach(involed => {
          if (involed.entity_id === this.entitySelect.id) {
            this.setAlert({
              text: 'No puede duplicar la entidad',
              state: true,
              dismissible: false,
              type: 'warning',
              time: 3000
            })
            validationDoble = true
          }
        })
      }
      if (!validationDoble) {
        // se ejecuta cuando se desea abrir el modal
        this.checkOtherEntity = !this.checkOtherEntity
        // abre el modal
        this.addInvolveds = true
        // prepara el objeto de entidad para enviarlo al modal
        this.openEntityInvoled = this.entitySelect
      }
    },
    registerBeneficiare () {
      let validationDoble = false
      if (this.benefitSelect && this.benefitSelect.id) {
        this.benefitiesParticipans.forEach(beneficiarie => {
          if (beneficiarie.id === this.benefitSelect.id) {
            this.setAlert({
              text: 'No puede duplicar la entidad',
              state: true,
              dismissible: false,
              type: 'warning',
              time: 3000
            })
            validationDoble = true
          }
        })
      }
      if (!validationDoble) {
        // valida si el formulario debe se abrirse
        if (this.benefitSelect !== null && typeof this.benefitSelect === 'object') {
          this.benefitiesParticipans.push(Object.assign({}, this.benefitSelect))
          this.benefitSelect = null
        } else {
          // abre el modal
          this.addBeneficiaries = true
        }
      }
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
    },
    addBeneficiary (value) {
      // agrega el beneficiario al arreglo
      let propBeneficiary = Object.assign({}, value)
      this.benefitiesParticipans.push(propBeneficiary)
      // cierra el modal
      this.addBeneficiaries = false
    },
    deleteBeneficiary (value) {
      this.benefitiesParticipans.splice(value, 1)
    },
    editBeneficiary (value) {
      // abre modal
      this.editBeneficiaryDialog = true
      // envia datos al modal
      this.editBeneficiaryData = this.benefitiesParticipans[value]
    },
    editBeneficiaryUpdate () {
      // cerrar modal
      this.editBeneficiaryDialog = false
    },
    closeInvoled (value) {
      this.addInvolveds = value
    },
    closeBeneficiaries (value) {
      this.addBeneficiaries = value
    },
    closeEditBeneficiaries (value) {
      this.editBeneficiaryDialog = value
    },
    resetLabels () {
      this.entitiesParticipans = []
      this.benefitiesParticipans = []
      this.initiativeData.program_id = null
      this.initiativeData.name = ''
      this.initiativeData.start_date = null
      this.initiativeData.intervention_period = null
      this.initiativeData.total_investment_amount = null
      this.programSelected = null
      this.entitySelect = null
      this.$validator.reset()
    },
    removeInvoled (index) {
      this.entitiesParticipans.splice(index, 1)
    },
    editInvoled (index) {
      this.EditInvolveds = true
      this.editEntityInvoled = this.entitiesParticipans[index]
    },
    changeInvoled (data) {
      this.EditInvolveds = false
      this.cardEntitiesVisibility = false
      this.entitiesParticipans.forEach((element, index) => {
        // eslint-disable-next-line
        if (element.entity_id = data.entity_id) {
          this.entitiesParticipans[index] = data

          setTimeout(() => {
            this.cardEntitiesVisibility = true
          }, 1)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

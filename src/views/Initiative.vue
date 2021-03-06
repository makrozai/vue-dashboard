<template>
  <v-container class="c-container-dashboard">
    <v-layout
      wrap="true"
      justify-space-between
    >
      <v-flex
        xs12 md6 lg8
        class="c-dashboard-title"
      >
        <h2>iniciativa</h2>

        <v-text-field
          class="c-dashboard-title__input"
          box
          label="Buscar una iniciativa"
          hide-details
          prepend-inner-icon="search"
          v-model="search"
        ></v-text-field>
      </v-flex>
      <v-flex
        xs12 md6 lg4
        class="c-dashboard-input"
      >
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              fab
              small
              outline
              color="primary"
              class="c-button-refresh"
              v-on="on"
              @click="refreshInitiative"
            >
              <i class="icon-refresh"></i>
            </v-btn>
          </template>
          <span>Actualiza</span>
        </v-tooltip>

        <v-btn
          v-if="userSesion.user.type_user_id !== 3"
          large
          color="primary"
          class="my-0 mr-0"
          @click.stop="formDrawner = !formDrawner"
        >
          Crear una iniciativa
        </v-btn>

      </v-flex>
      <v-flex
        xs12
        class="mt-4"
        v-if="!noData"
      >
        <v-data-table
          :headers="headers"
          :items="allInitiatives"
          item-key="id"

          :search="search"
          class="c-data-table"
          :pagination.sync="pagination"
        >
          <template v-slot:items="props">
            <td>
              <div class="c-data-table__initiative" @click="openEditForm(props.item)">
                <img src="../assets/default-img.svg" alt="">
                <div class="c-data-table__initiative__description">
                  <p><b>{{ props.item.name }}</b></p>
                  <template v-if="allEntities.length > 0 && allPrograms.length  > 0">
                    <p>{{ nameProgram(props.item.program_id) }}</p>
                    <p>{{ nameEntity(props.item.program_id) }}</p>
                  </template>
                </div>

              </div>
            </td>
            <td class="text-sm-right">{{ props.item.intervention_period }} meses</td>
            <td class="text-sm-right">S./ {{ props.item.total_investment_amount }}</td>
            <td class="c-data-table__status">
              <span>CREADO</span>
              <span>{{ props.item.start_date | date-no-day }}</span>
            </td>
          </template>
        </v-data-table>
      </v-flex>

      <v-flex xs12 class="mt-5" v-if="noData">
        <div class="c-not-data">
          <h3>Aún no se ha cargado una iniciativa</h3>
          <p>Posiblemente no tenga ninguna iniciativa vigente, en caso contrario click en el botón</p>
          <v-btn
            large
            color="primary"
            @click.stop="formDrawner = !formDrawner"
          >
            Crear iniciativa
          </v-btn>
        </div>
      </v-flex>

      <v-navigation-drawer
        v-model="formDrawner"
        temporary
        right
        fixed
        width="550"
      >
        <form-initiative class="u-form--white c-card-fixed" @modal-state="responseInitiative"></form-initiative>
      </v-navigation-drawer>

      <v-navigation-drawer
        v-model="formDrawnerEdit"
        temporary
        right
        fixed
        width="550"
      >
        <form-initiative-edit class="u-form--white c-card-fixed" :initiative="selectInitiative" @modal-state="responseInitiative"></form-initiative-edit>
      </v-navigation-drawer>
    </v-layout>
  </v-container>
</template>

<script>
import FormInitiative from '../components/formInitiative'
import FormInitiativeEdit from '../components/formInitiativeEdit'

import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  components: { FormInitiative, FormInitiativeEdit },
  computed: {
    ...mapState(['userSesion', 'allInitiatives', 'allEntities', 'allPrograms', 'userSesion', 'allBeneficiaries']),
    ...mapGetters(['getOnlyEntity', 'getOnlyProgram'])
  },
  data () {
    return {
      noData: false,
      search: '',
      formDrawner: null,
      formDrawnerEdit: null,

      pagination: {
        rowsPerPage: 25,
        descending: true
      },
      headers: [
        {
          text: 'Nombre',
          align: 'left',
          value: 'name',
          sortable: false
        },
        {
          text: 'Periodo',
          value: 'intervention_period',
          align: 'right',
          sortable: false
        },
        {
          text: 'Inversion',
          value: 'total_investment_amount',
          align: 'right',
          sortable: false
        },
        {
          text: '',
          value: 'start_date',
          align: 'center',
          sortable: true
        }
      ],
      selectInitiative: null
    }
  },
  created () {
    if (this.allBeneficiaries.length === 0) {
      this.getAllBeneficiaries()
        .then(response => { console.log('carga de beneficiarios exitosa') })
        .catch(error => { console.log('error al cargar beneficiarios', error) })
    }
  },
  methods: {
    ...mapActions(['getAllInitiatives', 'getAllBeneficiaries']),
    nameProgram (id) {
      let name = this.getOnlyProgram(id)
      return name.name
    },
    nameEntity (id) {
      let program = this.getOnlyProgram(id).owner_id
      let name = this.getOnlyEntity(program)

      if (name) {
        return name.name
      } else {
        return 'no cuenta con entidad'
      }
    },
    responseInitiative (value) {
      this.formDrawner = value
    },
    refreshInitiative () {
      this.getAllInitiatives()
        .then(response => {
          if (this.allInitiatives.length === 0) {
            this.noData = true
          }
        })
    },
    openEditForm (item) {
      this.selectInitiative = item
      this.formDrawnerEdit = !this.formDrawnerEdit
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

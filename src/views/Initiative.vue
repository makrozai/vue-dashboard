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
        ></v-text-field>
      </v-flex>
      <v-flex
        xs12 md6 lg4
        class="c-dashboard-input"
      >
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
      >
        <v-data-table
          :headers="headers"
          :items="allInitiatives"
          item-key="id"
          class="c-data-table"
          :pagination.sync="pagination"
        >
          <template v-slot:items="props">
            <td>
              <div class="c-data-table__initiative">
                <img src="../assets/default-img.svg" alt="">
                <div class="c-data-table__initiative__description">
                  <p><b>{{ props.item.name }}</b></p>
                  <p>{{ getOnlyProgram(props.item.program_id).name }}</p>
                  <p>{{ getOnlyEntity(getOnlyProgram(props.item.program_id).owner_id).name }}</p>
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

      <v-navigation-drawer
        v-model="formDrawner"
        temporary
        right
        fixed
        width="550"
      >
        <form-initiative class="u-form--white c-card-fixed"></form-initiative>
      </v-navigation-drawer>
    </v-layout>
  </v-container>
</template>

<script>
import FormInitiative from '../components/formInitiative'
import MProgramaTable from '../components/programaTable'

import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  components: { MProgramaTable, FormInitiative },
  computed: {
    ...mapState(['userSesion', 'allInitiatives']),
    ...mapGetters(['getOnlyEntity', 'getOnlyProgram'])
  },
  data () {
    return {
      formDrawner: null,

      pagination: {
        rowsPerPage: 25
      },
      headers: [
        {
          text: 'Nombre',
          align: 'left',
          value: 'name'
        },
        {
          text: 'Periodo',
          value: 'intervention_period',
          align: 'right'
        },
        {
          text: 'Inversion',
          value: 'total_investment_amount',
          align: 'right'
        },
        {
          text: '',
          value: 'start_date',
          align: 'center'
        }
      ]
    }
  },
  created () {
    if(this.allInitiatives.length === 0) {
      this.getAllInitiatives()
    }
  },
  methods: {
    ...mapActions(['getAllInitiatives'])
  }
}
</script>

<style lang="scss" scoped>

</style>

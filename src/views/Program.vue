<template>
  <v-container class="c-container-dashboard">
    <v-layout
      wrap
      justify-space-between
    >
      <v-flex
        xs12 md6 lg8
        class="c-dashboard-title"
      >
        <h2>programa</h2>

        <v-text-field
          class="c-dashboard-title__input"
          box
          label="Busqueda de programa"
          prepend-inner-icon="search"
          hide-details
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
              @click="refreshProgram"
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
          class="mr-0 my-0"
          @click.stop="formDrawner = !formDrawner"
        >
          Crear Programa
        </v-btn>

      </v-flex>
      <v-flex
        xs12
        class="mt-5"
        v-if="!noData"
      >
        <v-data-table
          :headers="headers"
          :items="allPrograms"
          item-key="id"
          class="c-data-table"
          :search="search"
          :pagination.sync="pagination"
        >
          <template v-slot:items="props">
            <td>
              <div class="c-data-table__program" @click="openDetail(props.item)">
                <img :src="props.item.logo_image_link || require('../assets/default-img.svg')" alt="">
                <div class="c-data-table__program__description">
                  <p><b>{{ props.item.name }}</b></p>
                  <p>{{ getnameEntity(props.item.entities[0]) }}</p>
                </div>

              </div>
            </td>
            <td class="text-sm-center">
              <v-tooltip top v-if="props.item.website">
                <template v-slot:activator="{ on }">
                  <a v-on="on" href="#!" class="mx-1">
                    <v-icon color="black">web_asset</v-icon>
                  </a>
                </template>
                <span>{{ props.item.website }}</span>
              </v-tooltip>
              <v-tooltip top v-if="props.item.facebook">
                <template v-slot:activator="{ on }">
                  <a v-on="on" href="#!" class="mx-1">
                    <i class="icon-facebook v-icon material-icons theme--light black--text"></i>
                  </a>
                </template>
                <span>{{ props.item.facebook }}</span>
              </v-tooltip>
              <v-tooltip top v-if="props.item.twitter">
                <template v-slot:activator="{ on }">
                  <a v-on="on" href="#!" class="mx-1">
                    <div class="icon-twitter v-icon material-icons theme--light black--text"></div>
                  </a>
                </template>
                <span>{{ props.item.twitter }}</span>
              </v-tooltip>
              <v-tooltip top v-if="props.item.instagram">
                <template v-slot:activator="{ on }">
                  <a v-on="on" href="#!" class="mx-1">
                    <div class="icon-instagram v-icon material-icons theme--light black--text"></div>
                  </a>
                </template>
                <span>{{ props.item.instagram }}</span>
              </v-tooltip>
            </td>
            <td>{{ props.item.type_program_name }}</td>
            <td class="c-data-table__status">
              <span>CREADO</span>
              <span>{{ props.item.start_date | date-no-day }}</span>
            </td>
          </template>
        </v-data-table>
      </v-flex>

      <v-flex xs12 class="mt-5" v-if="noData">
        <div class="c-not-data">
          <h3>No se encontró ningún programa</h3>
          <p>Es necesario como entidad registrada, tener programas para la implementación de iniciativas. Por favor, crea el tuyo.</p>
          <v-btn
            large
            color="primary"
            @click.stop="formDrawner = !formDrawner"
          >
            Crear Programa
          </v-btn>
        </div>
      </v-flex>

      <v-navigation-drawer
        v-if="userSesion.user.type_user_id !== 3"
        v-model="formDrawner"
        temporary
        right
        fixed
        width="550"
      >
        <form-program class="u-form--white c-card-fixed" @modal-state="closeFormDrawner"></form-program>
      </v-navigation-drawer>

      <v-navigation-drawer
        v-if="userSesion.user.type_user_id !== 3"
        v-model="formDrawnerEdit"
        temporary
        right
        fixed
        width="550"
      >
        <form-program-edit class="u-form--white c-card-fixed" @modal-state="closeFormDrawner" :program="programDetail" v-if="programDetail"></form-program-edit>
      </v-navigation-drawer>
    </v-layout>
  </v-container>
</template>

<script>
import FormProgram from '../components/formProgram'
import FormProgramEdit from '../components/formProgramEdit'

import { mapState, mapActions } from 'vuex'

export default {
  components: { FormProgram, FormProgramEdit },
  computed: {
    ...mapState(['userSesion', 'allPrograms'])
  },
  data () {
    return {
      noData: false,
      search: '',
      formDrawner: null,
      formDrawnerEdit: null,
      programDetail: null,
      pagination: {
        rowsPerPage: 10
      },
      headers: [
        {
          text: 'Programa',
          align: 'left',
          sortable: true,
          value: 'name'
        },
        {
          text: 'Contacto',
          value: 'carbs',
          align: 'center'
        },
        {
          text: 'Línea Acción',
          value: 'type_program_name',
          align: 'left'
        },
        {
          text: '',
          value: 'iron',
          align: 'center'
        }
      ]
    }
  },
  created () {
    if (this.allPrograms.length === 0) {
      switch (this.userSesion.user.type_user_id) {
        case 1:
          this.getAllPrograms()
            .then(response => {
              if (this.allPrograms.length === 0) {
                this.noData = true
              }
            })
          break
        case 2:
          this.getAllPrograms({ entity_id: this.userSesion.entity.id })
            .then(response => {
              if (this.allPrograms.length === 0) {
                this.noData = true
              }
            })
          break
      }
    }
  },
  methods: {
    ...mapActions(['getAllPrograms']),
    getnameEntity (value) {
      if (value) {
        return value.name
      }

      return 'Sin Entidad'
    },
    openDetail (program) {
      this.formDrawnerEdit = true
      this.programDetail = program
    },
    closeFormDrawner (state) {
      console.log('cerrar modal')
      this.formDrawner = false
      this.formDrawnerEdit = false
    },
    refreshProgram () {
      switch (this.userSesion.user.type_user_id) {
        case 1:
          this.getAllPrograms()
            .then(response => {
              if (this.allPrograms.length === 0) {
                this.noData = true
              }
            })
          break
        case 2:
          this.getAllPrograms({ entity_id: this.userSesion.entity.id })
            .then(response => {
              if (this.allPrograms.length === 0) {
                this.noData = true
              }
            })
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

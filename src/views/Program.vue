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
          class="c-data-table elevation-3"
          :search="search"
          :pagination.sync="pagination"
        >
          <template v-slot:items="props">
            <td>
              <div class="c-data-table__program" @click="openDetail(props.item)">
                <img :src="props.item.logo_image_link || require('../assets/default-img.svg')" alt="">
                <div class="c-data-table__program__description">
                  <p><b>{{ props.item.name }}</b></p>
                  <p>{{ getnameEntity(props.item.owner_id) }}</p>
                </div>

              </div>
            </td>
            <td class="text-sm-left">
              <div class="c-data-table__socials">
                <v-tooltip top v-if="props.item.website">
                  <template v-slot:activator="{ on }">
                    <a v-on="on" href="#!" class="mx-1 c-data-table__socials__item">
                      <v-icon color="black">web_asset</v-icon>
                      <span>sitio web</span>
                    </a>
                  </template>
                  <span>{{ props.item.website }}</span>
                </v-tooltip>
              </div>
            </td>
            <td>{{ nameTypeProgram(props.item.type_program_id) }}</td>
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

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: { FormProgram, FormProgramEdit },
  computed: {
    ...mapState(['userSesion', 'allPrograms']),
    ...mapGetters(['getOnlyEntity', 'getOnlyTypeProgram'])
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
          value: 'name',
          sortable: false
        },
        {
          text: 'Contacto',
          value: 'carbs',
          align: 'left',
          sortable: false
        },
        {
          text: 'Línea Acción',
          value: 'type_program_name',
          align: 'left',
          sortable: false
        },
        {
          text: '',
          value: 'start_date',
          align: 'center',
          sortable: true
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
      let program = this.getOnlyEntity(value)
      if (program) {
        return program.name
      }
      return 'no cuenta con entidad'
    },
    openDetail (program) {
      this.formDrawnerEdit = true
      this.programDetail = program
    },
    closeFormDrawner (state) {
      console.log('cerrar modal')
      this.programDetail = null
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
    },
    nameTypeProgram (id) {
      let name = this.getOnlyTypeProgram(id).name
      return name
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

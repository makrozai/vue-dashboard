<template>
  <v-container class="c-container-dashboard">
    <v-layout wrap>
      <v-flex
        xs12 md6 lg8
        class="c-dashboard-title"
      >
        <h2>Entidades</h2>

        <v-text-field
          class="c-dashboard-title__input"
          box
          label="Busqueda de entidades"
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
              @click="refreshEntity"
            >
              <i class="icon-refresh"></i>
            </v-btn>
          </template>
          <span>Actualiza</span>
        </v-tooltip>
      </v-flex>
      <v-flex xs12 class="mt-5" v-if="!noData">
        <v-data-table
          :headers="headers"
          :items="allEntities"
          :search="search"
          item-key="id"
          class="c-data-table"
          :pagination.sync="pagination"
          disable-initial-sort

        >
          <template v-slot:items="props">
            <td>
              <div class="c-data-table__entity">
                <img :src="props.item.logo_image_link || require('../assets/default-img.svg')" alt="">
                <div class="c-data-table__entity__description">
                  <p><b>{{ props.item.name }}</b> - {{ props.item.ruc }}</p>
                  <p>{{ props.item.social_reason }}</p>
                </div>
              </div>
            </td>
            <td class="text-sm-right">
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

                <v-tooltip top v-if="props.item.address">
                  <template v-slot:activator="{ on }">
                    <a v-on="on" href="#!" class="mx-1 c-data-table__socials__item">
                      <v-icon color="black">home</v-icon>
                      <span>dirección</span>
                    </a>
                  </template>
                  <span>{{ props.item.address }}</span>
                </v-tooltip>

                <v-tooltip top v-if="props.item.contacts && props.item.contacts[0]">
                  <template v-slot:activator="{ on }">
                    <a v-on="on" href="#!" class="mx-1 c-data-table__socials__item">
                      <v-icon color="black">contact_mail</v-icon>
                      <span>correo</span>
                    </a>
                  </template>
                  <span>{{ contact(props.item.contacts[0]).email }}</span>
                </v-tooltip>
                <v-tooltip top v-if="props.item.contacts && props.item.contacts[0]">
                  <template v-slot:activator="{ on }">
                    <a v-on="on" href="#!" class="mx-1 c-data-table__socials__item">
                      <v-icon color="black">phone</v-icon>
                      <span>Teléfono</span>
                    </a>
                  </template>
                  <span>{{ contact(props.item.contacts[0]).phone }}</span>
                </v-tooltip>
              </div>
            </td>
            <td
              v-if="userSesion.user.type_user_id == 1"
              class="text-sm-center"
            >
              <span
                class="c-badge-status"
                :class="badgeStatus(props.item.state).class"
              >
                {{ badgeStatus(props.item.state).text }}
              </span>
            </td>
            <td
              class="text-sm-center c-data-table__options"
            >
              <v-btn
                :disabled="userSesion.user.type_user_id !== 1 ? true : false"
                fab
                small
                @click.stop="selectEntity(props.item, props.index)"
              >
                <v-icon>edit</v-icon>
              </v-btn>
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
        <valid-entity v-if="valueEntity" :entity="valueEntity" @response-valid="responseValid"></valid-entity>
      </v-navigation-drawer>
    </v-layout>
  </v-container>
</template>

<script>
import ValidEntity from '../components/validEntity'
import { mapState, mapActions } from 'vuex'
export default {
  components: { ValidEntity },
  computed: {
    ...mapState(['allEntities', 'userSesion'])
  },
  data () {
    return {
      noData: false,
      search: '',
      valueEntity: null,
      formDrawner: null,
      pagination: {
        rowsPerPage: 25
      },
      headers: [
        {
          text: 'Entidad',
          align: 'left',
          value: 'name'
        },
        {
          text: 'Contacto',
          value: 'website',
          align: 'left'
        },
        {
          text: 'Estado',
          value: 'state',
          align: 'center'
        },
        {
          text: '',
          value: '',
          align: 'center'
        }
      ]
    }
  },
  created () {
    if (this.userSesion.user.type_user_id === 1) {
      this.getAllEntities({ with_contacts: true, state_in: '1,2,3,4' })
        .then(response => {
          if (this.allEntities.length === 0) {
            this.noData = true
          }
        })
    } else {
      this.getAllEntities({ with_contacts: true })
        .then(response => {
          if (this.allEntities.length === 0) {
            this.noData = true
          }
        })
    }

    if (this.userSesion.user.type_user_id !== 1) {
      this.headers.splice(4, 1)
    }
  },
  methods: {
    ...mapActions(['getAllEntities', 'setAlert']),
    selectEntity (value, index) {
      this.valueEntity = { item: value, index: index }
      this.formDrawner = !this.formDrawner
    },
    responseValid (response) {
      if (response) {
        this.formDrawner = false
        let message = ''
        if (response === 1) {
          message = 'Entidad valida correctamente'
        }
        if (response === 3) {
          message = 'Entidad rechazada correctamente'
        }
        this.setAlert({
          text: message,
          state: true,
          dismissible: false,
          type: 'success',
          time: 6000
        })
      }
    },
    badgeStatus (value) {
      if (value === 1) {
        return { class: 'success', text: 'Validado' }
      } else if (value === 2) {
        return { class: 'invalid', text: 'Incompleto' }
      } else if (value === 3) {
        return { class: 'error', text: 'Rechazado' }
      } else {
        return { class: 'warning', text: 'Pendiente' }
      }
    },
    contact (contact) {
      if (contact) {
        return { email: contact.email, phone: contact.cellphone }
      }
      return ''
    },
    refreshEntity () {
      if (this.userSesion.user.type_user_id === 1) {
        this.getAllEntities({ with_contacts: true, state_in: '1,2,3,4' })
          .then(response => {
            if (this.allEntities.length === 0) {
              this.noData = true
            }
          })
      } else {
        this.getAllEntities({ with_contacts: true })
          .then(response => {
            if (this.allEntities.length === 0) {
              this.noData = true
            }
          })
      }

      if (this.userSesion.user.type_user_id !== 1) {
        this.headers.splice(4, 1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

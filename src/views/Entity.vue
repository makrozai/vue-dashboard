<template>
  <v-container class="c-container-dashboard">
    <v-layout wrap>
      <v-flex
        xs12
        class="c-dashboard-title mb-4"
      >
        <h2>Entidades</h2>
      </v-flex>
      <v-flex xs12>
        <v-data-table
          :headers="headers"
          :items="allEntities"
          item-key="id"
          class="c-data-table"
          :pagination.sync="pagination"
        >
          <template v-slot:items="props">
            <td>
              <div class="c-data-table__entity">
                <img :src="props.item.logo_image_link || require('../assets/default-img.svg')" alt="">
                {{ props.item.name }}
              </div>
            </td>
            <td>{{ props.item.social_reason }}</td>
            <td>{{ props.item.ruc }}</td>
            <td>
              <v-tooltip top v-if="props.item.website">
                <template v-slot:activator="{ on }">
                  <a v-on="on" href="#!" class="mx-1">
                    <v-icon color="black">web_asset</v-icon>
                  </a>
                </template>
                <span>{{ props.item.website }}</span>
              </v-tooltip>

              <v-tooltip top v-if="props.item.address">
                <template v-slot:activator="{ on }">
                  <a v-on="on" href="#!" class="mx-1">
                    <v-icon color="black">home</v-icon>
                  </a>
                </template>
                <span>{{ props.item.address }}</span>
              </v-tooltip>

              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <a v-on="on" href="#!" class="mx-1">
                    <v-icon color="black">contact_mail</v-icon>
                  </a>
                </template>
                <span>mail@localhost.com</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <a v-on="on" href="#!" class="mx-1">
                    <v-icon color="black">phone</v-icon>
                  </a>
                </template>
                <span>978 765 4532</span>
              </v-tooltip>
            </td>
            <td>
              <v-btn
                :disabled="userSesion.user.type_user_id !== 1 ? true : false"
                :color="props.item.state == 1 ? 'success':'warning'"
                fab
                small
                @click.stop="selectEntity(props.item)"
              >
                <v-icon v-if="props.item.state == 2">visibility</v-icon>
                <v-icon v-if="props.item.state == 1">check</v-icon>
              </v-btn>
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
      valueEntity: null,
      formDrawner: null,
      pagination: {
        rowsPerPage: 25
      },
      headers: [
        {
          text: 'Entidad',
          align: 'center',
          sortable: true,
          value: 'name'
        },
        {
          text: 'Razón social',
          value: 'social_reason',
          align: 'center'
        },
        {
          text: 'Ruc',
          value: 'ruc',
          align: 'center'
        },
        {
          text: 'Contacto',
          value: 'website',
          align: 'center'
        },
        {
          text: 'Estado',
          value: 'state',
          align: 'center'
        }
      ]
    }
  },
  created () {
    if (this.allEntities.length > 0) {
    } else {
      this.getAllEntities()
    }
  },
  methods: {
    ...mapActions(['getAllEntities', 'setAlert']),
    selectEntity (value) {
      this.valueEntity = value
      this.formDrawner = !this.formDrawner
    },
    responseValid (response) {
      if(response) {
        this.formDrawner = false
        this.setAlert({
          text: 'Entidad validada correctamente',
          state: true,
          dismissible: false,
          type: 'success',
          time: 60000
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="allPrograms"
    item-key="id"
    class="c-data-table"
    :pagination.sync="pagination"
  >
    <template v-slot:items="props">
      <td>
        <div class="c-data-table__entity">
          <img src="../assets/default-img.svg" alt="">
          {{ props.item.name }}
        </div>
      </td>
      <td>{{ getnameEntity(props.item.entities[0]) }}</td>
      <td>{{ props.item.start_date }}</td>
      <td>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <a v-on="on" href="#!" class="mx-1">
              <v-icon color="black">web_asset</v-icon>
            </a>
          </template>
          <span>{{ props.item.website }}</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <a v-on="on" href="#!" class="mx-1">
              <i class="icon-facebook v-icon material-icons theme--light black--text"></i>
            </a>
          </template>
          <span>{{ props.item.facebook }}</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <a v-on="on" href="#!" class="mx-1">
              <div class="icon-twitter v-icon material-icons theme--light black--text"></div>
            </a>
          </template>
          <span>{{ props.item.twitter }}</span>
        </v-tooltip>
        <v-tooltip top>
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
        <span>Validado</span>
        <span>12/10/2019</span>
      </td>
    </template>
  </v-data-table>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState(['allPrograms'])
  },
  data () {
    return {
      selected: [],
      pagination: {
        rowsPerPage: 25
      },
      headers: [
        {
          text: 'Programa',
          align: 'center',
          sortable: true,
          value: 'name'
        },
        {
          text: 'Entidad',
          value: 'fat',
          align: 'center'
        },
        {
          text: 'Inicio',
          value: 'fat',
          align: 'center'
        },
        {
          text: 'Contacto',
          value: 'carbs',
          align: 'center'
        },
        {
          text: 'Línea Acción',
          value: 'protein',
          align: 'center'
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
    if(this.allPrograms.length === 0) {
      this.getAllPrograms()
    }

  },
  methods: {
    ...mapActions(['getAllPrograms']),
    getnameEntity (value) {
      if(value) {
        return value.name
      }

      return 'Sin Entidad'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

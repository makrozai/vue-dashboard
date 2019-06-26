<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="allPrograms"
    item-key="id"
    select-all
    class="c-data-table"
    :pagination.sync="pagination"
  >
    <template v-slot:items="props">
      <td>
        <v-checkbox
          :input-value="props.selected"
          primary
          hide-details
          color="primary"
        ></v-checkbox>
      </td>
      <td>
        <div class="c-data-table__entity">
          <img src="../assets/logotipo-entidad.svg" alt="">
          {{ props.item.name }}
        </div>
      </td>
      <!--<td>{{ props.item.entities[0] }}</td>-->
      <td>{{ props.item.start_date }}</td>
      <td>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <a v-on="on" href="#!" class="mx-1">
              <v-icon color="black">email</v-icon>
            </a>
          </template>
          <span>{{ props.item.website }}</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <a v-on="on" href="#!" class="mx-1">
              <v-icon color="black">call</v-icon>
            </a>
          </template>
          <span>{{ props.item.facebook }}</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <a v-on="on" href="#!" class="mx-1">
              <v-icon color="black">home</v-icon>
            </a>
          </template>
          <span>{{ props.item.twitter }}</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <a v-on="on" href="#!" class="mx-1">
              <v-icon color="black">home</v-icon>
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
    this.getAllPrograms()
  },
  methods: {
    ...mapActions(['getAllPrograms']),
  }
}
</script>

<style lang="scss" scoped>

</style>

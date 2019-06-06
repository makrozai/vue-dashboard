<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="desserts"
    item-key="name"
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
      <td>{{ props.item.calories }}</td>
      <td>{{ props.item.fat }}</td>
      <td>
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <a v-on="on" href="#!" class="mx-1">
              <v-icon color="black">email</v-icon>
            </a>
          </template>
          <span>{{ props.item.contact.mail }}</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <a v-on="on" href="#!" class="mx-1">
              <v-icon color="black">call</v-icon>
            </a>
          </template>
          <span>{{ props.item.contact.phone }}</span>
        </v-tooltip>
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <a v-on="on" href="#!" class="mx-1">
              <v-icon color="black">home</v-icon>
            </a>
          </template>
          <span>{{ props.item.contact.address }}</span>
        </v-tooltip>
      </td>
      <td>{{ props.item.protein }}</td>
      <td class="c-data-table__status">
        <span>{{ props.item.iron.status }}</span>
        <span>{{ props.item.iron.date }}</span>
      </td>
    </template>
  </v-data-table>
</template>

<script>
export default {
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
          value: 'calories',
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
      ],
      desserts: [
        {
          name: 'Juntos por la educación',
          calories: 'EXE Perú',
          fat: '23/12/1988',
          contact: {
            mail: 'marco@localhost.com',
            phone: '987654321',
            address: 'av. los resintos Nº 1234 - miraflores'
          },
          protein: 'Capacitación',
          iron: {
            status: 'Validado',
            date: '12/10/2019'
          }
        },
        {
          name: 'Proyecto demo',
          calories: 'EXE Perú',
          fat: '23/12/1988',
          contact: {
            mail: 'marco@localhost.com',
            phone: '987654321',
            address: 'av. los resintos Nº 1234 - miraflores'
          },
          protein: 'Capacitación',
          iron: {
            status: 'Validado',
            date: '12/10/2019'
          }
        },
        {
          name: 'Juntos por la educación 2',
          calories: 'EXE Perú',
          fat: '23/12/1988',
          contact: {
            mail: 'marco@localhost.com',
            phone: '987654321',
            address: 'av. los resintos Nº 1234 - miraflores'
          },
          protein: 'Capacitación',
          iron: {
            status: 'Validado',
            date: '12/10/2019'
          }
        },
        {
          name: 'Juntos por la educación 3',
          calories: 'EXE Perú',
          fat: '23/12/1988',
          contact: {
            mail: 'marco@localhost.com',
            phone: '987654321',
            address: 'av. los resintos Nº 1234 - miraflores'
          },
          protein: 'Capacitación',
          iron: {
            status: 'Validado',
            date: '12/10/2019'
          }
        },
        {
          name: 'Proyecto demo 2',
          calories: 'Grupo Gloria',
          fat: '23/12/1988',
          contact: {
            mail: 'marco@localhost.com',
            phone: '987654321',
            address: 'av. los resintos Nº 1234 - miraflores'
          },
          protein: 'Capacitación',
          iron: {
            status: 'Validado',
            date: '12/10/2019'
          }
        },
        {
          name: 'Proyecto demo 3',
          calories: 'Grupo Gloria',
          fat: '23/12/1988',
          contact: {
            mail: 'marco@localhost.com',
            phone: '987654321',
            address: 'av. los resintos Nº 1234 - miraflores'
          },
          protein: 'Capacitación',
          iron: {
            status: 'Validado',
            date: '12/10/2019'
          }
        },
        {
          name: 'Juntos por la educación 4',
          calories: 'Grupo Gloria',
          fat: '23/12/1988',
          contact: {
            mail: 'marco@localhost.com',
            phone: '987654321',
            address: 'av. los resintos Nº 1234 - miraflores'
          },
          protein: 'Capacitación',
          iron: {
            status: 'Validado',
            date: '12/10/2019'
          }
        },
        {
          name: 'Juntos por la educación 5',
          calories: 'Grupo Gloria',
          fat: '23/12/1988',
          contact: {
            mail: 'marco@localhost.com',
            phone: '987654321',
            address: 'av. los resintos Nº 1234 - miraflores'
          },
          protein: 'Capacitación',
          iron: {
            status: 'Validado',
            date: '12/10/2019'
          }
        },
        {
          name: 'Juntos por la educación 6',
          calories: 'Grupo Gloria',
          fat: '23/12/1988',
          contact: {
            mail: 'marco@localhost.com',
            phone: '987654321',
            address: 'av. los resintos Nº 1234 - miraflores'
          },
          protein: 'Capacitación',
          iron: {
            status: 'Validado',
            date: '12/10/2019'
          }
        },
        {
          name: 'Proyecto demo 4',
          calories: 'Graña y Montero',
          fat: '23/12/1988',
          contact: {
            mail: 'marco@localhost.com',
            phone: '987654321',
            address: 'av. los resintos Nº 1234 - miraflores'
          },
          protein: 'Capacitación',
          iron: {
            status: 'Validado',
            date: '12/10/2019'
          }
        },
        {
          name: 'Proyecto demo 5',
          calories: 'Graña y Montero',
          fat: '23/12/1988',
          contact: {
            mail: 'marco@localhost.com',
            phone: '987654321',
            address: 'av. los resintos Nº 1234 - miraflores'
          },
          protein: 'Capacitación',
          iron: {
            status: 'Validado',
            date: '12/10/2019'
          }
        },
        {
          name: 'Proyecto demo 6',
          calories: 'Graña y Montero',
          fat: '23/12/1988',
          contact: {
            mail: 'marco@localhost.com',
            phone: '987654321',
            address: 'av. los resintos Nº 1234 - miraflores'
          },
          protein: 'Capacitación',
          iron: {
            status: 'Validado',
            date: '12/10/2019'
          }
        },
        {
          name: 'Juntos por la educación 7',
          calories: 'Grupo Gloria',
          fat: '23/12/1988',
          contact: {
            mail: 'marco@localhost.com',
            phone: '987654321',
            address: 'av. los resintos Nº 1234 - miraflores'
          },
          protein: 'Capacitación',
          iron: {
            status: 'Validado',
            date: '12/10/2019'
          }
        },
        {
          name: 'Juntos por la educación 8',
          calories: 'Graña y Montero',
          fat: '23/12/1988',
          contact: {
            mail: 'marco@localhost.com',
            phone: '987654321',
            address: 'av. los resintos Nº 1234 - miraflores'
          },
          protein: 'Capacitación',
          iron: {
            status: 'Validado',
            date: '12/10/2019'
          }
        },
        {
          name: 'Proyecto demo 7',
          calories: 'Graña y Montero',
          fat: '23/12/1988',
          contact: {
            mail: 'marco@localhost.com',
            phone: '987654321',
            address: 'av. los resintos Nº 1234 - miraflores'
          },
          protein: 'Capacitación',
          iron: {
            status: 'Validado',
            date: '12/10/2019'
          }
        },
        {
          name: 'Proyecto demo 8',
          calories: 'Graña y Montero',
          fat: '23/12/1988',
          contact: {
            mail: 'marco@localhost.com',
            phone: '987654321',
            address: 'av. los resintos Nº 1234 - miraflores'
          },
          protein: 'Capacitación',
          iron: {
            status: 'Validado',
            date: '12/10/2019'
          }
        },
        {
          name: 'Proyecto demo 9',
          calories: 'Graña y Montero',
          fat: '23/12/1988',
          contact: {
            mail: 'marco@localhost.com',
            phone: '987654321',
            address: 'av. los resintos Nº 1234 - miraflores'
          },
          protein: 'Capacitación',
          iron: {
            status: 'Validado',
            date: '12/10/2019'
          }
        },
        {
          name: 'Juntos por la educación 9',
          calories: 'EXE Perú',
          fat: '23/12/1988',
          contact: {
            mail: 'marco@localhost.com',
            phone: '987654321',
            address: 'av. los resintos Nº 1234 - miraflores'
          },
          protein: 'Capacitación',
          iron: {
            status: 'Validado',
            date: '12/10/2019'
          }
        },
        {
          name: 'Juntos por la educación 10',
          calories: 'EXE Perú',
          fat: '23/12/1988',
          contact: {
            mail: 'marco@localhost.com',
            phone: '987654321',
            address: 'av. los resintos Nº 1234 - miraflores'
          },
          protein: 'Capacitación',
          iron: {
            status: 'Validado',
            date: '12/10/2019'
          }
        },
        {
          name: 'Proyecto demo 10',
          calories: 'EXE Perú',
          fat: '23/12/1988',
          contact: {
            mail: 'marco@localhost.com',
            phone: '987654321',
            address: 'av. los resintos Nº 1234 - miraflores'
          },
          protein: 'Capacitación',
          iron: {
            status: 'Validado',
            date: '12/10/2019'
          }
        },
        {
          name: 'Proyecto demo 11',
          calories: 'EXE Perú',
          fat: '23/12/1988',
          contact: {
            mail: 'marco@localhost.com',
            phone: '987654321',
            address: 'av. los resintos Nº 1234 - miraflores'
          },
          protein: 'Capacitación',
          iron: {
            status: 'Validado',
            date: '12/10/2019'
          }
        },
        {
          name: 'Proyecto demo 12',
          calories: 'Graña y Montero',
          fat: '23/12/1988',
          contact: {
            mail: 'marco@localhost.com',
            phone: '987654321',
            address: 'av. los resintos Nº 1234 - miraflores'
          },
          protein: 'Capacitación',
          iron: {
            status: 'Validado',
            date: '12/10/2019'
          }
        },
        {
          name: 'Proyecto demo 13',
          calories: 'Graña y Montero',
          fat: '23/12/1988',
          contact: {
            mail: 'marco@localhost.com',
            phone: '987654321',
            address: 'av. los resintos Nº 1234 - miraflores'
          },
          protein: 'Capacitación',
          iron: {
            status: 'Validado',
            date: '12/10/2019'
          }
        },
        {
          name: 'Juntos por la educación 11',
          calories: 'Graña y Montero',
          fat: '23/12/1988',
          contact: {
            mail: 'marco@localhost.com',
            phone: '987654321',
            address: 'av. los resintos Nº 1234 - miraflores'
          },
          protein: 'Capacitación',
          iron: {
            status: 'Validado',
            date: '12/10/2019'
          }
        },
        {
          name: 'Juntos por la educación 12',
          calories: 'EXE Perú',
          fat: '23/12/1988',
          contact: {
            mail: 'marco@localhost.com',
            phone: '987654321',
            address: 'av. los resintos Nº 1234 - miraflores'
          },
          protein: 'Capacitación',
          iron: {
            status: 'Validado',
            date: '12/10/2019'
          }
        },
        {
          name: 'Proyecto demo 14',
          calories: 'Graña y Montero',
          fat: '23/12/1988',
          contact: {
            mail: 'marco@localhost.com',
            phone: '987654321',
            address: 'av. los resintos Nº 1234 - miraflores'
          },
          protein: 'Capacitación',
          iron: {
            status: 'Validado',
            date: '12/10/2019'
          }
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

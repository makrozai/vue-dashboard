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
      <td>{{ props.item.contact }}

      </td>
      <td>{{ props.item.protein }}</td>
      <td>{{ props.item.iron }}</td>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data () {
    return {
      selected: [],
      pagination: {
        rowsPerPage: 10
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
  .c-data-table{

    &__entity{
      display: flex;
      align-items: center;

      img{
        display: block;
        margin-right: 1em;
        width: 2.8em;
      }
    }

    td{
      text-align: center;
    }
  }
</style>

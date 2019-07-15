<template>
  <v-container class="c-container-dashboard" grid-list-md>
    <v-layout wrap >
      <v-flex
        xs12
        class="c-dashboard-title mb-4"
      >
        <h2>dashboard</h2>
      </v-flex>
      <v-flex xs3>
        <v-card
          color="blue-grey darken-1"
          class="white--text c-dashboard__card"
        >
          <v-card-title>
            <div class="c-dashboard__card__stadistic">
              <div>
                <span>Programas</span>
                <div class="headline">33</div>
              </div>
              <i class="icon-program v-icon material-icons theme--light"></i>
            </div>
          </v-card-title>
          <v-card-actions>
          <v-btn flat color="white">Explore</v-btn>
        </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs3>
        <v-card
          color="green darken-2"
          class="white--text c-dashboard__card"
        >
          <v-card-title>
            <div class="c-dashboard__card__stadistic">
              <div>
                <span>Iniciativas</span>
                <div class="headline">33</div>
              </div>
              <i class="icon-init v-icon material-icons theme--light"></i>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="white">Explore</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs3>
        <v-card
          color="blue darken-2"
          class="white--text c-dashboard__card"
        >
          <v-card-title>
            <div class="c-dashboard__card__stadistic">
              <div>
                <span>Entidades</span>
                <div class="headline">33</div>
              </div>
              <i class="icon-entity v-icon material-icons theme--light"></i>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="white">Explore</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs3>
        <v-card
          color="yellow darken-3"
          class="white--text c-dashboard__card"
        >
          <v-card-title>
            <div class="c-dashboard__card__stadistic">
              <div>
                <span>Participantes</span>
                <div class="headline">33</div>
              </div>
              <v-icon>face</v-icon>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="white">Explore</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs3 class="mt-4">
        <v-card >
          <v-card-title><h4>Ultimas entidades registradas :</h4></v-card-title>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-tile>
              <v-list-tile-content>Calories:</v-list-tile-content>
              <v-list-tile-content class="align-end">159</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Fat:</v-list-tile-content>
              <v-list-tile-content class="align-end">6</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Carbs:</v-list-tile-content>
              <v-list-tile-content class="align-end">24</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Protein:</v-list-tile-content>
              <v-list-tile-content class="align-end">4</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Sodium:</v-list-tile-content>
              <v-list-tile-content class="align-end">87</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Calcium:</v-list-tile-content>
              <v-list-tile-content class="align-end">14%</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Iron:</v-list-tile-content>
              <v-list-tile-content class="align-end">1%</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Iron:</v-list-tile-content>
              <v-list-tile-content class="align-end">1%</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Iron:</v-list-tile-content>
              <v-list-tile-content class="align-end">1%</v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex xs9 class="mt-4">
        <v-card>
          <v-card-text>
            <line-chart :chart-data="datacollection" :styles="myStyles" :options="options"></line-chart>
          </v-card-text>
        </v-card>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import LineChart from '../plugins/lineChart'

export default {
  components: {
    LineChart
  },
  computed: {
    myStyles () {
      return {
        height: `${this.height}px`,
        position: 'relative'
      }
    }
  },
  data () {
    return {
      datacollection: null,
      height: 400,
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  created () {
    this.fillData()
  },
  methods: {
    fillData () {
      this.datacollection = {
        labels: [this.getRandomInt(), this.getRandomInt()],
        datasets: [
          {
            label: 'Entidades',
            backgroundColor: '#f87979',
            data: [this.getRandomInt(), this.getRandomInt()]
          }, {
            label: 'Participantes',
            backgroundColor: '#f22979',
            data: [this.getRandomInt(), this.getRandomInt()]
          }, {
            label: 'Administradores',
            backgroundColor: '#f22109',
            data: [this.getRandomInt(), this.getRandomInt()]
          }
        ]
      }
    },
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

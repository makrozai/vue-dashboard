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
          :to="{name: 'programa'}"
        >
          <v-card-title>
            <div class="c-dashboard__card__stadistic">
              <div>
                <span>Programas</span>
                <div class="headline">{{ dataReport.totalPrograms }}</div>
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
          :to="{name: 'iniciativa'}"
        >
          <v-card-title>
            <div class="c-dashboard__card__stadistic">
              <div>
                <span>Iniciativas</span>
                <div class="headline">{{ dataReport.totalInitiatives }}</div>
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
          :to="{name: 'entidad'}"
        >
          <v-card-title>
            <div class="c-dashboard__card__stadistic">
              <div>
                <span>Entidades</span>
                <div class="headline">{{ dataReport.totalEntities }}</div>
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
          :to="{name: 'home'}"
        >
          <v-card-title>
            <div class="c-dashboard__card__stadistic">
              <div>
                <span>Participantes</span>
                <div class="headline">{{ dataReport.totalPartakers }}</div>
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
            <v-list-tile
              v-for="(item, index) in typeEntities"
              :key="index"
            >
              <v-list-tile-content>{{ item.name }}:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ item.total_entities }}</v-list-tile-content>
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
import partakersService from './../services/partakers'
import initiativesService from './../services/initiatives'
import programsService from './../services/programs'
import entitiesService from './../services/entities'

import LineChart from '../plugins/lineChart'

import { mapState } from 'vuex'

export default {
  components: {
    LineChart
  },
  computed: {
    ...mapState(['typeEntities']),
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
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      },
      dataReport: {
        totalEntities: null,
        totalPrograms: null,
        totalInitiatives: null,
        totalPartakers: null
      }
    }
  },
  created () {
    this.fillData()

    partakersService.count().then(response => { this.dataReport.totalPartakers = response })
      .catch(error => { console.log(error) })
    initiativesService.count().then(response => { this.dataReport.totalInitiatives = response })
      .catch(error => { console.log(error) })
    programsService.count().then(response => { this.dataReport.totalPrograms = response })
      .catch(error => { console.log(error) })
    entitiesService.count().then(response => { this.dataReport.totalEntities = response })
      .catch(error => { console.log(error) })
  },
  methods: {
    fillData () {
      this.datacollection = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Linea de trabajo de entidades',
          data: [65, 59, 80, 81, 56, 55, 4],
          fill: false,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }]
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

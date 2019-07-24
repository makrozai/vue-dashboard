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
                <div class="headline">{{ parseCountTarjet(dataReport.totalPrograms) }}</div>
              </div>
              <i class="icon-program v-icon material-icons theme--light"></i>
            </div>
          </v-card-title>
          <v-card-actions>
          <v-btn flat color="white">Ver más ...</v-btn>
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
                <div class="headline">{{ parseCountTarjet(dataReport.totalInitiatives) }}</div>
              </div>
              <i class="icon-init v-icon material-icons theme--light"></i>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="white">Ver más ...</v-btn>
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
                <div class="headline">{{ parseCountTarjet(dataReport.totalEntities) }}</div>
              </div>
              <i class="icon-entity v-icon material-icons theme--light"></i>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="white">Ver más ...</v-btn>
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
                <div class="headline">{{ parseCountTarjet(dataReport.totalPartakers)}}</div>
              </div>
              <v-icon>face</v-icon>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="white">Ver más ...</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs3 class="mt-4">
        <v-card >
          <v-card-title><h4>Ultimas entidades registradas :</h4></v-card-title>
          <v-divider></v-divider>
          <v-list dense class="c-dashboard__type-entities">
            <v-list-tile
              v-for="(item, index) in typeEntities"
              :key="index"
            >
              <v-list-tile-content>{{ item.name }}:</v-list-tile-content>
              <v-list-tile-content class="align-end text-xs-right">{{ item.total_entities }}</v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex xs9 class="mt-4">
        <v-card>
          <v-card-text>
            <line-chart v-if="loaded" :chart-data="chartdata" :options="options"></line-chart>
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
        totalEntities: 0,
        totalPrograms: 0,
        totalInitiatives: 0,
        totalPartakers: 0,
        forYears: {
          labels: [],
          data: []
        }
      },
      loaded: false,
      chartdata: null
    }
  },
  created () {

    partakersService.count().then(response => { this.dataReport.totalPartakers = response })
      .catch(error => { console.log(error) })
    initiativesService.count().then(response => { this.dataReport.totalInitiatives = response })
      .catch(error => { console.log(error) })
    programsService.count().then(response => { this.dataReport.totalPrograms = response })
      .catch(error => { console.log(error) })
    entitiesService.count().then(response => { this.dataReport.totalEntities = response })
      .catch(error => { console.log(error) })

    initiativesService.reportYears()
      .then(response => {
        response.forEach(element => {
          this.dataReport.forYears.labels.push(element.year)
          this.dataReport.forYears.data.push(element.total_initiatives)
        })
      })
      .then(() => {
        console.log('holi')
        this.fillData()
        this.loaded = true
      })
      .catch(error => { console.log(error) })
  },
  methods: {
    fillData () {
      this.chartdata = {
        labels: this.dataReport.forYears.labels,
        datasets: [{
          label: 'Linea de trabajo de entidades',
          data: this.dataReport.forYears.data,
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
    parseCountTarjet (counter) {
      if (counter < 10) {
        return '0' + counter
      }
      return counter
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

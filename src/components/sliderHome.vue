<template>
  <v-flex md7 xs12 class="hidden-sm-and-down c-slider">
    <v-carousel
      height="100vh"
      hide-controls
      class="elevation-0 c-slider-dashboard"
    >
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
      >
        <h3>{{ item.title }}</h3>
      </v-carousel-item>
    </v-carousel>
  </v-flex>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            title: 'Se beneficiaron un 11% de alumnos en Lima, La Libertad y Cajamarca',
            // eslint-disable-next-line
            src: require('../assets/slider-1.jpg')
          },
          {
            title: 'Se beneficiaron un 11% de alumnos en Lima, La Libertad y',
            // eslint-disable-next-line
            src: require('../assets/slider-2.jpg')
          },
          {
            title: 'Se beneficiaron un 11% de alumnos en Lima, La Libertad y',
            // eslint-disable-next-line
            src: require('../assets/slider-5.jpg')
          },
          {
            title: 'Se beneficiaron un 11% de alumnos en Lima, La Libertad y',
            // eslint-disable-next-line
            src: require('../assets/slider-4.jpg')
          }
        ],
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>

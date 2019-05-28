<template>
  <v-app>
    <v-content>
      <v-layout fill-height="true" flex-start>
        <v-flex
          shrink
        >
          <m-navigation></m-navigation>
        </v-flex>
        <v-flex
          grow
        >
          <router-view/>
        </v-flex>
      </v-layout>
      
    </v-content>
  </v-app>
</template>

<script>
import MNavigation from './components/navigation';
export default {
  name: 'App',
  data () {
    return {
      
    }
  },
  components: {
    MNavigation
  }
}
</script>

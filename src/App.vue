<template>
  <v-app>
    <v-content>
      <transition>
        <router-view/>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
    }
  }
}
</script>
<style lang="scss">
  @import './scss/global.scss';
</style>

<template>
  <div>
    <h1>home - aun no esta maquetado :3</h1>

    <v-btn :to="{name : 'login'}" dark large>login</v-btn>
    <v-btn :to="{name : 'entidad'}" dark large>Dashboard</v-btn>

    <v-btn @click="clickTasks" dark large>Dashboard</v-btn>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions(['getAllTasks']),
    clickTasks () {
      this.getAllTasks()
        .then(result => {
          console.log(result)
        })
    }
  },
  created () {
    console.log('holi')
  }
}
</script>

<style lang="scss" scoped>
</style>

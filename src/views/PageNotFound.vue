<template>
  <v-container fill-height class="py-0">
    <v-layout>
      <v-flex>
        <div class="c-page-not-found">
          <h2>404</h2>
          <p>página no encontrada</p>
          <router-link :to="{name:'login'}" class="c-page-not-found__image">
            <img src="../assets/404error.svg" alt="" >
          </router-link>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

</style>

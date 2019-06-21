<template>
  <div class="c-card-entity">
    <div
      class="c-card-entity__item"
      v-for="(item, index) in entities"
      :key="index"
    >
      <div class="c-card-entity__header">
        <v-btn fab small color="primary">
          <v-icon>remove</v-icon>
        </v-btn>
        <div class="c-card-entity__title">
          <img src="../assets/default-img.svg" alt="">
          <div>
            <h3><b>RUC: </b>{{ item.ruc }}</h3>
            <p>{{ item.name }} <v-icon dark class="c-card-entity__badge">check</v-icon></p>
          </div>
        </div>
        <v-btn fab small color="primary">
          <v-icon>edit</v-icon>
        </v-btn>
      </div>
      <div class="c-card-entity__body">
        <ul>
          <li
            v-for="(participation, index) in item.participations"
            :key="index"
          >
            <b>{{ participation.title }}</b>
            <p>{{ participation.description }}</p>
            <b>S/ {{ participation.price }}</b>
          </li>
        </ul>
      </div>

    </div>
  </div>

</template>

<script>
export default {
  props: ['entities']
}
</script>

<style lang="scss" scoped>

</style>

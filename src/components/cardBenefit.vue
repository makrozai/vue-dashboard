<template>
  <div class="c-card-benefit">
    <div class="c-card-benefit__entity"
      v-for="(item, index) in entities"
      :key="index"
    >
      <v-btn fab small color="primary">
        <v-icon>remove</v-icon>
      </v-btn>
      <div class="c-card-benefit__entity__header">
        <p class="c-card-benefit__entity__type">
          <b>Tipo: </b>{{ item.type }}
        </p>
        <span class="c-card-benefit__entity__name">{{ item.name }}</span>
        <ul class="c-card-benefit__entity__address"
        >
          <li>La {{ item.address.region }} / {{ item.address.province }} / {{ item.address.district }}</li>
        </ul>
      </div>
      <v-btn fab small color="primary">
        <v-icon>edit</v-icon>
      </v-btn>
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

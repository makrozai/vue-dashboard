<template>
  <div
    class="c-card-entity"
    :class="[onlyRemove != null || onlyEdit != null ? 'c-card-entity--only-remove' : '']"
  >
    <div
      class="c-card-entity__item"
      v-for="(item, index) in entities"
      :key="index"
    >
      <div class="c-card-entity__header">
        <v-btn
          fab
          small
          :color="colorButton"
          :outline="colorButton == 'error' ? true : false"
          :disabled="disabled"
          v-if="onlyEdit == null"
          @click="removeItem(index)"
        >
          <v-icon>remove</v-icon>
        </v-btn>
        <div class="c-card-entity__title">
          <img :src="item.logo_image_link || require('../assets/default-img.svg')" alt="">
          <div>
            <h3><b>RUC: </b>{{ item.ruc }}</h3>
            <p>{{ item.name }} <v-icon dark class="c-card-entity__badge" v-if="item.state === 1">check</v-icon></p>
          </div>
        </div>
        <v-btn
          fab
          small
          color="primary"
          :disabled="disabled"
          v-if="onlyRemove == null"
          @click="editItem(index)"
        >
          <v-icon>edit</v-icon>
        </v-btn>
      </div>
      <div class="c-card-entity__body" v-if="item.participations">
        <ul>
          <div
            v-for="(participation, index) in item.participations"
            :key="index"
          >
            <li
              v-if="participation.amount || participation.description"
            >
              <b>{{ participation.title }}</b>
              <p>{{ participation.description }}</p>
              <b>S/ {{ participation.amount }}</b>
            </li>
          </div>
        </ul>
      </div>

    </div>
  </div>

</template>

<script>
export default {
  props: ['entities', 'onlyRemove', 'onlyEdit', 'disabled'],
  data () {
    return {
      colorButton: 'primary'
    }
  },
  created () {
    // modifica el boton en caso el componente sirva para solo eliminar
    if (this.onlyRemove != null) {
      this.colorButton = 'error'
    } else {
    }
  },
  methods: {
    removeItem (index) {
      this.$emit('remove-item', index)
    },
    editItem (index) {
      this.$emit('edit-item', index)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

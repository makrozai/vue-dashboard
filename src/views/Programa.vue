<template>
  <v-container>
    <v-layout
      wrap="true"
      justify-space-between
    >
      <v-flex
        xs12 md6 lg8
        class="c-dashboard-title"
      >
        <h2>programa</h2>
      </v-flex>
      <v-flex
        xs12 md6 lg4
        class="c-dashboard-input"
      >
        <v-text-field
          box
          label=""
          prepend-inner-icon="search"
        ></v-text-field>
        <v-btn
          fab
          color="primary"
          class="my-0 mr-0"
        >
          <v-icon dark>add</v-icon>
        </v-btn>

      </v-flex>
      <v-flex
        xs12
        class="mt-4"
      >
        <m-programa-table></m-programa-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import MProgramaTable from '../components/programaTable'

export default {
  components: {
    MProgramaTable
  }
}
</script>

<style lang="scss" scoped>
.c-dashboard{
  &-input{
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
  }
  &-title{
    display: flex;
    text-transform: uppercase;
    align-items: flex-start;
    padding-top: .5em;
    font-size: 1.4em;

    div{
      display: flex;
      align-items: center;

      h2{
        margin-left: .5em;
      }
    }
  }
}
</style>

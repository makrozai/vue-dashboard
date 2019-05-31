<template>
  <v-container>
    <v-layout
      wrap="true"
      justify-space-between
    >
      <v-flex
        xs12 sm8
        class="c-dashboard-title"
      >
        <div>
          <v-icon
            large
            color="black"
          >
            layers
          </v-icon>
          <h2>programa</h2>
        </div>
      </v-flex>
      <v-flex
        xs12 sm4
        class="c-dashboard-input"
      >
        <v-text-field
          label="Director de ventas"
          outline
        ></v-text-field>
        <v-btn fab dark color="indigo" class="my-0">
          <v-icon dark>search</v-icon>
        </v-btn>
        <v-btn fab dark color="indigo" class="my-0">
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

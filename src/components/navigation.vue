<template>
  <v-navigation-drawer 
    v-model="drawer"
    :mini-variant.sync="mini"
    hide-overlay
    stateless
    dark
  >
    <v-toolbar flat class="transparent ">
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>John Leider</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn
              icon
              @click.stop="mini = !mini"
            >
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-divider></v-divider>

    <v-list dense class="pt-0">
      
      <v-list-tile
        v-for="item in items"
        :key="item.title"
        :to="{name: item.link}"
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-group
        prepend-icon="account_circle"
        value="true"
      >
        <template v-slot:activator>
          <v-list-tile>
            <v-list-tile-title>Reportes</v-list-tile-title>
          </v-list-tile>
        </template>

        <v-list-tile
          v-for="item in reports"
          :key="item.title"
          :to="{name: item.link}"
        >
          <v-list-tile-title v-text="item.title"></v-list-tile-title>
          <v-list-tile-action>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  /* eslint-disable */
  export default {
    data () {
      return {
        drawer: true,
        items: [
          { title: 'Entidad', icon: 'dashboard', link: 'entidad' },
          { title: 'Programa', icon: 'dashboard', link: 'programa' },
          { title: 'Iniciativas', icon: 'question_answer', link: 'perfil' }
        ],
        reports: [
          {title: 'Indicadores', icon:'dashboard', link:'perfil'},
          {title: 'Inversión', icon:'dashboard', link:'perfil'},
          {title: 'Tipo de inversión', icon:'dashboard', link:'perfil'},
        ],
        mini: true,
        right: null
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>

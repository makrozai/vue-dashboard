<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant.sync="mini"
    hide-overlay
    stateless
    dark
    width="250"
    class="c-navbar"
  >
    <v-toolbar flat class="transparent  c-navbar__logo">
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="../assets/exe.svg">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>
              <img src="../assets/exe-text.svg" alt="">
            </v-list-tile-title>
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

    <v-list dense class=" c-navbar__list c-navbar__list--user">
      <v-list-tile
        :to="{name: 'ficha-de-verificacion'}"
      >
        <v-list-tile-action>
          <img src="../assets/icons/user.svg" alt="">
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>
            <p>{{ user.name }}</p>
            <span>{{ user.status }}</span>
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

    </v-list>

    <v-divider></v-divider>

    <v-list dense class=" c-navbar__list">
      <v-list-tile
        v-for="item in navbarDrawer.items"
        :key="item.title"
        :to="{name: item.link}"
      >
        <v-list-tile-action>
          <!--<v-icon>{{ item.icon }}</v-icon>-->
          <i :class="'icon-' + item.icon"></i>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

    </v-list>

    <v-divider></v-divider>

    <v-list dense class=" c-navbar__list">
      <v-list-tile
        v-for="item in navbarDrawer.reports"
        :key="item.title"
        :to="{name: item.link}"
      >
        <v-list-tile-action>
          <!--<v-icon>{{ item.icon }}</v-icon>-->
          <i :class="'icon-' + item.icon"></i>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

    </v-list>

    <v-list dense class=" c-navbar__list c-navbar__list--footer">
      <v-list-tile
        :to="{name: 'login'}"
      >
        <v-list-tile-action>
          <i class="icon-logout"></i>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>Cerrar sesión</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['navbarDrawer','user'])
  },
  data () {
    return {
      mini: true,
      drawer: true
    }
  }
}
</script>

<style lang="scss" scoped>
.v-list{
  &__tile{
    &__action{
      i{
        display: flex;
        align-items: center;
        font-size: 2rem;
        height: 100%;
        margin-right: auto;
      }
      img{
        height: 65%;
      }
    }
  }
}

.v-navigation-drawer--mini-variant{
  .v-divider{
    display: block !important;
  }
  .v-list{
    &__tile{
      &__action{
        i{
          margin-right: auto;
          margin-left: auto;
        }
      }
    }
  }
}
</style>

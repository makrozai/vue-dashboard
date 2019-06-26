<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant.sync="mini"
    hide-overlay
    stateless
    dark
    width="250"
    class="c-navbar"
    fixed
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
          <img :src="imageUser" alt="">
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>
            <p>{{ getName(userSesion.user.type_user_id).toUpperCase() }}</p>
            <span :class="userSesion.entity.state === 1 ? 'success-text': 'error-text'">{{ stateUser }}</span>
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

    </v-list>

    <v-divider></v-divider>

    <v-list dense class=" c-navbar__list" v-if="validMenu">
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

    <v-list dense class=" c-navbar__list" >
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
        @click="endSesion"
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
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState(['navbarDrawer', 'userSesion']),
    imageUser () {
      if (this.userSesion.user.type_user_id === 2) {
        if (this.userSesion.entity.logo_image_link) {
          return this.userSesion.entity.logo_image_link
        }
      }
      return require('../assets/default-img.svg')
    },
    stateUser () {
      if (this.userSesion.user.type_user_id === 2) {
        switch (this.userSesion.entity.state) {
          case 1:
            return 'Verificado'
          case 2:
            return 'Pendiente'
          case 3:
            return 'Rechazado'
        }
      }
    },
    validMenu () {
      if (this.userSesion.entity.state && this.userSesion.entity.state === 2) {
        return false
      }
      if(this.userSesion.user.type_user_id === 3) {
        return false
      }
      return true
    }
  },
  data () {
    return {
      mini: true,
      drawer: true
    }
  },
  watch: {
    mini: function (response) {
      this.$emit('update-navbar', !response)
    }
  },
  methods: {
    ...mapActions(['logout']),
    endSesion () {
      this.logout()
      this.$router.push({ name: 'login' })
    },
    getName (type) {
      switch (type) {
        case 1:
          return 'Administrador'
        case 2:
          return this.userSesion.entity.name
        case 3:
          return this.userSesion.partaker.name
      }
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

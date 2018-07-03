<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-if="this.$store.state.connectedUser.isLogged"
      temporary
      fixed
      clipped
      v-model="drawer"
      app
    >
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="./assets/logo.png">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title class="aside-title">{{this.$store.state.connectedUser.login}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list dense>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Contact</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark clipped-left absolute app>
      <v-toolbar-side-icon v-if="this.$store.state.connectedUser.isLogged"
                           @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <img src="./assets/esens-logo.svg">
      <v-toolbar-title>Votesens</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view v-if="!this.noMetamask"></router-view>
      <v-container align-content-center v-if="this.noMetamask">
        <v-flex justify-space-around class="text-md-center">
          <h1>Veuillez installer Metamask pour utiliser l'application</h1>
          <a target="_blank" href="http://metamask.io">
            <img src="./assets/download-metamask-dark.png" alt="download metamask button dark" style="max-width:100%;">
          </a>
        </v-flex>
      </v-container>
    </v-content>
    <v-footer app>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: 'app',
    data: () => ({
      drawer: null
    }),
    computed: {
      noMetamask () {
        return Vue.prototype.$noMetamask
      }
    }
  }
</script>

<style>
  nav .toolbar__content {
    background-color: #363548;
  }

  .aside-title {
    color: white;
  }
</style>

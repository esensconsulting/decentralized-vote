<template>
  <v-app id="inspire">
    <v-navigation-drawer
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
              <v-list-tile-title class="aside-title">Utilisateur</v-list-tile-title>
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
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <img src="./assets/esens-logo.svg">
      <v-toolbar-title>Votesens</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer app>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    name: 'app',
    data: () => ({
      drawer: null
    })
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

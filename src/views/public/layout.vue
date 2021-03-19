<template>
  <v-app >
    <v-main class="blue-grey lighten-5">
      <v-app-bar dark>
          <v-toolbar-title>Facturador</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn to="/login">Login</v-btn>
        </v-app-bar>
      <v-container fill-height="fill-height" style="margin-top:-64px;padding-top:65px;">
        
        <router-view />
        <v-footer dark app="app">
          <v-flex class="text-center">© {{year}}. All rights reserved.</v-flex>
        </v-footer>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    computed: {
      year() {
        return new Date().getFullYear()
      }
    }
  }
</script>

<style>

</style>
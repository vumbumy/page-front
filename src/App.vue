<template>
  <v-app id="inspire">
    <navigation/>

    <v-main>
      <router-view :key="$route.path"/>
    </v-main>

    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }} VUMBUMY</span>
    </v-footer>
  </v-app>
</template>

<script>
import Navigation from "./components/Navigation";

export default {
  name: 'App',
  components: {Navigation},
  created () {
    this.$vuetify.theme.dark = true
  }
}
</script>

<style lang="scss">
  .link-item {
    text-decoration: none;
  }
</style>

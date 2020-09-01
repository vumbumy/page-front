<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <router-link class="link-item" to="/">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-action>
            <v-list-item-content class="text-left">
                <v-list-item-title>
                  Dashboard
                </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link class="link-item" to="/settings">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-cog</v-icon>
            </v-list-item-action>
            <v-list-item-content class="text-left">
              <v-list-item-title>Settings</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title></v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col class="shrink">
            <router-view :key="$route.path"/>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  created () {
    this.$vuetify.theme.dark = true
  },
  data: () => ({
    drawer: null,
  }),
  components: {

  }
}
</script>

<style lang="scss">
  /*#app {*/
  /*  font-family: Avenir, Helvetica, Arial, sans-serif;*/
  /*  -webkit-font-smoothing: antialiased;*/
  /*  -moz-osx-font-smoothing: grayscale;*/
  /*  text-align: center;*/
  /*  color: #2c3e50;*/
  /*  margin-top: 60px;*/
  /*}*/

  .link-item {
    text-decoration: none;
  }
</style>

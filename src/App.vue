<script src="api/main.js"></script>
<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped v-if="isAuthenticated">
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
              <v-list-item-title @click="onClickLogout">Settings</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left dense v-if="isAuthenticated">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title></v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view :key="$route.path"/>
    </v-main>

    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }} VUMBUMY</span>
    </v-footer>
  </v-app>
</template>

<script>
import store from "@/store"

export default {
  name: 'App',
  created () {
    this.$vuetify.theme.dark = true
  },
  data: () => ({
    drawer: null,
    msg: null
  }),
  computed: {
    isAuthenticated(){
      return store.getters.isAuthenticated
    }
  },
  methods: {
    onClickLogout: function (){
      // LOGIN 액션 실행
      this.$store
          .dispatch("LOGOUT")
          .then(() => this.$router.push("/login"))
          .catch(({ message }) => (this.msg = message))
    }
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

<template>
  <div v-if="!isLogin">
    <v-app-bar v-if="isAuthenticated" app clipped-left dense dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer/>
      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="onClickLogout">
            <v-list-item-action>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-action>
            <v-list-item-content class="text-left">
              <v-list-item-title>LOGOUT</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-app-bar v-else app clipped-left dense dark>
      <v-btn outlined class="ml-auto" @click="onClickLogin">
        <v-icon class="mr-1">mdi-login</v-icon>
        LOGIN
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app clipped v-if="isAuthenticated" width="200px">
      <v-list dense>
        <router-link class="link-item" to="/">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-home</v-icon>
            </v-list-item-action>
            <v-list-item-content class="text-left">
              <v-list-item-title>
                Home
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link class="link-item" to="/projects">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-view-array</v-icon>
            </v-list-item-action>
            <v-list-item-content class="text-left">
              <v-list-item-title>Project</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link class="link-item" to="/board">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-view-array</v-icon>
            </v-list-item-action>
            <v-list-item-content class="text-left">
              <v-list-item-title>Board</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link class="link-item" to="/users" v-if="isAdmin">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-action>
            <v-list-item-content class="text-left">
              <v-list-item-title>Users</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link class="link-item" to="/groups" v-if="isAdmin">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-account-group</v-icon>
            </v-list-item-action>
            <v-list-item-content class="text-left">
              <v-list-item-title>Groups</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import store from "@/store"

export default {
  name: 'Navigation',
  data(){
    return {
      drawer: null
    }
  },
  computed: {
    isLogin() {
      return this.$route.path === "/login"
    },
    isAuthenticated(){
      return store.getters.isAuthenticated
    },
    isAdmin() {
      return store.getters.isAdmin
    }
  },
  methods: {
    onClickLogout: function (){
      // LOGIN 액션 실행
      this.$store
        .dispatch("LOGOUT")
        .then(() => this.$router.push("/login"))
    },
    onClickLogin: function (){
      this.$router.push("/login")
    }
  }
}
</script>

<!--<template>-->
<!--  <div>-->
<!--    <v-app-bar app dense clipped-left v-if="isAuthenticated">-->
<!--      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>-->
<!--      <v-toolbar-title>W</v-toolbar-title>-->
<!--      <v-btn icon>-->
<!--        <v-icon>mdi-magnify</v-icon>-->
<!--      </v-btn>-->
<!--      <v-menu-->
<!--        left-->
<!--        bottom-->
<!--      >-->
<!--        <template v-slot:activator="{ on, attrs }">-->
<!--          <v-btn-->
<!--            icon-->
<!--            v-bind="attrs"-->
<!--            v-on="on"-->
<!--          >-->
<!--            <v-icon>mdi-cog</v-icon>-->
<!--          </v-btn>-->
<!--        </template>-->

<!--        <v-list>-->
<!--          <v-list-item link @click="onClickLogout">-->
<!--            <v-list-item-action>-->
<!--              <v-icon>mdi-logout</v-icon>-->
<!--            </v-list-item-action>-->
<!--            <v-list-item-content class="text-left">-->
<!--              <v-list-item-title>LOGOUT</v-list-item-title>-->
<!--            </v-list-item-content>-->
<!--          </v-list-item>-->
<!--        </v-list>-->
<!--      </v-menu>-->
<!--    </v-app-bar>-->
<!--  </div>-->
<!--</template>-->
<template>
  <div>
    <v-app-bar v-if="isAuthenticated"
      app
      clipped-left
      dense
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

<!--      <v-toolbar-title>Page title</v-toolbar-title>-->

      <v-spacer/>

<!--      <v-btn icon>-->
<!--        <v-icon>mdi-heart</v-icon>-->
<!--      </v-btn>-->

<!--      <v-btn icon>-->
<!--        <v-icon>mdi-magnify</v-icon>-->
<!--      </v-btn>-->

      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
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

    <v-navigation-drawer v-model="drawer" app clipped v-if="isAuthenticated">
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
        <!--      <router-link class="link-item" to="/settings">-->
        <!--        <v-list-item link>-->
        <!--          <v-list-item-action>-->
        <!--            <v-icon>mdi-cog</v-icon>-->
        <!--          </v-list-item-action>-->
        <!--          <v-list-item-content class="text-left">-->
        <!--            <v-list-item-title>Settings</v-list-item-title>-->
        <!--          </v-list-item-content>-->
        <!--        </v-list-item>-->
        <!--      </router-link>-->
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
      }
    }
  }
</script>
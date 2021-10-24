<template>
  <div class="pa-5">
    <v-data-table
      hide-default-footer
      :items="userList"
      :headers="columns"
      @click:row="onClick"
    >
<!--      <template v-slot:item.enabled="{ item }">-->
<!--        <v-switch @change="toggleEnable(item)"-->
<!--                  v-model="item.enabled"-->
<!--        ></v-switch>-->
<!--      </template>-->
      <template v-slot:item.roles="{item}">
        <v-icon v-if="isAdmin(item)">mdi-account-star</v-icon>
        <v-icon v-else-if="isPartner(item)">mdi-account-settings</v-icon>
        <v-icon v-else-if="isEnabled(item)">mdi-account</v-icon>
<!--        <v-icon v-if="!item.enabled">mdi-account-alert</v-icon>-->
      </template>
    </v-data-table>
  </div>
</template>

<script>
import {getUserList, updateUser} from "@/api/user";
import {ROLE_ADMIN, ROLE_PARTNER, ROLE_USER} from "@/config/constant";

export default {
  data() {
    return {
      userList: [],
      columns: [
        { text: 'EMAIL', value: 'email' },
        { text: 'PHONE NUMBER', value: 'phoneNumber' },
        { text: 'ROLES', value: 'roles' },
        // { text: 'ENABLED', value: 'enabled' },
        { text: 'CREATED (UTC)', value: 'createdAt' },
      ],
    }
  },
  created() {
    this.loadUserList()
  },
  methods: {
    isEnabled: function (user) {
      return user.enabled
    },
    isAdmin: function (user) {
      return user.roles.find(e => e.value === ROLE_ADMIN)
    },
    isPartner: function (user) {
      return user.roles.find(e => e.value === ROLE_PARTNER)
    },
    loadUserList: function () {
      this.userList = [];

      getUserList().then(ret => {
        this.userList = ret
      })
    },
    onClick(row) {
      // console.log(row)
    },
    toggleEnable: function (user) {
      if (user.enabled) {
        user.roles.push(ROLE_USER)
      } else {
        user.roles = []
      }

      updateUser(user)
      .then(() => this.loadUserList())
      .catch(() => this.loadUserList())
    }
  }
}
</script>

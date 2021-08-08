<template>
  <v-container>
    <v-data-table
      hide-default-footer
      v-if="userList != null"
      :items="userList"
      :headers="columns">
      <template v-slot:item.enabled="{ item }">
        <v-switch
          v-model="item.enabled"
        ></v-switch>
      </template>
      <template v-slot:item.roles="{item}">
        <v-icon v-if="roleContains(item.roles, 'ROLE_ADMIN')">mdi-account-star</v-icon>
        <v-icon v-if="roleContains(item.roles, 'ROLE_PARTNER')">mdi-account-settings</v-icon>
<!--        <v-icon v-if="!item.enabled">mdi-account-alert</v-icon>-->
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import {getUserList} from "@/api/user";

export default {
  data() {
    return {
      userList: null,
      columns: [
        { text: 'EMAIL', value: 'username' },
        { text: 'PHONE NUMBER', value: 'phoneNumber' },
        { text: 'ROLES', value: 'roles' },
        { text: 'ENABLED', value: 'enabled' },
      ],
    }
  },
  created() {
    this.loadUserList()
  },
  methods: {
    roleContains: function (roles, role) {
      return roles.find(e => e.value === role)
    },
    loadUserList: function () {
      this.userList = null;

      getUserList().then(ret => {
        this.userList = ret
      })
    }
  }
}
</script>

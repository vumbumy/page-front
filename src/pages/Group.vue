<template>
  <v-container>
    <div class="d-flex flex-column">
      <v-fab-transition>
        <v-btn
          class="mb-10"
          absolute
          bottom
          right
          fab
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-fab-transition>
      <v-data-table
        show-expand
        hide-default-footer
        :items="groupList"
        :headers="columns"
      >
        <template v-slot:expanded-item="{ headers, item }">
          <td class="darken-4 grey pa-5" :colspan="headers.length">
            <v-user-group :value="item" :user-list="userList"/>
          </td>
        </template>
      </v-data-table>
    </div>
  </v-container>
</template>

<script>

import {getUserGroupList} from "@/api/group";
import VUserGroup from "@/components/Group";
import {getSecuredUserList} from "@/api/user";

export default {
  components: {VUserGroup},
  data() {
    return {
      groupList: [],
      userList: [],

      columns: [
        { text: 'GROUP', value: 'groupName'},
        { text: 'CREATED (UTC)', value: 'createdAt', align: "center"},
        { text: '', value: 'data-table-expand' },
      ],
      selected: null,
    }
  },
  created() {
    this.loadGroupList()
    this.loadUserList()
  },

  methods: {
    loadGroupList: function () {
      getUserGroupList().then(ret => {
        this.groupList = ret
      })
    },
    loadUserList: async function () {
      await getSecuredUserList()
        .then(ret => this.userList = ret)
    },
    onClickRow: function (row) {
      this.selected = row.item
    },
  }
}
</script>

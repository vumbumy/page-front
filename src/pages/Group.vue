<template>
<!--  <v-container>-->
    <div class="d-flex flex-column pa-5">
      <v-fab-transition>
        <v-btn
          class="mb-10"
          absolute
          bottom
          right
          fab
          @click="onAddGroup"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-fab-transition>
      <v-data-table
        show-expand
        hide-default-footer

        :headers="columns"

        :items="groupList"
        item-key="groupNo"

        @click:row="onClickRow"
      >
        <template v-slot:expanded-item="{ headers, item }">
          <td class="darken-4 grey pa-5" :colspan="headers.length">
            <v-user-table :value="item" :user-list="userList"/>
          </td>
        </template>
      </v-data-table>
      <v-group-dialog v-model="selected"/>
    </div>
<!--  </v-container>-->
</template>

<script>

import {getUserGroupList} from "@/api/group";
import {getSecuredUserList} from "@/api/user";
import VGroupDialog from "@/components/GroupDialog";
import VUserTable from "@/components/UserTable";

export default {
  components: {VUserTable, VGroupDialog},
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
    onClickRow: function (item) {
      this.selected = item.groupNo
    },
    onAddGroup() {
      this.selected = 0;
    }
  }
}
</script>

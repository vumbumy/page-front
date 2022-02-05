<template>
  <div v-if="permissions">
    <v-btn icon class="pa-0" @click="dialog = true">
      <v-icon dense>mdi-account</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          사용자 공유
          <v-spacer/>
          <v-btn icon @click="onSave">
            <v-icon>mdi-content-save</v-icon>
          </v-btn>
          <v-btn icon @click="onClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-autocomplete
            dense
            filled
            hide-selected

            placeholder="Add User"

            ref="emailForm"

            :items="emailList"
            @change="onCompleted"/>
          <v-data-table
            hide-default-footer

            :headers="columns"
            :items="permissions">
            <template v-slot:item.accessRight="{item}">
              <v-select :items="['READ','WRITE']" v-model="item.accessRight" @change="onChange"/>
            </template>
            <template v-slot:item.actions="{item}">
              <!--        <v-btn small text @click="onDeleteUser(item)">-->
              <!--          DELETE-->
              <!--        </v-btn>-->
              <v-icon @click="onDelete(item)">
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import {getUserList} from "@/api/user";

export default {
  name: "VUserPermissionDialog",
  props: {
    value: {
      type: Array
    }
  },
  data() {
    return {
      dialog: false,
      columns: [
        { text: 'NO', value: 'userNo'},
        { text: 'USER', value: 'email', align: "center"},
        { text: 'PERMISSION', value: 'accessRight', align: "center", width: "150px"},
        { text: 'ACTION', value: 'actions', align: "center", sortable: false},
      ],
      permissions: null,
      userList: [],
      updated: false
    }
  },
  created() {
    this.loadUserList();
  },
  computed: {
    isPrivate() {
      if (this.value == null) {
        return true;
      }

      if (this.value.length > 2) {
        return false;
      }

      return this.value.length === 0
        || (this.value.length === 1 && this.value[0].userNo === this.$store.getters.currentUserNo);
    },
    // isShared() {
    //   return this.value.find(permission => permission.userNo == null && permission.groupNo == null);
    // },
    // icon() {
    //   if (this.isPrivate) {
    //     return PRIVATE.ICON
    //   } else if (this.isShared) {
    //     return PUBLIC.ICON
    //   }
    //   return GROUP.ICON
    // },
    userNoList() {
      return this.permissions.map(user => user.userNo)
    },
    emailList() {
      return this.userList
        .filter(user => !this.userNoList.includes(user.userNo))
        .map(user => user.email)
    }
  },
  watch: {
    value() {
      this.initialize()
    },
    dialog() {
      if (!this.dialog) {
        this.initialize()
      }
    }
  },
  methods: {
    initialize() {
      this.permissions = Object.assign([], this.value)
    },
    loadUserList: async function () {
      await getUserList()
        .then(ret => this.userList = ret)
    },
    onCompleted(userEmail) {
      this.$refs.emailForm.reset();

      let selected = this.findSelected(userEmail);
      selected.accessRight = 'READ'
      this.permissions.push(selected)

      this.updated = true
    },
    findSelected(email) {
      return this.userList.find(user => user.email === email)
    },
    onSave: async function() {
      console.log("SAVE")

      this.updated = false;
      this.dialog = false;
    },
    onChange() {
      this.updated = true;
    },
    onDelete(item) {
      const idx = this.permissions.findIndex(user => user.userNo === item.userNo)
      if (idx > -1) this.permissions.splice(idx, 1)

      this.updated = true;
    },
    onClose() {
      this.updated = false;
      this.dialog = false;
    },
  }
}
</script>

<style scoped>

</style>

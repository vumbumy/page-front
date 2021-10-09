<template>
  <div class="d-flex flex-column">
    <v-autocomplete
      dense
      filled
      hide-selected

      placeholder="Add User"

      ref="emailForm"

      :items="emailList"
      @change="onCompleted"/>
    <v-data-table
      v-if="group"

      hide-default-footer

      :headers="columns"
      :items="group.userList">
      <template v-slot:item.actions="{item}">
<!--        <v-btn small text @click="onDeleteUser(item)">-->
<!--          DELETE-->
<!--        </v-btn>-->
        <v-icon @click="onDeleteUser(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>
    <div class="d-flex justify-end mt-3">
      <v-btn
        outlined
        :disabled="!updated"
        class="mr-3"
        @click="onSave">
        SAVE
      </v-btn>
      <v-btn
        outlined
        :disabled="!updated"
        @click="onCancel">
        CANCEL
      </v-btn>
    </div>
  </div>
</template>

<script>
import {getUserGroup, updateUserGroupUsers} from "@/api/group";

export default {
  name: "VUserGroup",
  props: {
    value: {
      type: Object,
      default: null
    },
    userList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      columns: [
        { text: 'NO', value: 'userNo'},
        { text: 'USER', value: 'email', align: "center"},
        { text: 'PERMISSION', value: 'accessRight', align: "center"},
        { text: 'ACTION', value: 'actions', align: "center", sortable: false},
      ],

      group: null,
      selected: null,
      updated: false
    }
  },
  created() {
    this.loadGroup();
  },
  computed: {
    emailList() {
      // TODO: not in group.userList
      return this.userList.map(user => user.email)
    }
  },
  methods: {
    loadGroup: async function() {
      await getUserGroup(this.value.groupNo)
        .then(item => this.group = item)
    },
    onCompleted(value) {
      this.$refs.emailForm.reset();

      this.selected = this.findSelected(value);
      this.selected.accessRight = "READ"

      this.group.userList.push(this.selected)

      this.updated = true
    },
    findSelected(email) {
      return this.userList.find(user => user.email === email)
    },
    onSave() {
      updateUserGroupUsers(this.value.groupNo, this.group.userList)
        .then(() => this.updated = false)
    },
    onCancel() {
      this.loadGroup();

      this.updated = false;
    },
    onDeleteUser(item) {
      const idx = this.group.userList.findIndex(user => user.userNo === item.userNo)
      if (idx > -1) this.group.userList.splice(idx, 1)

      this.updated = true;
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div v-if="permissions">
    <v-btn icon class="pa-0" @click="dialog = true">
      <v-icon dense v-text="icon"/>
    </v-btn>
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          사용자 그룹 공유
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

            placeholder="Add Group"

            ref="groupNameForm"

            :items="groupNameList"
            @change="onCompleted"/>
          <v-data-table
            hide-default-footer

            :headers="columns"
            :items="permissions">
            <template v-slot:item.accessRight="{item}">
              <v-select :items="['READ','WRITE']" v-model="item.accessRight" @change="onChange"/>
            </template>
            <template v-slot:item.actions="{item}">
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

import {GROUP, PRIVATE, PUBLIC} from "@/api/common";
import {getSecuredUserGroupList} from "@/api/group";

export default {
  name: "VGroupPermissionDialog",
  props: {
    value: {
      type: Array
    }
  },
  data() {
    return {
      dialog: false,
      columns: [
        { text: 'NO', value: 'groupNo'},
        { text: 'GROUP', value: 'groupName', align: "center"},
        { text: 'PERMISSION', value: 'accessRight', align: "center", width: "150px"},
        { text: 'ACTION', value: 'actions', align: "center", sortable: false},
      ],
      permissions: null,
      groupList: [],
      updated: false
    }
  },
  created() {
    this.loadGroupList();
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
    isShared() {
      return this.value.find(permission => permission.userNo == null && permission.groupNo == null);
    },
    icon() {
      if (this.isPrivate) {
        return PRIVATE.ICON
      } else if (this.isShared) {
        return PUBLIC.ICON
      }
      return GROUP.ICON
    },
    groupNoList() {
      return this.permissions.map(group => group.groupNo)
    },
    groupNameList() {
      return this.groupList
        .filter(group => !this.groupNoList.includes(group.groupName))
        .map(group => group.groupName)
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
    loadGroupList: async function () {
      await getSecuredUserGroupList()
        .then(ret => this.groupList = ret)
    },
    onCompleted(groupName) {
      this.$refs.groupNameForm.reset();

      let selected = this.findSelected(groupName);
      selected.accessRight = 'READ'
      this.permissions.push(selected)

      this.updated = true
    },
    findSelected(groupName) {
      return this.groupList.find(group => group.groupName === groupName)
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
      const idx = this.permissions.findIndex(group => group.groupName === item.groupNo)
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

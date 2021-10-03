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
        hide-default-footer
        :items="groupList"
        :headers="columns">
        <!--      <template v-slot:item.enabled="{ item }">-->
        <!--        <v-switch @change="toggleEnable(item)"-->
        <!--                  v-model="item.enabled"-->
        <!--        ></v-switch>-->
        <!--      </template>-->
        <!--      <template v-slot:item.roles="{item}">-->
        <!--        <v-icon v-if="isAdmin(item)">mdi-account-star</v-icon>-->
        <!--        <v-icon v-else-if="isPartner(item)">mdi-account-settings</v-icon>-->
        <!--        <v-icon v-else-if="isEnabled(item)">mdi-account</v-icon>-->
        <!--      </template>-->
      </v-data-table>
    </div>
  </v-container>
</template>

<script>

import {getUserGroupList} from "@/api/group";

export default {
  data() {
    return {
      groupList: [],
      columns: [
        { text: 'GROUP', value: 'groupName' },
        { text: 'CREATED (UTC)', value: 'createdAt' },
        { text: 'ACTION'},
      ],
    }
  },
  created() {
    this.loadGroupList()
  },
  methods: {
    loadGroupList: function () {
      this.groupList = [];

      getUserGroupList().then(ret => {
        this.groupList = ret
      })
    }
  }
}
</script>

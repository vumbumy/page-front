<template>
  <v-container>
    <v-data-table
      hide-default-footer
      :items="projectList"
      :headers="columns">
<!--      <template v-slot:item.roles="{item}">-->
<!--        <v-icon v-if="isAdmin(item)">mdi-account-star</v-icon>-->
<!--        <v-icon v-else-if="isPartner(item)">mdi-account-settings</v-icon>-->
<!--        <v-icon v-else-if="isEnabled(item)">mdi-account</v-icon>-->
<!--      </template>-->
    </v-data-table>
  </v-container>
</template>

<script>

import {getProjectList} from "@/api/project";

export default {
  data() {
    return {
      projectList: null,
      columns: [
        { text: 'PROJECT', value: 'projectName' },
        { text: 'MANAGER', value: 'managerName'},
        { text: 'TICKETS', value: 'ticketCount'},
        { text: 'CREATED', value: 'createdAt' },
      ],
    }
  },
  created() {
    this.loadProjectList()
  },
  methods: {
    loadProjectList: function () {
      this.projectList = [];

      getProjectList().then(ret => {
        this.projectList = ret
      })
    }
  }
}
</script>

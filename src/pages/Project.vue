<template>
  <v-container>
    <v-data-table
      hide-default-footer
      :items="projectList"
      :headers="columns"
      @click:row="onClickRow"/>
    <v-project v-model="selected"/>
  </v-container>
</template>

<script>

import {getProject, getProjectList} from "@/api/project";
import VProject from "@/components/VProject";

export default {
  components: {VProject},
  data() {
    return {
      projectList: null,
      columns: [
        { text: 'PROJECT', value: 'projectName' },
        { text: 'MANAGER', value: 'managerName'},
        { text: 'TICKETS', value: 'ticketCount'},
        { text: 'CREATED (UTC)', value: 'createdAt' },
      ],
      selected: null,
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
    },
    onClickRow: function (item) {
      this.selected = item
    },
  }
}
</script>

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

          @click="onAddProject"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-fab-transition>
      <v-data-table
        hide-default-footer
        :items="projectList"
        :headers="columns"
        @click:row="onClickRow"/>
      <v-project-dialog v-model="selected"/>
    </div>
<!--  </v-container>-->
</template>

<script>

import {getProjectList} from "@/api/project";
import VProjectDialog from "@/components/ProjectDialog";

export default {
  components: {VProjectDialog},
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
    loadProjectList: async function () {
      this.projectList = [];

      await getProjectList().then(ret => {
        this.projectList = ret
      })
    },
    onClickRow: function (item) {
      this.selected = item.projectNo
    },
    onAddProject() {
      this.selected = 0;
    }
  }
}
</script>

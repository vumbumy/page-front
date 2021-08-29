<template>
  <v-container>
    <v-data-table
      hide-default-footer
      :items="projectList"
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
  </v-container>
</template>

<script>

export default {
  data() {
    return {
      projectList: [],
      columns: [
        { text: 'PROJECT', value: 'projectName' },
        { text: 'MANAGER', value: 'managerName'},
        { text: 'TICKETS'},
        { text: 'SHARED', value: 'shared' },
        { text: 'CREATED', value: 'createdAt' },
      ],
    }
  },
  created() {
    // this.loadProjectList()
  },
  methods: {
    // loadProjectList: function () {
    //   this.projectList = null;
    //
    //   getProjectList().then(ret => {
    //     this.projectList = ret
    //   })
    // }
  }
}
</script>

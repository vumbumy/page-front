<template>
  <div v-if="loading" class="d-flex flex-column fill-height pa-7">
    <div class="d-flex flex-row">
      <v-select outlined :items="projectList" item-text="projectName" item-value="projectNo" v-model="projectNo" @change="onChangeProject"/>
<!--      <v-spacer/>-->
<!--      <div class="d-flex flex-column" v-if="projectNo">-->
<!--        <div v-text="project.createdAt"/>-->
<!--        <div v-text="project.managerName"/>-->
<!--      </div>-->
    </div>
    <v-row>
      <v-col cols="12" sm="6" lg="3" v-for="(arr, status) in taskMap" :key="status">
        <v-ticket-list
          :projectNo="projectNo"
          :label="status"
          :value="arr" @change="onChangeList" @update="onUpdate" :types="projectInfo.types"/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {getTicketList, getTicketStatusList, updateTicketStatus} from "@/api/ticket";
  import VTicketList from "@/components/VTicketList";
import {getProject, getProjectList} from "@/api/project";

  export default {
    name: "Board",
    components: {
      VTicketList,
    },
    props: {
      source: String,
    },
    data() {
      return {
        projectList: [],
        projectNo: null,
        projectInfo: null,
        statusList: [],
        taskMap: {},
        loading: false
      }
    },
    created: async function() {
      await getTicketStatusList().then(statusList =>
        this.statusList = statusList
      )

      await this.loadProjectList()
    },
    computed: {
      project() {
        return this.projectList.find(value => value.projectNo === this.projectNo)
      }
    },
    methods: {
      loadProjectList: async function () {
        this.loading = false;

        await getProjectList().then(arr =>
          this.projectList = arr
        )

        if (this.projectList.length > 0) {
          this.projectNo = this.projectList[0].projectNo;

          await this.onChangeProject(this.projectNo);

          return;
        }

        this.loading = true
      },
      onChangeList: updateTicketStatus,
      onChangeProject: async function (projectNo) {
        this.loading = false;

        await getProject(projectNo).then(projectInfo =>
          this.projectInfo = projectInfo
        )

        for (const status of this.statusList) {
          this.taskMap[status] = []
        }

        await getTicketList(projectNo).then(arr =>
          arr.forEach(
            v => this.taskMap[v.status].push(v)
          )
        )

        this.loading = true
      },
      onUpdate: async function (status) {
        this.loading = false;

        await getTicketList(this.projectNo, status)
          .then(list => {
            this.taskMap[status] = list
          })

        this.loading = true
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>

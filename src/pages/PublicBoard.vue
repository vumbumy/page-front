<template>
  <v-container class="fill-height">
    <div class="d-flex flex-row fill-height col-12 justify-space-between flex-wrap" v-if="loading">
      <div class="col-xs-6 col-md-3" v-for="(arr, status) in taskMap" :key="status">
        <task-card :label="status" :value="arr"/>
      </div>
    </div>
  </v-container>
</template>

<script>
  import TaskCard from "@/components/PublicTaskCard";
  import {getPublicTicketList, getTicketStatusList} from "@/api/ticket";

  export default {
    name: "Home",
    components: {
      TaskCard,
    },
    props: {
      source: String,
    },
    data() {
      return {
        dragging: false,
        taskMap: {},
        loading: false
      }
    },
    created: async function() {
      await getTicketStatusList().then(statusList => {
        statusList.forEach(status => {
          this.taskMap[status] = []
        })
      })

      await this.loadTicketList()
    },
    methods: {
      loadTicketList: async function () {
        this.loading = false;

        await getPublicTicketList().then(arr => {
          arr.forEach(v => this.taskMap[v.status].push(v))
        })

        this.loading = true
      },
    }
  }
</script>

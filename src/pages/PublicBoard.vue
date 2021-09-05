<link rel="stylesheet" href="../sass/variables.scss">
<template>
  <div class="d-flex flex-row fill-height col-12 flex-wrap" v-if="loading">
    <div class="col-xs-12 col-sm-6 col-md-3" v-for="(arr, status) in taskMap" :key="status">
      <v-ticket-list :label="status" :value="arr"/>
    </div>
  </div>
</template>

<script>
  import {getPublicTicketList, getTicketStatusList} from "@/api/ticket";
  import VTicketList from "@/components/VTicketList";

  export default {
    name: "PublicBoard",
    components: {
      VTicketList
    },
    props: {
      source: String,
    },
    data() {
      return {
        projectArr: [],
        projectNo: null,
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

        await getPublicTicketList().then(
          arr => arr.forEach(
            v => this.taskMap[v.status]
              .push(v)
          )
        )

        this.loading = true
      },
    }
  }
</script>

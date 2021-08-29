<template>
  <div class="d-flex flex-row fill-height col-12 flex-wrap" v-if="loading">
    <div class="col-xs-12 col-sm-6 col-md-3" v-for="(arr, status) in taskMap" :key="status">
      <v-ticket-list :label="status" :value="arr" @change="onChange" @update="onUpdate"/>
    </div>
  </div>
</template>

<script>
import {getTicketList, getTicketStatusList, updateTicketStatus} from "@/api/ticket";
  import VTicketList from "@/components/VTicketList";

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

        await getTicketList().then(arr =>
          arr.forEach(
            v => this.taskMap[v.status].push(v)
          )
        )

        this.loading = true
      },
      onChange: function (ticket) {
        updateTicketStatus(ticket)
      },
      onUpdate: async function (status) {
        this.loading = false;

        await getTicketList(status)
          .then(list => {
            this.taskMap[status] = list
          })

        this.loading = true
      }
    }
  }
</script>

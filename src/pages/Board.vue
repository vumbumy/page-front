<template>
  <v-container class="fill-height">
    <div class="d-flex flex-row fill-height col-12 justify-space-between flex-wrap" v-if="loading">
      <div class="col-xs-6 col-md-3" v-for="(arr, status) in taskMap" :key="status">
        <task-card :label="status" :value="arr" @change="onChange" @update="onUpdate"/>
      </div>
<!--      <div class="col-xs-6 col-md-3">-->
<!--        <task-card label="Progress" v-model="workingArr" @change="onChange" @update="onUpdate"/>-->
<!--      </div>-->
<!--      <div class="col-xs-6 col-md-3">-->
<!--        <task-card label="Review" v-model="reviewArr" @change="onChange" @update="onUpdate"/>-->
<!--      </div>-->
<!--      <div class="col-xs-6 col-md-3">-->
<!--        <task-card label="Done" v-model="doneArr" @change="onChange" @update="onUpdate"/>-->
<!--      </div>-->
    </div>
  </v-container>
</template>

<script>
  import TaskCard from "@/components/TaskCard";
  import {createTicket, getTicketList, getTicketStatusList, updateTicketStatus} from "@/api/ticket";

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

        await getTicketList().then(arr => {
          arr.forEach(v => this.taskMap[v.status].push(v))
        })

        this.loading = true
      },
      onChange: function (ticket) {
        if (ticket.ticketNo != null) {
          updateTicketStatus(ticket)
        } else {
          createTicket(ticket)
        }
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

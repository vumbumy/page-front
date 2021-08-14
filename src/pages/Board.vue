<template>
  <v-container class="fill-height">
    <div class="d-flex flex-row fill-height col-12 justify-space-between flex-wrap">
      <div class="col-xs-6 col-md-3">
        <task-card label="ToDo" v-model="toDoArr" @change="onChange"/>
      </div>
      <div class="col-xs-6 col-md-3">
        <task-card label="Progress" v-model="workingArr" @change="onChange"/>
      </div>
      <div class="col-xs-6 col-md-3">
        <task-card label="Review" v-model="reviewArr" @change="onChange"/>
      </div>
      <div class="col-xs-6 col-md-3">
        <task-card label="Done" v-model="doneArr" @change="onChange"/>
      </div>
    </div>
  </v-container>
</template>

<script>
  import TaskCard from "@/components/TaskCard";
  import {createTicket, getTicketList, updateTicketStatus} from "@/api/ticket";
  import {DONE, PROGRESS, REVIEW, TODO} from "@/config/constant";

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
        toDoArr: [],
        workingArr: [],
        reviewArr: [],
        doneArr: []
      }
    },
    created() {
      this.loadTicketList()
    },
    methods: {
      loadTicketList: function () {
        getTicketList().then(arr => {
          arr.forEach(v => {
            console.log(v)

            switch (v.status) {
              case TODO:
                this.toDoArr.push(v)
                break;
              case PROGRESS:
                this.workingArr.push(v)
                  break;
              case REVIEW:
                this.reviewArr.push(v)
                break;
              case DONE:
                this.doneArr.push(v)
                break;
              default:
                this.toDoArr.push(v)
            }
          })
        })
      },
      onChange: function (ticket) {
        if (ticket.ticketNo != null) {
          updateTicketStatus(ticket)
        } else {
          createTicket(ticket)
        }
      }
    }
  }
</script>

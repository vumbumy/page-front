<template>
  <v-container class="fill-height">
    <v-row justify="center" class="fill-height">
      <v-col>
        <task-card label="ToDo" v-model="toDoArr" @change="onChange"/>
      </v-col>
      <v-col>
        <task-card label="Progress" v-model="workingArr" @change="onChange"/>
      </v-col>
      <v-col>
        <task-card label="Review" v-model="reviewArr" @change="onChange"/>
      </v-col>
      <v-col>
        <task-card label="Done" v-model="doneArr" @change="onChange"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import TaskCard from "./TaskCard";
  import {createTicket, getTicketList, updateTicket} from "@/api/ticket";
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
          updateTicket(ticket)
        } else {
          createTicket(ticket)
        }
      }
    }
  }
</script>

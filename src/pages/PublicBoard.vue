<template>
  <v-container class="fill-height">
    <div class="d-flex flex-row fill-height col-12 justify-space-between flex-wrap">
      <div class="col-xs-6 col-md-3">
        <task-card label="ToDo" v-model="toDoArr"/>
      </div>
      <div class="col-xs-6 col-md-3">
        <task-card label="Progress" v-model="workingArr"/>
      </div>
      <div class="col-xs-6 col-md-3">
        <task-card label="Review" v-model="reviewArr"/>
      </div>
      <div class="col-xs-6 col-md-3">
        <task-card label="Done" v-model="doneArr"/>
      </div>
    </div>
  </v-container>
</template>

<script>
  import TaskCard from "@/components/PublicTaskCard";
  import {getPublicTicketList} from "@/api/ticket";
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
        getPublicTicketList().then(arr => {
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
    }
  }
</script>

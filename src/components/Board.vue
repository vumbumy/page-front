<template>
  <v-container class="fill-height">
    <v-row justify="center" class="fill-height">
      <v-col>
        <task-card label="ToDo" v-model="toDoArr"/>
      </v-col>
      <v-col>
        <task-card label="Working" v-model="workingArr"/>
      </v-col>
      <v-col>
        <task-card label="Review" v-model="reviewArr"/>
      </v-col>
      <v-col>
        <task-card label="Done" v-model="doneArr"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import TaskCard from "./TaskCard";

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
        workingArr: [
          {
            id: 0,
            name: "TEST1"
          },
          {
            id: 1,
            name: "TEST2"
          }
        ],
        reviewArr: [],
        doneArr: [
          {
            id: 2,
            name: "TEST3"
          }
        ]
      }
    },
    methods: {
      onDrag: function (dragging) {
        this.dragging = dragging
      }
    }
  }
</script>
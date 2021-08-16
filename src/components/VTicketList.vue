<template>
  <v-card height="100%" min-width="250">
    <v-card-title>
      {{label}} ({{taskArr.length}})<v-spacer/>
      <v-icon v-if="$store.getters.isAdmin" @click="onAdd">mdi-plus</v-icon>
    </v-card-title>
    <draggable class="fill-height" group="task" v-model="taskArr" @change="onMoved">
      <v-list-item v-for="element in taskArr" :key="element.ticketNo">
        <v-ticket ref="dialog" :value="element" @update="onUpdate"/>
      </v-list-item>
      <v-list-item v-if="added">
        <v-ticket v-model="added" @update="onUpdate"/>
      </v-list-item>
    </draggable>
  </v-card>
</template>

<script>
  import draggable from 'vuedraggable'
  import VTicket from "@/components/VTicket";
  import {Ticket} from "@/api/ticket";

  export default {
    name: "VTicketList",
    components: {
      VTicket,
      draggable,
    },
    props: ['value', 'label'],
    data() {
      return {
        taskArr: this.value,
        status: this.label.toUpperCase(),
        added: null
      }
    },
    watch:{
      // taskArr(){
      //   // this.$emit('input', this.taskArr)
      // },
      value(){
        this.taskArr = this.value
      }
    },
    methods: {
      onAdd: function () {
        this.added = new Ticket()
        this.added.status = this.status
      },
      onMoved: function ({added}) {
        if (added === undefined) {
          return
        }

        added.element.status = this.status

        this.$emit("change", added.element)
      },
      onUpdate: function () {
        this.$emit("update", this.status)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .v-list-item {
    background: dimgray;
    margin: 1% 3%;
  }
  .v-list-item:hover {
    background: gray;
  }
</style>

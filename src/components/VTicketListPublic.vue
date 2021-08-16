<template>
  <v-card height="100%">
    <v-card-title>
      {{label}} ({{taskArr.length}})<v-spacer/>
    </v-card-title>
    <div class="fill-height">
      <v-list-item v-for="element in taskArr" :key="element.ticketNo" disabled>
        <v-ticket :value="element"/>
      </v-list-item>
    </div>
  </v-card>
</template>

<script>
import VTicket from "@/components/VTicket";
  export default {
    name: "VTicketListPublic",
    components: {VTicket},
    props: ['value', 'label'],
    data() {
      return {
        taskArr: this.value,
        status: this.label.toUpperCase()
      }
    },
    watch:{
      value(){
        this.taskArr = this.value
      }
    }
  }
</script>

<style lang="scss" scoped>
  .v-list-item {
    background: dimgray;
    margin: 1% 3%;
  }
</style>

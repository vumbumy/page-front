<template>
  <v-card height="100%">
    <v-card-title>
      {{label}} ({{taskArr.length}})<v-spacer/>
    </v-card-title>
    <div class="fill-height">
      <v-list-item v-for="element in taskArr" :key="element.ticketNo" disabled>
        <issue-dialog :value="element"/>
      </v-list-item>
    </div>
  </v-card>
</template>

<script>
  import IssueDialog from "@/components/IssueDialog";
  export default {
    name: "TaskCard",
    components: {IssueDialog},
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

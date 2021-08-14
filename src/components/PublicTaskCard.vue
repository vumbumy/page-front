<template>
  <v-card height="100%">
    <v-card-title>
      {{label}} ({{taskArr.length}})<v-spacer/>
    </v-card-title>
    <div class="fill-height">
      <v-list-item v-for="element in taskArr" :key="element.ticketNo" disabled>
        <v-list-item-content class="pb-0">
          {{element.title}}
        </v-list-item-content>
      </v-list-item>
    </div>
  </v-card>
</template>

<script>
  export default {
    name: "TaskCard",
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

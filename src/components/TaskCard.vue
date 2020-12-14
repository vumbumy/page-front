<template>
  <v-card height="100%">
    <v-card-title>
      {{label}} ({{taskArr.length}})<v-spacer/>
      <v-icon>mdi-plus</v-icon>
    </v-card-title>
    <draggable class="fill-height" group="task" v-model="taskArr">
      <v-list-item v-for="element in taskArr" :key="element.id">
        <v-list-item-content>
          <v-list-item-subtitle>{{element.name}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </draggable>
  </v-card>
</template>

<script>
  import draggable from 'vuedraggable'

  export default {
    name: "TaskCard",
    components: {
      draggable,
    },
    props: ['value', 'label'],
    data() {
      return {
        taskArr: this.value
      }
    },
    watch:{
      taskArr(){
        this.$emit('input', this.taskArr)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .v-list-item {
    background: darkgray;
    margin: 1% 3%;
  }
  .v-list-item:hover {
    background: gray;
  }
</style>
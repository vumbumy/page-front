<template>
  <v-card height="100%">
    <v-card-title>
      {{label}} ({{taskArr.length}})<v-spacer/>
      <v-icon v-if="$store.getters.isAdmin" @click="onAdded">mdi-plus</v-icon>
    </v-card-title>
    <draggable class="fill-height" group="task" v-model="taskArr" @change="onMoved">
      <v-list-item v-for="element in taskArr" :key="element.ticketNo">
        <v-list-item-content class="pb-0">
          <v-textarea outlined dense v-model="element.content" @change="onChange(element)"/>
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
        taskArr: this.value,
        status: this.label.toUpperCase()
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
      onAdded: function () {
        this.taskArr.push({
          status: this.status,
          content: ""
        })
      },
      onMoved: function ({added}) {
        if (added === undefined) {
          return
        }

        added.element.status = this.status

        this.$emit("change", added.element)
      },
      onChange: function (element) {
        this.$emit("change", element)
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

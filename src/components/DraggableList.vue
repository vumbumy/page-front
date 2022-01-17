<template>
  <v-card height="100%" min-width="250">
    <v-card-title>
      {{label}} ({{taskArr.length}})<v-spacer/>
      <v-icon v-if="project.writable" @click="onAdd">mdi-plus</v-icon>
    </v-card-title>
    <draggable class="fill-height" group="task" v-model="taskArr" @change="onMoved">
      <v-list-item v-for="element in taskArr" :key="element.recordNo" :disabled="project.projectNo == null">
        <v-record-dialog
          :value="element"
          :types="project.columns"
          :project-no="project.projectNo"
          @update="onUpdate"
          @close="onClose"
        />
      </v-list-item>
    </draggable>
    <v-spacer/>
  </v-card>
</template>

<script>
  import draggable from 'vuedraggable'
  import {Record} from "@/api/ticket";
  import VRecordDialog from "@/components/RecordDialog";

  export default {
    name: "VDraggableList",
    components: {
      VRecordDialog,
      draggable,
    },
    props: {
      value: {
        type: Array
      },
      label: {
        type: String,
      },
      project: {
        type: Object,
      },
    },
    data() {
      return {
        taskArr: this.value,
        status: this.label.toUpperCase(),
        added: false
      }
    },
    watch:{
      value(){
        this.taskArr = this.value
      }
    },
    methods: {
      onAdd: function () {
        this.taskArr.push(
          new Record(this.status)
        )

        this.added = true;
      },
      onClose: function () {
        if (this.added) {
          this.taskArr.pop();

          this.added = false;
        }
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

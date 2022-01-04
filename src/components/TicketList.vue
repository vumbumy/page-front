<template>
  <v-card height="100%" min-width="250">
    <v-card-title>
      {{label}} ({{taskArr.length}})<v-spacer/>
      <v-icon v-if="$store.getters.isAdmin" @click="onAdd">mdi-plus</v-icon>
    </v-card-title>
    <div class="fill-height">
      <v-list-item v-for="element in taskArr" :key="element.recordCode" :disabled="projectNo == null">
        <v-ticket-dialog
          :value="element"
          :types="types"
          :project-no="projectNo"
          @update="onUpdate"
          @close="onClose"
        />
      </v-list-item>
    </div>
    <v-spacer/>
  </v-card>
</template>

<script>
import {Record, Ticket} from "@/api/ticket";
  import VTicketDialog from "@/components/TicketDialog";

  export default {
    name: "VTicketList",
    components: {
      VTicketDialog,
    },
    props: ['value', 'label', 'types', 'projectNo'],
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

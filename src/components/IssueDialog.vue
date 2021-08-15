<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-list-item-content class="pb-0" v-bind="attrs" v-on="on">
        {{value.title}}
        <!--          <v-textarea outlined dense v-model="element.content" @change="onChange(element)"/>-->
      </v-list-item-content>
    </template>
    <v-card v-if="element">

      <v-card-title v-if="readonly" class="d-flex flex-row">
        <div class="text-h5" v-text="element.title"/>
        <v-btn icon @click="readonly = false" class="ml-auto">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-title v-else>
        <v-text-field outlined dense label="Title" v-model="element.title"/>
      </v-card-title>

      <v-card-text v-if="readonly">
        {{element.content}}
      </v-card-text>
      <v-card-text v-else>
        <v-textarea outlined dense label="Content" v-model="element.content"/>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-if="!readonly" text @click="readonly = true">
          CANCEL
        </v-btn>
        <v-btn v-else text @click="dialog = false">
          CLOSE
        </v-btn>
        <v-btn text @click="onClickSave(element)">
          SAVE
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {getTicket, updateTicket} from "@/api/ticket";

export default {
  name: "IssueDialog",
  props: {
    value: {
      type: Object
    }
  },
  data() {
    return {
      dialog: false,
      readonly: true,
      element: null
    }
  },
  watch: {
    dialog() {
      if (this.dialog) {
        getTicket(this.value.ticketNo).then(value => this.element = value)
      }
    }
  },
  methods: {
    onClickSave: function (ticket) {
      updateTicket(ticket).then(() => {
        this.readonly = true

        this.$emit("update")
      })
    }
  }
}
</script>

<style scoped>

</style>

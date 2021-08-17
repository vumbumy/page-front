<template>
  <v-dialog v-model="dialog" width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-list-item-content v-bind="attrs" v-on="on">
        <span v-text="title"/>
        <!--          <v-textarea outlined dense v-model="element.content" @change="onChange(element)"/>-->
      </v-list-item-content>
    </template>
    <v-card v-if="element">
      <v-card-actions class="d-flex flex-row justify-space-between">
        <div class="d-flex">
          <v-switch dense label="Shared" v-model="element.isPublic" @change="onUpdate"/>
        </div>
        <div>
          <v-btn icon v-if="value.ticketNo != null" @click="onDelete">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-btn icon v-if="readonly" @click="readonly = false">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon @click="onClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </v-card-actions>
      <v-card-title>
        <v-text-field :readonly="readonly" outlined label="Title" v-model="element.title"/>
      </v-card-title>

      <v-card-text>
        <v-textarea :readonly="readonly" outlined dense label="Content" v-model="element.content"/>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-if="!readonly && element.ticketNo !== null" text @click="readonly = true">
          CANCEL
        </v-btn>
        <v-btn text @click="onClickSave">
          SAVE
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {createTicket, deleteTicket, getTicket, Ticket, updateTicket} from "@/api/ticket";

export default {
  name: "VTicket",
  props: {
    value: {
      type: Object
    }
  },
  data() {
    return {
      dialog: this.value.ticketNo == null,
      readonly: this.value.ticketNo !== null,
      element: this.value
    }
  },
  computed: {
    title() {
      return this.value.title == null || this.value.title === "" ? "제목 없음" : this.value.title;
    }
  },
  watch: {
    dialog: function () {
      if (this.dialog) {
        this.loadTicket();
      } else {
        this.$emit("input", null)
      }
    }
  },
  methods: {
    loadTicket: async function() {
      console.log(this.value.ticketNo)
      if (this.value.ticketNo) {
        await getTicket(this.value.ticketNo)
          .then(value => this.element = value)

        console.log(this.element)
      }
    },
    onClickSave: async function () {
      if (this.element.ticketNo != null) {
        updateTicket(this.element)
          .then(() => {
            this.readonly = true

            this.$emit("update")
          })
      } else {
        createTicket(this.element)
          .then(() => {
            this.readonly = true

            this.$emit("update")
          })
      }
    },
    onUpdate: function () {
      updateTicket(this.element)
    },
    onDelete: function () {
      deleteTicket(this.element.ticketNo)
        .then(() => {
          this.readonly = true

          this.$emit("update")
        })
    },
    onClose: function () {
      this.readonly = true
      this.dialog = false
    }
  }
}
</script>

<style scoped>
textarea {
  min-height: 350px;
}
</style>

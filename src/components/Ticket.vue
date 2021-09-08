<template>
  <v-dialog v-model="dialog" width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-list-item-content v-bind="attrs" v-on="on">
        <v-list-item-title>
          <div class="d-flex flex-column">
            <div class="font-weight-bold" :class="{'font-italic': isEmptyTitle}" v-text="title"/>
            <div v-if="!added" class="ml-auto overline" v-text="'TKT-' + value.ticketNo"/>
          </div>
        </v-list-item-title>
      </v-list-item-content>
    </template>
    <v-card v-if="item">
      <v-card-actions class="d-flex flex-row justify-space-between">
        <div class="d-flex">
          <v-switch dense label="Shared" v-if="item.writable" v-model="item.readable" @change="onUpdateStatus"/>
        </div>
        <div>
          <v-btn icon v-if="item.writable && !added" @click="onDelete">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-btn icon v-if="item.writable && readonly" @click="readonly = false">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon v-if="item.writable && !readonly" @click="onClickSave">
            <v-icon>mdi-content-save</v-icon>
          </v-btn>
          <v-btn icon @click="onClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </v-card-actions>
      <v-card-title>
        <v-text-field :readonly="readonly" outlined label="Title" v-model="item.ticketName"/>
      </v-card-title>

      <v-card-text>
        <v-textarea v-for="type in types" :key="type.typeNo" :readonly="readonly" outlined dense :label="type.typeName" v-model="itemValues[type.typeNo]"/>
      </v-card-text>

<!--      <v-card-actions>-->
<!--        <v-spacer></v-spacer>-->
<!--        <v-btn :disabled="readonly || added" text @click="readonly = true">-->
<!--          CANCEL-->
<!--        </v-btn>-->
<!--      </v-card-actions>-->
    </v-card>
  </v-dialog>
</template>

<script>
import {createTicket, deleteTicket, getTicket, updateTicket, updateTicketStatus} from "@/api/ticket";

export default {
  name: "VTicket",
  props: {
    value: {
      type: Object
    },
    types: {
      type: Array
    },
    projectNo: {
      type: Number
    }
  },
  data() {
    return {
      dialog: this.value.ticketNo === 0,
      readonly: this.value.ticketNo !== 0,

      item: this.value,
      itemValues: {},
    }
  },
  created() {
    console.log(this.value)
    console.log(this.dialog)
    console.log(this.readonly)
  },
  computed: {
    isEmptyTitle() {
      return this.value.ticketName == null || this.value.ticketName === "";
    },
    title() {
      return this.isEmptyTitle ? "EMPTY" : this.value.ticketName;
    },
    added() {
      return this.value.ticketNo === 0;
    }
  },
  watch: {
    dialog: function () {
      if (this.dialog) {
        this.loadTicket();
      } else {
        this.$emit("close")
      }
    }
  },
  methods: {
    loadTicket: async function() {
      if (!this.added) {
        let loadedItem = null;
        await getTicket(this.value.ticketNo)
          .then(value => loadedItem = value)

        await loadedItem.values.forEach(
          ({typeNo, dataValue}) => this.itemValues[typeNo] = dataValue
        )

        this.item = loadedItem;
      }

      console.log(this.item)
    },
    onClickSave: async function () {
      this.item.projectNo = this.projectNo;
      this.item.values = this.itemValues

      if (!this.added) {
        updateTicket(this.item)
          .then(() => {
            this.readonly = true

            this.$emit("update")
          })
      } else {
        createTicket(this.item)
          .then(() => {
            this.readonly = true

            this.$emit("update")
          })
      }
    },
    onUpdateStatus: function () {
      if (!this.added) {
        updateTicketStatus(this.item)
      }
    },
    onDelete: function () {
      deleteTicket(this.item.ticketNo)
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

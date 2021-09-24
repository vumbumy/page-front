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
      <v-card-actions class="d-flex justify-end">
        <v-read-write-access-select v-if="!shared" v-model="item.permissions" @update="onUpdatePermissions"/>
        <v-spacer/>
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
import {
  createTicket,
  deleteTicket, getPublicTicket,
  getTicket,
  updateTicket,
  updateTicketPermissions,
  updateTicketStatus
} from "@/api/ticket";
import VReadWriteAccessSelect from "@/components/ReadWriteAccessSelect";

export default {
  name: "VTicket",
  components: {VReadWriteAccessSelect},
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
  computed: {
    isEmptyTitle() {
      return this.value.ticketName == null || this.value.ticketName === "";
    },
    title() {
      return this.isEmptyTitle ? "EMPTY" : this.value.ticketName;
    },
    added() {
      return this.item.ticketNo === 0;
    },
    shared() {
      return this.projectNo === 0;
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
      let loadedItem = null;

      if (this.shared) {
        await getPublicTicket(this.value.ticketNo)
          .then(value => loadedItem = value)
      } else if (!this.added) {
        await getTicket(this.value.ticketNo)
          .then(value => loadedItem = value)
      }

      if (loadedItem != null) {
        await loadedItem.values.forEach(
          ({typeNo, dataValue}) => this.itemValues[typeNo] = dataValue
        )
      }

      this.item = loadedItem;
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
    onUpdatePermissions: function (permissions) {
      this.item.permissions = permissions
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

<template>
  <v-dialog v-model="dialog" width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-list-item-content v-bind="attrs" v-on="on">
        <v-list-item-title>
          <div class="d-flex flex-column">
            <div class="font-weight-bold" :class="{'font-italic': isEmptyTitle}" v-text="title"/>
            <div class="ml-auto overline" v-text="'CODE-' + value.recordCode"/>
          </div>
        </v-list-item-title>
      </v-list-item-content>
    </template>
    <v-card v-if="item">
      <v-card-actions class="d-flex justify-space-between">
        <div class="overline" v-text="'CODE-' + value.recordCode"/>
        <v-btn icon @click="onClose">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-actions>
      <v-card-title class="mb-3"><h2 v-text="item.recordName"/></v-card-title>
      <v-card-subtitle><h3 class="subtitle-1" v-text="item.projectName"/></v-card-subtitle>
      <v-card-text>
        <div v-for="column in itemColumns" :key="column.columnNo" >
          <v-textarea
            v-if="column.columnType === 'TextArea'"
            readonly
            :label="column.columnName"
            v-model="itemValues[column.columnNo]"
          />
          <v-date-selector
            v-else-if="column.columnType === 'Date'"
            readonly
            :label="column.columnName"
            v-model="itemValues[column.columnNo]"
          />
          <v-text-field
            v-else
            readonly
            :label="column.columnName"
            v-model="itemValues[column.columnNo]"
          />
        </div>
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
import {getPublicTicket} from "@/api/ticket";
import VDateSelector from "@/components/DateSelector";

export default {
  name: "VTicketDialog",
  components: {VDateSelector},
  props: {
    value: {
      type: Object
    },
    types: {
      type: Array
    },
    projectName: {
      type: String
    }
  },
  data() {
    return {
      dialog: this.value.recordNo === 0,
      // readonly: this.value.recordNo !== 0,

      item: this.value,
      itemColumns: [],
      itemValues: {},
    }
  },
  computed: {
    isEmptyTitle() {
      return this.value.recordName == null || this.value.recordName === "";
    },
    title() {
      return this.isEmptyTitle ? "EMPTY" : this.value.recordName;
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

      loadedItem = await getPublicTicket(this.value.recordCode)

      if (loadedItem != null) {
        loadedItem.values.forEach(
          ({columnNo, cellValue}) => this.itemValues[columnNo] = cellValue
        )

        this.itemColumns = this.types
          .filter(column => column.columnNo in this.itemValues)
      }

      this.item = loadedItem;
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

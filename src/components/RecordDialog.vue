<template>
  <v-dialog v-model="dialog" width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-list-item-content v-bind="attrs" v-on="on">
        <v-list-item-title>
          <div class="d-flex flex-column">
            <div class="font-weight-bold" :class="{'font-italic': isEmptyTitle}" v-text="title"/>
            <div v-if="!added" class="ml-auto overline" v-text="'CODE-' + value.recordCode"/>
          </div>
        </v-list-item-title>
      </v-list-item-content>
    </template>
    <v-card v-if="item">
      <v-card-actions class="d-flex justify-end">
        <div class="d-flex flex-row">
          <v-user-permission-dialog v-model="item.userPermissions"/>
          <v-divider class="mx-2" vertical/>
          <v-group-permission-dialog v-model="item.groupPermissions"/>
          <v-divider class="mx-2" vertical/>
          <v-icon-switch v-model="item.shared" :readonly="readonly"/>
        </div>
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
        <v-text-field :readonly="readonly" outlined label="Title" v-model="item.recordName"/>
      </v-card-title>

      <v-card-text>
        <div v-for="column in types" :key="column.columnNo">
          <v-textarea
            v-if="column.columnType === 'TextArea'"
            outlined
            dense
            :readonly="readonly"
            :label="column.columnName"
            v-model="itemValues[column.columnNo]"
          />
          <v-text-field
            v-else-if="column.columnType === 'Text' || column.columnType === 'URL'"
            outlined
            dense
            :readonly="readonly"
            :label="column.columnName"
            v-model="itemValues[column.columnNo]"
          />
          <v-date-selector
            v-else-if="column.columnType === 'Date'"
            :readonly="readonly"
            :label="column.columnName"
            v-model="itemValues[column.columnNo]"
          />
          <v-text-field
            v-else
            outlined
            dense
            :readonly="readonly"
            :label="type.columnName"
            v-model="itemValues[type.columnNo]"
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
import {
  createTicket,
  deleteTicket, getPublicTicket,
  getTicket,
  updateTicket
} from "@/api/ticket";
import VDateSelector from "@/components/DateSelector";
import VUserPermissionDialog from "@/components/UserPermissionDialog";
import VGroupPermissionDialog from "@/components/GroupPermissionDialog";
import VIconSwitch from "@/components/IconSwitch";

export default {
  name: "VRecordDialog",
  components: {VIconSwitch, VGroupPermissionDialog, VUserPermissionDialog, VDateSelector},
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
      dialog: this.value.recordNo === 0,
      readonly: this.value.recordNo !== 0,

      item: this.value,
      itemValues: {},
    }
  },
  computed: {
    isEmptyTitle() {
      return this.value.recordName == null || this.value.recordName === "";
    },
    title() {
      return this.isEmptyTitle ? "EMPTY" : this.value.recordName;
    },
    added() {
      return this.item.recordNo === 0;
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

      loadedItem = await getTicket(this.value.recordNo)

      if (loadedItem != null) {
        loadedItem.values.forEach(
          ({columnNo, cellValue}) => this.itemValues[columnNo] = cellValue
        )
      }

      this.item = loadedItem;
    },
    onClickSave: async function () {
      this.item.projectNo = this.projectNo;
      this.item.values = this.itemValues;
      this.item.permissions = this.item.userPermissions.concat(this.item.groupPermissions);

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
      deleteTicket(this.item.recordNo)
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

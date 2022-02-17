<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card v-if="project">
      <v-card-title class="d-flex justify-end">
        <v-read-write-access-select v-model="project.permissions"/>
        <v-spacer/>
        <v-btn icon v-if="project.writable && !added" @click="onDelete">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn icon v-if="project.writable && readonly" @click="readonly = false">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon v-if="project.writable && !readonly" @click="onClickSave">
          <v-icon>mdi-content-save</v-icon>
        </v-btn>
        <v-btn icon @click="onClose">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-form :readonly="readonly">
          <v-text-field class="text-h6" v-model="project.projectName"/>
            <v-date-selector v-model="project.startedAt" label="Start Date" :readonly="readonly"/>
            <v-date-selector v-model="project.endedAt" label="End Date" :readonly="readonly"/>
          <v-textarea outlined placeholder="Description" v-model="project.description"/>
          <v-data-table :headers="headers" hide-default-footer :items="project.columns" disable-sort disable-filtering>
            <template v-slot:item.columnType="{ item }">
              <v-select class="caption" dense :items="columnTypeList" v-model="item.columnType"/>
            </template>
            <template v-slot:item.columnName="{ item }">
              <v-text-field class="caption" dense v-model="item.columnName"/>
            </template>
            <template v-slot:item.defaultValue="{ item }">
              <v-text-field class="caption" dense v-model="item.defaultValue"/>
            </template>
            <template v-slot:item.required="{ item }">
              <v-switch dense v-model="item.required"/>
            </template>
          </v-data-table>
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex justify-end mx-2 mb-2">
        <v-btn :disabled="readonly" @click="onAddType">
          Add Type
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {deleteProject, getProject, Project} from "@/api/project";
import VReadWriteAccessSelect from "@/components/ReadWriteAccessSelect";
import {getColumnsType, DataColumn} from "@/api/types";
import {createProject, updateProject} from "@/api/project";
import VDateSelector from "./DateSelector";

export default {
  name: "VProjectDialog",
  components: {VDateSelector, VReadWriteAccessSelect},
  props: {
    value: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      dialog: false,
      readonly: true,

      headers: [
        {
          text: 'TYPE',
          // align: 'center',
          value: 'columnType',
          width: "10%"
        },
        {
          text: 'NAME',
          // align: 'center',
          value: 'columnName'
        },
        { text: 'DEFAULT',
          // align: 'center',
          value: 'defaultValue'
        },
        {
          text: 'REQUIRED',
          // align: 'center',
          value: 'required',
          width: "10%"
        },
      ],
      project: null,

      columnTypeList: []
    }
  },
  computed: {
    added() {
      return this.project.projectNo === 0;
    }
  },
  watch: {
    value: function() {
      this.dialog = this.value !== null
    },
    dialog() {
      if (this.dialog) {
        this.loadProject();
      } else {
        // this.project = null;

        this.$emit("input", null)
      }
    }
  },
  methods: {
    loadProject: async function() {
      await getColumnsType()
        .then(ret => this.columnTypeList = ret)

      if (this.value === 0) {
        this.project = new Project();

        this.readonly = false
      } else {
        await getProject(this.value)
          .then(item => this.project = item)
      }
    },
    onClickSave: async function () {
      if (this.added) {
        await createProject(this.project).then(() => {
          this.readonly = true
        })
      } else {
        await updateProject(this.project).then(() => {
          this.readonly = true
        })
      }

      this.$emit("update")
    },
    onAddType: function () {
      this.project.columns.push(new DataColumn())
    },
    onDelete: function () {
      deleteProject(this.project.projectNo)
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

</style>

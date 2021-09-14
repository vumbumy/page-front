<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card v-if="item">
      <v-card-title class="d-flex justify-end">
        <v-read-write-access-select v-model="item.permissions"/>
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
      </v-card-title>
      <v-card-text>
        <v-form :readonly="readonly">
          <v-text-field class="text-h5" height="45px" v-model="item.projectName"/>
          <v-row>
            <v-col cols="3">
              <div class="overline">type</div>
            </v-col>
            <v-col cols="3">
              <div class="overline">name</div>
            </v-col>
            <v-col cols="3">
              <div class="overline">default</div>
            </v-col>
            <v-col cols="3">
              <div class="overline">required</div>
            </v-col>
          </v-row>
          <v-row v-for="type in item.types" :key="type.typeNo">
            <v-col cols="3">
              <v-select dense outlined :items="['String', 'Number', 'Datetime']" v-model="type.dataType"/>
            </v-col>
            <v-col cols="3">
              <v-text-field dense outlined v-model="type.typeName"/>
            </v-col>
            <v-col cols="3">
              <v-text-field dense outlined v-model="type.defaultValue" placeholder="EMPTY"/>
            </v-col>
            <v-col cols="3">
              <v-switch class="mt-auto" dense v-model="type.required"/>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex justify-end">
        <v-btn>
          Add Type
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {deleteProject, getProject} from "@/api/project";
import VReadWriteAccessSelect from "@/components/ReadWriteAccessSelect";

export default {
  name: "VProject",
  components: {VReadWriteAccessSelect},
  props: {
    value: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      dialog: false,
      readonly: true,

      item: this.value,
    }
  },
  computed: {
    added() {
      return this.item.projectNo === 0;
    }
  },
  watch: {
    value: function() {
      this.dialog = this.value !== null
    },
    dialog() {
      if (this.dialog) {
        this.loadProject();
      }
      else {
        this.readonly = true

        this.$emit("input", null)
      }
    }
  },
  methods: {
    loadProject: async function() {
      await getProject(this.value.projectNo)
        .then(value => this.item = value)

      console.log(this.item)
    },
    onClickSave: async function () {
      if (this.added) {
        console.log("CREATE")
      } else {
        console.log("UPDATE")
      }
    },
    onDelete: function () {
      deleteProject(this.item.projectNo)
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

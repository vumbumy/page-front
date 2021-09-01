<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card v-if="project">
      <v-card-title class="d-flex justify-end">
        <v-btn icon><v-icon>mdi-pencil</v-icon></v-btn>
        <v-btn icon><v-icon>mdi-delete</v-icon></v-btn>
        <v-btn icon><v-icon>mdi-content-save</v-icon></v-btn>
      </v-card-title>
      <v-card-text>
        <v-form readonly>
          <v-text-field class="text-h5" height="45px" v-model="project.projectName"/>
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
          <v-row v-for="item in project.types" :key="item.typeNo">
            <v-col cols="3">
              <v-select dense outlined :items="['String', 'Number', 'Datetime']" v-model="item.dataType"/>
            </v-col>
            <v-col cols="3">
              <v-text-field dense outlined v-model="item.typeName"/>
            </v-col>
            <v-col cols="3">
              <v-text-field dense outlined v-model="item.defaultValue" placeholder="EMPTY"/>
            </v-col>
            <v-col cols="3">
              <v-switch class="mt-auto" dense v-model="item.required"/>
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
import {getProject} from "@/api/project";

export default {
  name: "VProject",
  props: {
    value: {
      type: Object
    }
  },
  data() {
    return {
      project: null,
      dialog: false
    }
  },
  watch: {
    value: async function() {
      if (this.value) {
        await getProject(this.value.projectNo)
          .then(value => this.project = value)

        this.dialog = true
      }
    },
    dialog() {
      if (!this.dialog) {
        this.$emit("input", null)
      }
    }
  }
}
</script>

<style scoped>

</style>

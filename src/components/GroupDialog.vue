<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card v-if="group">
      <v-card-title class="d-flex justify-end">
        <v-spacer/>
        <v-btn icon v-if="!added" @click="onDelete">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn icon v-if="readonly" @click="readonly = false">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon v-if="!readonly">
          <v-icon>mdi-content-save</v-icon>
        </v-btn>
        <v-btn icon @click="onClose">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-form :readonly="readonly">
          <v-text-field class="text-h6" v-model="group.groupName" placeholder="Group Name"/>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import {getUserGroup} from "@/api/group";
import {deleteProject} from "@/api/project";

export default {
  name: "VGroupDialog",
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

      group: null,
    }
  },
  computed: {
    added() {
      return this.group.groupNo === 0;
    }
  },
  watch: {
    value: function() {
      this.dialog = this.value !== null
    },
    dialog() {
      if (this.dialog) {
        this.loadGroup();
      } else {
        // this.group = null;

        this.$emit("input", null)
      }
    }
  },
  methods: {
    loadGroup: async function () {
      if (this.value === 0) {
        this.group = {
          groupNo: 0,
          groupName: ""
        }

        this.readonly = false
      } else {
        await getUserGroup(this.value)
          .then(item => this.group = item)
      }
    },
    onDelete: function () {
      // deleteProject(this.project.projectNo)
      //   .then(() => {
      //     this.readonly = true
      //
      //     this.$emit("update")
      //   })
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

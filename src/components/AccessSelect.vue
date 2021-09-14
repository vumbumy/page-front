<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon class="pa-0" v-bind="attrs" v-on="on">
        <v-icon dense v-text="icon"/>
      </v-btn>
    </template>
    <v-sheet class="d-flex flex-column pa-2">
      <v-checkbox :label="PUBLIC.KEY" :append-icon="PUBLIC.ICON" @click="onClickBox(PUBLIC.KEY)" v-model="isPublic"/>
      <v-btn class="d-flex justify-space-between pa-0" text>
        <v-icon class="mr-2">mdi-plus</v-icon><div class="flex-grow-1">ADD</div>
      </v-btn>
    </v-sheet>
  </v-menu>
</template>

<script>
import {GROUP, Permission, PRIVATE, PUBLIC} from "@/api/common";


export default {
  name: "VAccessSelect",
  props: {
    value: {
      type: Array
    },
    access: {
      type: String,
    },
  },
  data: () => ({
    isPublic: false,
    isPrivate: false,

    PUBLIC: PUBLIC
  }),
  computed: {
    icon() {
      if (this.isPrivate) {
        return PRIVATE.ICON
      } else if (this.isPublic) {
        return PUBLIC.ICON
      }
      return GROUP.ICON
    },
  },
  watch: {
    value() {
      if (this.value == null || this.value.length === 0) {
        this.isPrivate = true;
      } else {
        this.isPublic = this.value.some(value => value.userNo == null && value.groupNo == null);
      }
    }
  },
  methods: {
    onClickBox(key) {
      let permission = new Permission()
      if (key === "PUBLIC") {
        permission.accessRight = this.access
      }

      this.$emit("update", permission)
    }
  }
}
</script>

<style lang="scss" scoped>
.active {
  transform: rotate(-180deg)
}
</style>

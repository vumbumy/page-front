<template>
  <div>
    <v-access-select access="READ" @update="onUpdate" v-model="readPermissions"/>
    <v-divider vertical/>
    <v-access-select access="WRITE" @update="onUpdate" v-model="writePermissions"/>
  </div>
</template>

<script>
import VAccessSelect from "@/components/AccessSelect";
export default {
  name: "VReadWriteAccessSelect",
  components: {VAccessSelect},
  props: {
    value: {
      type: Array
    },
  },
  data() {
    return {
      readPermissions: [],
      writePermissions: []
    }
  },
  watch: {
    value() {
      if (this.value) {
        this.readPermissions = this.value.filter(
          permission => permission.accessRight === "READ"
        )
        this.writePermissions = this.value.filter(
          permission => permission.accessRight === "WRITE"
        )
      }
    }
  },
  methods: {
    onUpdate(permission) {
      this.$emit('update', [permission])
    }
  }
}
</script>

<style scoped>

</style>

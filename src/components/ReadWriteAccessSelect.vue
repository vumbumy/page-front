<template>
  <div>
    <v-access-select value="PUBLIC"/>
    /
    <v-access-select value="PRIVATE"/>
  </div>
</template>

<script>
import VAccessSelect from "@/components/AccessSelect";
export default {
  name: "VReadWriteAccessSelect",
  props: {
    value: {
      type: Object
    },
    readable: {
      type: Boolean
    },
    wrtiable: {
      type: Boolean
    }
  },
  data() {
    return {
      permissions: this.value
    }
  },
  components: {VAccessSelect}
}
</script>

<style scoped>

</style>

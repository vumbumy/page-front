<template>
  <v-btn icon :color="color" class="pa-0" @click="onClick">
    <v-icon dense>mdi-earth</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: "VIconSwitch",
  props: {
    value: Boolean,
    readonly: Boolean
  },
  data() {
    return {
      shared: null
    }
  },
  mounted() {
    this.shared = this.value
  },
  computed: {
    color() {
      return this.shared ? 'primary' : null
    }
  },
  watch: {
    value() {
      this.shared = this.value
    }
  },
  methods: {
    onClick: function () {
      if(!this.readonly) {
        this.$emit('input', this.shared = !this.shared)
      }
    }
  }
}
</script>

<style scoped>

</style>

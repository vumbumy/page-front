<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="auto"
    :disabled="readonly"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        :label="label"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="date"
      no-title
      @input="menu2 = false"
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: "VDateSelector",
  props: ['label', 'value', 'readonly'],
  data: vm => ({
    date: vm.formatDate(vm.value),
    menu: false,
  }),

  watch: {
    date (val) {
      this.$emit('input', this.$moment(val).valueOf())
    },
  },

  methods: {
    formatDate (date) {
      if (!date) return null

      return this.$moment(date).format('YYYY-MM-DD')
    }
  },
}
</script>

<style scoped>

</style>
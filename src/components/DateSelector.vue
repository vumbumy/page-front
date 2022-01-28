<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    :disabled="readonly"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        :label="label"
        readonly
        :clearable="!readonly"
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
  props: {
    label: String,
    value: [Number, String],
    readonly: Boolean
  },
  data: () => ({
    date: '',
    menu: false
  }),

  mounted() {
    this.date = this.formatDate(this.value)
  },

  watch: {
    date (val) {
      this.$emit('input', this.$moment(val).valueOf())
    },

    value() {
      this.date = this.formatDate(this.value)
    }
  },

  methods: {
    formatDate (date) {
      if (!date) return null

      if (typeof date == "string") date = parseInt(date)

      return this.$moment(date).format('YYYY-MM-DD')
    }
  },
}
</script>

<style scoped>

</style>

<template>
  <div class="d-flex flex-column pa-5">
    <v-fab-transition>
      <v-btn
        class="mb-10"
        absolute
        bottom
        right
        fab


      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
    <v-data-table
      hide-default-footer

      :headers="columns"
      :items="scheduleList"
    >
      <template v-slot:expanded-item="{ headers, item }">
        <td class="darken-4 grey pa-5" :colspan="headers.length" v-text="item.description"/>
      </template>
    </v-data-table>

  </div>
</template>

<script>
export default {
  name: "KPI",
  data() {
    return {
      columns: [
        { text: 'PROJECT', value: 'projectName' },
        { text: 'NAME', value: 'name'},
        { text: 'EVENT', value: 'event' },
        { text: 'PARAMETERS', value: 'json'},
        { text: '', value: 'data-table-expand' },
      ],
      scheduleList: []
    }
  },
}
</script>

<style scoped>

</style>

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
      show-expand
      hide-default-footer

      :headers="columns"
      :items="kpiList"
    >
      <template v-slot:expanded-item="{ headers, item }">
        <td class="darken-4 grey pa-5" :colspan="headers.length">
          <v-jsoneditor v-model="item.json" mode="view"/>
        </td>
      </template>
    </v-data-table>

  </div>
</template>

<script>
import VJsoneditor from 'v-jsoneditor/src/index'

export default {
  name: "Schedule",
  components: {
    VJsoneditor
  },
  data: () => {
    return {
      columns: [
        { text: 'NAME', value: 'name'},
        { text: 'EVENT', value: 'event' },
        { text: '', value: 'data-table-expand'},
      ],
      kpiList: [
        {
          name: "NOTI_30_DAYS",
          event: "NOTIFICATION",
          json: {project: 1, conditions: [{type: 1, value: 30, op: 'ge'}],  target: {type: 'MANAGER'}}
        },
        {
          name: "NOTI_STATUS_REVIEW",
          event: "NOTIFICATION",
          json: {project: 4, conditions: [{type: 2, value: 'REVIEW', op: 'eq'}],  target: {type: 'REF', value: [3]}}
        },
        {
          name: "HIDE_LE_210930",
          event: "ACTION",
          json: {project: 3, conditions: [{type: 3, value: '2021-09-30', op: 'le'}],  event: {type: 'HIDE'}}
        },
      ]
    }
  },
  methods: {

    description(item) {
      return `- 매일 00시\n- ${item.json.project}번 프로젝트\n ${item.json.condition.type}번 컬럼의 값이 ${item.json.condition}일 경우 ${item.json.target}에게 알림을 보냄`
    }
  }
}
</script>

<style scoped>

</style>

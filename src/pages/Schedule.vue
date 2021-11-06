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
      :items="scheduleList"
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
import {getScheduleList} from "@/api/event";

export default {
  name: "Schedule",
  components: {
    VJsoneditor
  },
  data: () => {
    return {
      columns: [
        { text: 'NAME', value: 'contentName'},
        { text: 'TYPE', value: 'eventType' },
        { text: 'CREATED', value: 'createdAt', align: "center"},
        { text: '', value: 'data-table-expand'},
      ],
      scheduleList: []
    }
  },
  created() {
    this.loadSchedules();
  },
  methods: {
    loadSchedules: async function() {
      this.scheduleList = [];

      await getScheduleList()
        .then(retArr => retArr.forEach(
          e => this.scheduleList.push(
            {
              ...e,
              json: JSON.parse(e.paramJson)
            }
          )
        ))
    },
    description(item) {
      return `- 매일 00시\n- ${item.json.project}번 프로젝트\n ${item.json.condition.type}번 컬럼의 값이 ${item.json.condition}일 경우 ${item.json.target}에게 알림을 보냄`
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div class="d-flex flex-row fill-height col-12 flex-wrap" v-if="loaded">
    <div class="col-12 col-md-6 col-lg-3" v-for="(arr, status) in taskMap" :key="status">
      <v-ticket-list
        :label="status"
        :project-no="0"
        :columns="columns"
        :value="arr"
      />
    </div>
  </div>
</template>

<script>
  import {getPublicTicketList, getTicketStatusList} from "@/api/ticket";
  import VTicketList from "@/components/TicketList";
  import {getColumns} from "@/api/types";

  export default {
    name: "Public",
    components: {
      VTicketList
    },
    props: {
      source: String,
    },
    data() {
      return {
        columns: [],

        statusList: [],
        taskMap: {},

        loaded: false
      }
    },
    created: async function() {
      await this.loadTicketList()
    },
    methods: {
      loadTicketList: async function () {
        this.loaded = false;

        await getTicketStatusList().then(
          value => this.statusList = value
        )

        for (const status of this.statusList) {
          this.taskMap[status] = []
        }

        await getColumns().then(
          value => this.columns = value
        )

        await getPublicTicketList().then(arr => arr
            .filter(v => this.statusList.includes(v.status))
            .forEach(v => this.taskMap[v.status].push(v))
        )

        this.loaded = true
      },
    }
  }
</script>

<template>
  <div class="d-flex flex-row fill-height col-12 flex-wrap" v-if="loaded">
    <div class="col-xs-12 col-md-4" v-for="(arr, status) in taskMap" :key="status">
      <v-ticket-list
        :label="status"
        :project-no="0"
        :types="typeList"
        :value="arr"
      />
    </div>
  </div>
</template>

<script>
  import {getPublicTicketList, getTicketStatusList} from "@/api/ticket";
  import VTicketList from "@/components/TicketList";
  import {getTypeList} from "@/api/types";

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
        // projectArr: [],
        // projectNo: null,
        typeList: [],

        statusList: ["TODO", "PROGRESS", "DONE"],
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

        for (const status of this.statusList) {
          this.taskMap[status] = []
        }

        await getTypeList().then(
          value => this.typeList = value
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

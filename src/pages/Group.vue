<template>
  <v-container>
    <v-data-table
      hide-default-footer
      :items="groupList"
      :headers="columns">
      <!--      <template v-slot:item.enabled="{ item }">-->
      <!--        <v-switch @change="toggleEnable(item)"-->
      <!--                  v-model="item.enabled"-->
      <!--        ></v-switch>-->
      <!--      </template>-->
      <!--      <template v-slot:item.roles="{item}">-->
      <!--        <v-icon v-if="isAdmin(item)">mdi-account-star</v-icon>-->
      <!--        <v-icon v-else-if="isPartner(item)">mdi-account-settings</v-icon>-->
      <!--        <v-icon v-else-if="isEnabled(item)">mdi-account</v-icon>-->
      <!--      </template>-->
    </v-data-table>
  </v-container>
</template>

<script>

export default {
  data() {
    return {
      groupList: [],
      columns: [
        { text: 'GROUP', value: 'groupName' },
        { text: 'USERS'},
        { text: 'CREATED', value: 'createdAt' },
      ],
    }
  },
  created() {
    // this.loadGroupList()
  },
  methods: {
    // loadGroupList: function () {
    //   this.groupList = null;
    //
    //   getGroupList().then(ret => {
    //     this.groupList = ret
    //   })
    // }
  }
}
</script>

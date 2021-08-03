<template>
  <v-container class="fill-height">
    <div v-text="userList"/>
  </v-container>
</template>

<script>
  import {getUserList} from "@/api/user";

  export default {
    name: "Home",
    props: {
      source: String,
    },
    data() {
      return {
        userList: ""
      }
    },
    created() {
      getUserList().then(ret => {
        this.userList = ret
      })
    },
    methods: {
      onDrag: function (dragging) {
        this.dragging = dragging
      }
    }
  }
</script>

<template>
  <v-menu offset-y v-model="menu">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon class="pa-0" v-bind="attrs" v-on="on">
        <v-icon dense v-text="accesses[value]"/>
      </v-btn>
    </template>
    <v-sheet class="d-flex flex-column">
      <div v-for="(value, key) in accesses" :key="key" class="d-flex">
        <v-btn text class="d-flex">
          <v-icon v-text="value" class="mr-2"/>{{key}}
        </v-btn>
        <v-simple-checkbox class="ml-auto" @click="onClickBox(key)"/>
      </div>
      <v-btn class="d-flex justify-start" text>
        <v-icon class="mr-2">mdi-plus</v-icon><div>ADD</div>
      </v-btn>
    </v-sheet>
  </v-menu>
</template>

<script>
export default {
  name: "VAccessSelect",
  props: {
    value: {
      type: String,
      default: () => {
        return ""
      }
    },
  },
  data: () => ({
    menu: null,
    accesses: {
      PUBLIC: 'mdi-earth',
      GROUP1: 'mdi-account-group',
      GROUP2: 'mdi-account-group',
      PRIVATE: 'mdi-lock-outline',
    },
  }),
  methods: {
    onClickBox(key) {
      console.log(key)
    }
  }
}
</script>

<style lang="scss" scoped>
.active {
  transform: rotate(-180deg)
}
</style>

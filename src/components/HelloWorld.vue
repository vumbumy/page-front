<template>
  <v-tooltip right>
    <template v-slot:activator="{ on }">
      <v-btn
              :href="source"
              icon
              large
              target="_blank"
              v-on="on"
      >
        <v-icon large>mdi-code-tags</v-icon>
      </v-btn>
    </template>
    <span>Source</span>
  </v-tooltip>
</template>

<script>
  export default {
    props: {
      source: String,
    }
  }
</script>
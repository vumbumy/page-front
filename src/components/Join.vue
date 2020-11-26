<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col class="shrink">
<!--      <v-col>-->
        <v-form
            style="width: 300px"
            ref="form"
            lazy-validation
        >
          <v-text-field
              type="email"
              placeholder="EMAIL"
              required
              v-model="email"
          />
          <v-text-field
              type="password"
              placeholder="PASSWORD"
              required
              v-model="password"
          />
          <v-text-field
              type="password"
              placeholder="PASSWORD CONFIRM"
              required
          />
          <v-btn block @click="onClickJoin">
            SEND CODE
          </v-btn>
          <v-btn block text class="mt-5" to="/login">
            BACK TO LOGIN
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
<!--  <v-tooltip right>-->
<!--    <template v-slot:activator="{ on }">-->
<!--      <v-btn-->
<!--              :href="source"-->
<!--              icon-->
<!--              large-->
<!--              target="_blank"-->
<!--              v-on="on"-->
<!--      >-->
<!--        <v-icon large>mdi-code-tags</v-icon>-->
<!--      </v-btn>-->
<!--    </template>-->
<!--    <span>Source</span>-->
<!--  </v-tooltip>-->
</template>

<script>
  import {join} from "@/api/main";

  export default {
    data() {
      return {
        email: "",
        password: "",

        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid',
        ],
      }
    },
    methods: {
      onClickJoin: function (){
        join(this.email, this.password)
      },
      // validEmail: function (email) {
      //   var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      //   return re.test(email);
      // }
    }
  }
</script>
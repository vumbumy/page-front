<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col class="shrink">
        <!--      <v-col>-->
        <!--        <v-alert>-->
        <!--          {{msg}}-->
        <!--        </v-alert>-->
        <v-form
          style="width: 300px"
          ref="form"
          lazy-validation
        >
          <v-text-field
            placeholder="EMAIL"
            required
            v-model="email"
          />
          <v-text-field
            type="password"
            placeholder="PASSWORD"
            required
            v-model="password"
            @keydown.enter="onClickLogin(email, password)"
          />
          <v-btn block :loading="loading" @click="onClickLogin(email, password)">
            LOGIN
          </v-btn>
          <v-btn block text class="mt-5" to="/join">
            JOIN US
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
  export default {
    name: "Login",
    data() {
      return {
        email: "",
        password: "",

        loading: false,

        msg: null
      }
    },
    methods: {
      onClickLogin: function (email, password){
        let vm = this

        vm.loading = true
        // LOGIN 액션 실행
        this.$store
          .dispatch("LOGIN", { email, password })
          .then(() => this.$router.push("/"))
          .catch(({ message }) => (this.msg = message))
          .finally(() => vm.loading = false)
      }
    }
  }
</script>

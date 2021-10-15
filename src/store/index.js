// store/index.js

import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

import {Api} from "@/api/common";

import path from "@/config/path";
import {ROLE_ADMIN} from "@/config/constant";

// const enhanceAccessToeken = () => {
//   const { accessToken } = localStorage
//   if (!accessToken) return
//
//   return accessToken
// }

export default new Vuex.Store({
  state: {
    account: null,
    token: null
  },
  getters: {
    isAuthenticated: state => {
      return state.account !== null
    },
    currentUserNo: state => {
      return state.account.userNo
    },
    isAdmin: (state) => {
      if (state.account == null) return false;

      return state.account.roles.includes(ROLE_ADMIN)
    }
  },
  mutations: {
    setToken(state, { data }) {
      Api.defaults.headers["X-Auth-Token"] = data

      // 토큰을 로컬 스토리지에 저장
      localStorage.accessToken = data
    },
    clear(state) {
      state.account = null;

      delete localStorage.accessToken
    },
    setAccount(state, {data}) {
      state.account = data;
    },
  },
  actions: {
    LOGIN({ commit }, { email, password }) {
      return new Promise((resolve, reject) => Api.post(path.auth.sign.in,
        {
          email: email,
          password: password
        })
        .then(res => {
          commit("setToken", res)

          resolve()
        })
        .catch(err => {
          console.log(err.response)
          reject(err.response)
        })
      );
    },
    LOGOUT({ commit }) {
      return new Promise((resolve) => {
        commit("clear")

        resolve()
      })
    },
    AUTH({commit}) {
      return Api.get(path.auth.me)
        .then(res => commit("setAccount", res))
        .catch(() => commit("clear"))
    }
  },
})

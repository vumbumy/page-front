// store/index.js

import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

import {Api} from "@/api/common";

import path from "@/config/path";

const enhanceAccessToeken = () => {
  const { accessToken } = localStorage
  if (!accessToken) return

  return accessToken
}

export default new Vuex.Store({
  state: {
    accessToken: enhanceAccessToeken(),
  },
  getters: {
    isAuthenticated: state => {
      return state.accessToken !== undefined
    }
  },
  mutations: {
    LOGIN(state, { data }) {
      state.accessToken = data

      // 토큰을 로컬 스토리지에 저장
      localStorage.accessToken = data
    },
    LOGOUT(state) {
      state.accessToken = undefined

      delete localStorage.accessToken
    },
  },
  actions: {
    LOGIN({ commit }, { email, password }) {
      return Api.post(path.sign.in,
          {
            userName: email,
            password: password
          })
        .then(( data ) => commit("LOGIN", data))
    },
    LOGOUT({ commit }) {
      return new Promise((resolve) => {
        commit("LOGOUT")

        resolve()
      })
    },
  },
})

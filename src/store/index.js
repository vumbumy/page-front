// store/index.js

import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import {resourceHost} from "../api/config";

Vue.use(Vuex)

const enhanceAccessToeken = () => {
  const { accessToken } = localStorage
  if (!accessToken) return
  axios.defaults.headers.common["X-AUTH-TOKEN"] = accessToken

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
      axios.defaults.headers.common["X-AUTH-TOKEN"] = data

      // 토큰을 로컬 스토리지에 저장
      localStorage.accessToken = data
    },
    LOGOUT(state) {
      state.accessToken = undefined
      axios.defaults.headers.common['X-AUTH-TOKEN'] = undefined

      delete localStorage.accessToken
    },
  },
  actions: {
    LOGIN({ commit }, { email, password }) {
      return axios
        .post(`${resourceHost}/login`,
          {
            email: email,
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
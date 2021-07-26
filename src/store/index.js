// store/index.js

import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"

Vue.use(Vuex)

const enhanceAccessToeken = () => {
  const { accessToken } = localStorage
  if (!accessToken) return
  axios.defaults.headers.common["Authorization"] = accessToken

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
      axios.defaults.headers.common["Authorization"] = data

      // 토큰을 로컬 스토리지에 저장
      localStorage.accessToken = data
    },
    LOGOUT(state) {
      state.accessToken = undefined
      axios.defaults.headers.common['Authorization'] = undefined

      delete localStorage.accessToken
    },
  },
  actions: {
    LOGIN({ commit }, { email, password }) {
      return axios
        .post(`${process.env.VUE_APP_API_BASE_URL}/sign/in`,
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

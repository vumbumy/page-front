// store/index.js

import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"

Vue.use(Vuex)

export const resourceHost = "http://192.168.239.128:8090/api"

export default new Vuex.Store({
    state: {
        accessToken: localStorage.accessToken,
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
            return axios
                .post(`${resourceHost}/login`,
                    {
                        email: email,
                        password: password
                    })
                .then(( data ) => commit("LOGIN", data))
        },
        LOGOUT({ commit }) {
            commit("LOGOUT")
        },
    },
})
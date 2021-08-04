import Vue from 'vue';
import Router from 'vue-router';

import Login from "@/components/Login";
import Home from "@/components/Home";
import store from "@/store";
import Join from "@/components/Join";
import Board from "../components/Board";
import Users from "@/components/Users";

Vue.use(Router);

const requireAuth = () => (to, from, next) => {
  store.dispatch("AUTH").then(() => {
    if (store.getters.isAuthenticated) {
      return next();
    }
    next('/login')
  })
};


export default new Router({
  mode: 'history',
  routes:[
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      component: Home,
      beforeEnter: requireAuth(),
    },
    {
      path: '/board',
      component: Board,
      beforeEnter: requireAuth(),
    },
    {
      path: '/join',
      component: Join
    },
    {
      path: '/users',
      component: Users
    },
  ]
})

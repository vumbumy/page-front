import Vue from 'vue';
import Router from 'vue-router';

import Login from "@/pages/Login";
import Home from "@/pages/Home";
import store from "@/store";
import Join from "@/pages/Join";
import Board from "@/pages/Board";
import Users from "@/pages/Users";
import PublicBoard from "@/pages/PublicBoard";

Vue.use(Router);

const requireAuth = () => (to, from, next) => {
  store.dispatch("AUTH").then(() => {
    if (store.getters.isAuthenticated) {
      return next();
    }
    next('/public')
  })
};

const requireAdmin = () => (to, from, next) => {
  store.dispatch("AUTH").then(() => {
    if (store.getters.isAuthenticated && store.getters.isAdmin) {
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
      path: '/join',
      component: Join
    },
    {
      path: '/',
      component: Home,
      beforeEnter: requireAuth(),
    },
    {
      path: '/public',
      component: PublicBoard,
    },
    {
      path: '/board',
      component: Board,
      beforeEnter: requireAuth(),
    },
    {
      path: '/users',
      component: Users,
      beforeEnter: requireAdmin(),
    },
  ]
})

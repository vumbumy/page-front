import Vue from 'vue';
import Router from 'vue-router';

import Login from "@/pages/Login";
import Home from "@/pages/Home";
import store from "@/store";
import Join from "@/pages/Join";
import Users from "@/pages/Users";
import Public from "@/pages/Public";
import Group from "@/pages/Group";
import Project from "@/pages/Project";
import Board from "@/pages/Board";
import KPI from "@/pages/KPI";
import Schedule from "@/pages/Schedule";

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
  store.dispatch("AUTH")
    .then(() => {
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
      component: Public,
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
    {
      path: '/groups',
      component: Group,
      beforeEnter: requireAdmin(),
    },
    {
      path: '/projects',
      component: Project,
      beforeEnter: requireAuth(),
    },
    {
      path: '/kpi',
      component: KPI,
      beforeEnter: requireAuth(),
    },
    {
      path: '/schedules',
      component: Schedule,
      beforeEnter: requireAuth(),
    },
  ]
})

import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Dashboard from "../views/Dashboard";
import RegisterUser from "../views/RegisterUser";
import LoginUser from "../views/LoginUser";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterUser,
  },
  {
    path: "/login",
    name: "login",
    component: LoginUser,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

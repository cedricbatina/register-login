import Vue from "vue";

import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";

Vue.use(Router);

export const router = new Router({
  mode: "history",
  routes: [
    { name: "Home", path: "/", component: Home },
    { name: "Login", path: "/login", component: Login },
    { name: "Register", path: "/register", component: Register },
    {
      name: "Profile",
      path: "/",
      component: () => import("./views/Profile.vue"),
    },
  ],
});

router.beforeEach((to, _from, next) => {
  const publicPages = ["/", "/login", "/register"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  // trying to access a restricted page + not logged in redirect to login page
  if (authRequired && !loggedIn) {
    next("/");
  } else {
    next();
  }
});

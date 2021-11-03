import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import { router } from "./router";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faHome,
  faUser,
  faCoffee,
  faBasketballBall,
  faBook,
  faBusinessTime,
  faCalendar,
  faCamera,
  faCommentAlt,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faCoffee,
  faBasketballBall,
  faBook,
  faBusinessTime,
  faCalendar,
  faCamera,
  faCommentAlt
);
const ValidationProvider = require("vee-validate");

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("ValidationProvider", ValidationProvider);

Vue.config.productionTip = false;
Vue.use(ValidationProvider);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

//import { defineRule } from "vee-validate";
//import validationProvider from "vee-validate";
//import * as rules from "@vee-validate/rules";

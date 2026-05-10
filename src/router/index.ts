import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home.vue";
import About from "../views/about.vue";
import Contact from "../views/contact.vue";
import License from "../views/license.vue";
import Info from "../views/info.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/contact", component: Contact },
  { path: "/license", component: License },
  { path: "/info", component: Info },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

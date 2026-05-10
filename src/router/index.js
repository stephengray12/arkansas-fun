import { createRouter, createWebHistory } from "vue-router";
const routes = [
    {
        path: "/",
        name: "home",
        component: () => import("../views/home.vue"),
    },
    {
        path: "/about",
        name: "about",
        component: () => import("../views/about.vue"),
    },
    {
        path: "/contact",
        name: "contact",
        component: () => import("../views/contact.vue"),
    },
    {
        path: "/license",
        name: "license",
        component: () => import("../views/license.vue"),
    },
    {
        path: "/info",
        name: "info",
        component: () => import("../views/info.vue"),
    },
];
export const router = createRouter({
    history: createWebHistory(),
    routes,
});

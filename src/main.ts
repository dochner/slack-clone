import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createHead } from "@vueuse/head";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "~/router/routes";

const head = createHead();
const router = createRouter({
  history: createWebHistory(),
  routes,
});

import "@unocss/reset/tailwind.css";
import "uno.css";

const app = createApp(App);

app.use(router);
app.use(head);
app.mount("#app");

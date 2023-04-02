import { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
  {
    name: "",
    path: "/",
    component: async () => (await import("~/pages/index.vue")).default,
  },
  {
    name: "channels",
    path: "/channels",
    component: async () => await import("~/pages/channels.vue"),
    children: [
      {
        name: "channels/:id",
        path: "/channels/:id",
        component: async () => await import("~/pages/channels/[id].vue"),
      },
    ],
  },
];

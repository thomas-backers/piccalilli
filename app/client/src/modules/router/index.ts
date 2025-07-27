import { type Router, createRouter, createWebHistory } from "vue-router";

export const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/sign-in" },
    {
      path: "/sign-in",
      name: "SignIn",
      component: () => import("@/views/pages/SignIn.vue"),
    },
    {
      path: "/sign-up",
      name: "SignUp",
      component: () => import("@/views/pages/SignUp.vue"),
    },
  ],
});

import { useUserStore } from "@/modules/store/user";
import { type Router, createRouter, createWebHistory } from "vue-router";

export const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/sign-in",
      name: "SignIn",
      component: () => import("@/views/pages/SignIn.vue"),
      meta: { requiresGuest: true },
    },
    {
      path: "/sign-up",
      name: "SignUp",
      component: () => import("@/views/pages/SignUp.vue"),
      meta: { requiresGuest: true },
    },
    {
      path: "/",
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          name: "Home",
          component: () => import("@/views/pages/Home.vue"),
          meta: { requiresVerified: true },
        },
        {
          path: "verify",
          name: "Verify",
          component: () => import("@/views/pages/Verify.vue"),
          meta: { requiresNotVerified: true },
        },
      ],
    },
  ],
});

router.beforeEach((to) => {
  const { user } = useUserStore();
  if (to.matched.some((record) => record.meta.requiresAuth) && !user) {
    return {
      name: "SignIn",
      query: { redirect: to.fullPath },
    };
  }
  if (to.matched.some((record) => record.meta.requiresGuest) && user) {
    return {
      name: "Home",
    };
  }
  if (
    to.matched.some((record) => record.meta.requiresVerified) &&
    !user?.verified
  ) {
    return {
      name: "Verify",
      query: { redirect: to.fullPath },
    };
  }
  if (
    to.matched.some((record) => record.meta.requiresNotVerified) &&
    user?.verified
  ) {
    return {
      name: "Home",
    };
  }
});

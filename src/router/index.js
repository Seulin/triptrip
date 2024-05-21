import { createRouter, createWebHistory } from "vue-router";
import TheMainView from "../views/TheMainView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: TheMainView,
    },
    {
      path: "/qna",
      name: "qna",
      // component: TheBoardView,
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/QnAView.vue"),
      redirect: { name: "qna-list" },
      children: [
        {
          path: "list",
          name: "qna-list",
          component: () => import("@/components/board/QnAList.vue"),
        },
        {
          path: "view/:qnano",
          name: "qna-view",
          component: () => import("@/components/board/QnADetail.vue"),
        },
        {
          path: "write",
          name: "qna-write",
          component: () => import("@/components/board/QnAWrite.vue"),
        },
        {
          path: "modify/:qnano",
          name: "qna-modify",
          component: () => import("@/components/board/QnAModify.vue"),
        },
        {
          path: "test",
          name: "qna-test",
          component: () => import("@/components/board/QnATest.vue"),
        },
      ]
    },
    {
      path: "/plan",
      name: "plan",
      component: () => import("../views/PlanView.vue"),
    },
  ]
});

export default router;

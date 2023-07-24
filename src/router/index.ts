import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from "../views/HomeView.vue";
import TopView from "../views/TopView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: HomeView,
  },
  {
    path: "/top",
    component: TopView,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

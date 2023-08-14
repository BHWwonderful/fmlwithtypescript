import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from "../views/HomeView.vue";
import TopView from "../views/TopView.vue";
import ModerateView from "../views/ModerateView.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: HomeView,
  },
  {
    path: "/top",
    component: TopView,
  },
  {
    path: "/moderate",
    component: ModerateView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

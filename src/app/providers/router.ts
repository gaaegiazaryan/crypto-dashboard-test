import {createRouter, createWebHashHistory, createWebHistory, type RouteRecordRaw} from "vue-router"
import DashboardPage from "@/pages/dashboard/ui/DashboardPage.vue"
import AssetDetailsPage from "@/pages/asset-details/ui/AssetDetailsPage.vue"

const routes: RouteRecordRaw[] = [
  { path: "/", name: "dashboard", component: DashboardPage },
  { path: "/asset/:id", name: "asset-details", component: AssetDetailsPage, props: true },
  { path: "/:pathMatch(.*)*", redirect: "/" }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})

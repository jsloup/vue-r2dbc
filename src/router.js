import { createWebHistory, createRouter } from "vue-router";
const routes =  [
  {
    path: "/",
    alias: "/persons",
    name: "persons",
    component: () => import("./components/PersonList")
  },
  {
    path: "/person/:id",
    name: "person-details",
    component: () => import("./components/Person")
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./components/AddPerson")
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
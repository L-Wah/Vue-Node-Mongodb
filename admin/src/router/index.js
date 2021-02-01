import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";
import CategoryEdit from "../views/CategoryEdit.vue";
import CategoryList from "../views/CategoryList.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
    children: [
      {
        path: "/categories/create",
        name: "CategoryEdit",
        component: CategoryEdit,
      },
      {
        path: "/categories/list",
        name: "CategoryList",
        component: CategoryList,
      },
      {
        path: "/categories/edit/:id",
        name: "CategoryEdit",
        props: true,
        component: CategoryEdit,
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;

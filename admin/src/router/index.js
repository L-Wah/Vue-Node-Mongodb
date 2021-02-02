import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";
import CategoryEdit from "../views/CategoryEdit.vue";
import CategoryList from "../views/CategoryList.vue";
import ItemEdit from "../views/ItemEdit.vue";
import ItemList from "../views/ItemList.vue";
import HeroEdit from "../views/HeroEdit.vue";
import HeroList from "../views/HeroList.vue";
import ArticleEdit from "../views/ArticleEdit.vue";
import ArticleList from "../views/ArticleList.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
    children: [
      // 分类
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
      // 物品
      {
        path: "/items/create",
        name: "ItemEdit",
        component: ItemEdit,
      },
      {
        path: "/items/list",
        name: "ItemList",
        component: ItemList,
      },
      {
        path: "/items/edit/:id",
        name: "ItemEdit",
        props: true,
        component: ItemEdit,
      },
      // 英雄
      {
        path: "/heroes/create",
        name: "HeroEdit",
        component: HeroEdit,
      },
      {
        path: "/heroes/list",
        name: "HeroList",
        component: HeroList,
      },
      {
        path: "/heroes/edit/:id",
        name: "HeroEdit",
        props: true,
        component: HeroEdit,
      },
      // 文章
      {
        path: "/articles/create",
        name: "ArticleEdit",
        component: ArticleEdit,
      },
      {
        path: "/articles/list",
        name: "ArticleList",
        component: ArticleList,
      },
      {
        path: "/articles/edit/:id",
        name: "ArticleEdit",
        props: true,
        component: ArticleEdit,
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;

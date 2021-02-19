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
import AdEdit from "../views/AdEdit.vue";
import AdList from "../views/AdList.vue";
import AdminUserEdit from "../views/AdminUserEdit.vue";
import AdminUserList from "../views/AdminUserList.vue";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue"

Vue.use(VueRouter);

const routes = [
  // 登录
  // meta: { isPublic: true } 全部页面都需要授权
  { path: "/login", name: "login", component: Login, meta: { isPublic: true } },
  {
    path: "/",
    name: "Main",
    component: Main,
    children: [
      { path: '/', name: 'home', component: Home },
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
      // 广告位
      {
        path: "/ads/create",
        name: "AdEdit",
        component: AdEdit,
      },
      {
        path: "/ads/list",
        name: "AdList",
        component: AdList,
      },
      {
        path: "/ads/edit/:id",
        name: "AdEdit",
        props: true,
        component: AdEdit,
      },
      // 管理员管理
      {
        path: "/admin_users/create",
        name: "AdminUserEdit",
        component: AdminUserEdit,
      },
      {
        path: "/admin_users/list",
        name: "AdminUserList",
        component: AdminUserList,
      },
      {
        path: "/admin_users/edit/:id",
        name: "AdminUserEdit",
        props: true,
        component: AdminUserEdit,
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

// 路由守卫; beforeEach全局前置守卫
router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !sessionStorage.token) {
    return next("/login");
  }
  next();
});
export default router;

<template>
  <el-container style="height: 100vh">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <!-- default-openeds="['1']"控制默认展开哪个 -->
      <!-- unique-opened 一次打开一个 -->
      <!-- :default-active 根据路由高亮 -->
      <el-menu router unique-opened :default-active="$route.path">
        <el-submenu index="1">
          <template slot="title"
            ><i class="el-icon-message"></i>内容管理</template
          >
          <el-menu-item-group>
            <template slot="title">物品</template>
            <el-menu-item index="/items/create">新建物品</el-menu-item>
            <el-menu-item index="/items/list">物品列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">英雄</template>
            <el-menu-item index="/heroes/create">新建英雄</el-menu-item>
            <el-menu-item index="/heroes/list">英雄列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">文章</template>
            <el-menu-item index="/articles/create">新建文章</el-menu-item>
            <el-menu-item index="/articles/list">文章列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"
            ><i class="el-icon-message"></i>运营管理</template
          >
          <el-menu-item-group>
            <template slot="title">广告位</template>
            <el-menu-item index="/ads/create">新建广告位</el-menu-item>
            <el-menu-item index="/ads/list">广告位列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"
            ><i class="el-icon-message"></i>系统设置</template
          >
          <el-menu-item-group>
            <template slot="title">分类</template>
            <el-menu-item index="/categories/create">新建分类</el-menu-item>
            <el-menu-item index="/categories/list">分类列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">管理员</template>
            <el-menu-item index="/admin_users/create">新建管理员</el-menu-item>
            <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown @command="handleCommand">
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="see">查看</el-dropdown-item>
            <el-dropdown-item command="add">新增</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>{{ name }}</span>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
import session from "../session";
export default {
  data() {
    return {
      name: "",
    };
  },
  mounted() {
    if (!this.name) {
      console.log("object");
      this.name = session.getItem("AdminName");
    }
  },
  methods: {
    handleCommand(command) {
      // router.push 或 router.replace 中提供 onComplete 和 onAbort 回调作为第二个和第三个参数。这些回调将会在导航成功完成 (在所有的异步钩子被解析之后) 或终止 (导航到相同的路由、或在当前导航完成之前导航到另一个不同的路由) 的时候进行相应的调用。
      if (command == "see") {
        this.$router.push(
          { path: "/admin_users/list" },
          (onComplete) => {},
          (onAbort) => {}
        );
      } else {
        this.$router.push(
          { path: "/admin_users/create" },
          (onComplete) => {},
          (onAbort) => {}
        );
      }
    },
  },
};
</script>
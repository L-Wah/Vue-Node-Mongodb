<template>
  <div>
    <el-card header="请先登录" class="login-card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="model.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
      <!-- 验证码 -->
      <Vcode
        :show="isShow"
        @success="success"
        @close="close"
        :canvasWidth="500"
        :canvasHeight="350"
      />
    </el-card>
  </div>
</template>
<script>
import session from "../session";
import Vcode from "vue-puzzle-vcode";
export default {
  data() {
    return {
      model: {},
      isShow: false,
    };
  },
  components: {
    Vcode,
  },
  methods: {
    async login() {
      this.isShow = true;
    },
    //验证成功
    async success() {
      try {
        const res = await this.$http.post("/login", this.model);
        // sessionStorage窗口关闭即删除存储
        sessionStorage.token = res.data;
        session.setItem("AdminName", this.model.username);
        this.$router.push("/");
        this.$message.success("登陆成功");
      } catch (error) {
        this.isShow = false;
      }
    },
    close() {
      this.isShow = false;
    },
  },
};
</script>
<style>
.login-card {
  width: 25rem;
  margin: 10rem auto;
}
</style>

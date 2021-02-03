<template>
  <div class="about">
    <h1>{{ id ? "编辑" : "新建" }}广告</h1>
    <!-- @submit.native.prevent 原生form表单prevent阻止跳转页面 -->
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input placeholder="" v-model="model.name" size="normal" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    id: {},
  },
  data() {
    return {
      model: {},
      parents: [],
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/ads/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/ads", this.model);
      }
      this.$router.push("/ads/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/ads/${this.id}`);
      this.model = res.data;
    },
  },
  created() {
    this.id && this.fetch();
  },
};
</script>

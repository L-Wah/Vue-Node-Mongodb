module.exports = (app) => {
  const express = require("express");
  const router = express.Router(); //子路由
  const Category = require("../../models/Category");
  // 创建
  router.post("/categories", async (req, res) => {
    console.log(req.body);
    const model = await Category.create(req.body);
    res.send(model);
  });
  // 修改
  router.put("/categories/:id", async (req, res) => {
    console.log(req.body);
    const model = await Category.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });
  // 查询
  router.get("/categories", async (req, res) => {
    const items = await Category.find().populate("parent").limit(10);
    res.send(items);
  });
  // 查询某一个
  router.get("/categories/:id", async (req, res) => {
    const items = await Category.findById(req.params.id);
    res.send(items);
  });
  // 删除
  router.delete("/categories/:id", async (req, res) => {
    await Category.findByIdAndDelete(req.params.id);
    res.send({ success: true });
  });
  app.use("/admin/api", router);
};

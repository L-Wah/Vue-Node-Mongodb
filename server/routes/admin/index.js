// 通用CRUD增删改查接口
module.exports = (app) => {
  const express = require("express");
  const router = express.Router({
    // 保留来自父路由器的req.params值
    mergeParams: true,
  });
  //子路由
  // 创建
  router.post("/", async (req, res) => {
    console.log(req.body);
    const model = await req.Model.create(req.body);
    res.send(model);
  });
  // 修改
  router.put("/:id", async (req, res) => {
    console.log(req.body);
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });
  // 查询
  router.get("/", async (req, res) => {
    const queryOptions = {};
    if (req.Model.modelName === "Category") {
      queryOptions.populate = "parent";
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(10);
    res.send(items);
  });
  // 查询某一个
  router.get("/:id", async (req, res) => {
    const items = await req.Model.findById(req.params.id);
    res.send(items);
  });
  // 删除
  router.delete("/:id", async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id);
    res.send({ success: true });
  });
  // 中间件用法：定义路由参数
  app.use(
    "/admin/api/rest/:resource",
    (req, res, next) => {
      // npm i inflection 装<小写转大写>的插件
      // 转类名 请求的是categories，找的模块是Category
      const modelName = require("inflection").classify(req.params.resource);
      req.Model = require(`../../models/${modelName}`);
      next();
    },
    router
  );
  // 中间件：用于上传文件  npm i multer
  const multer = require("multer");
  // __dirname 总是指向被执行 js 文件的绝对路径
  const upload = multer({ dest: __dirname + "/../../uploads" });
  // 定义接收的文件路径与名file
  app.post("/admin/api/upload", upload.single("file"), async (req, res) => {
    const file = req.file;
    file.url = `http://localhost:3000/uploads/${file.filename}`;
    res.send(file);
  });
};

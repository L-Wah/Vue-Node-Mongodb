// 通用CRUD增删改查接口
module.exports = (app) => {
  const express = require("express");
  // 返回token npm i jsonwebtoken
  const jwt = require("jsonwebtoken");
  const AdminUser = require("../../models/AdminUser");
  //用户提示http-assert插件 npm i http-assert 简化res.send加状态码，
  // 需加入错误处理逻辑 且 不能有异步操作 async await
  const assert = require("http-assert");
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

  // 登录校验中间件(req, res, next)
  const authMidware = require("../../middleware/auth");

  // 查询
  router.get("/", authMidware(), async (req, res) => {
    const queryOptions = {};
    if (req.Model.modelName === "Category") {
      queryOptions.populate = "parent";
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(10);
    res.send(items);
  });
  // 资源中间件
  const resourceMidware = require("../../middleware/resource");
  app.use(
    "/admin/api/rest/:resource",
    authMidware(),
    resourceMidware(),
    router
  );

  // 中间件：用于上传文件  npm i multer
  const multer = require("multer");
  // __dirname 总是指向被执行 js 文件的绝对路径
  const upload = multer({ dest: __dirname + "/../../uploads" });
  // 定义接收的文件路径与名file
  app.post(
    "/admin/api/upload",
    authMidware(),
    upload.single("file"),
    async (req, res) => {
      const file = req.file;
      file.url = `http://localhost:3000/uploads/${file.filename}`;
      res.send(file);
    }
  );

  // 登录接口
  app.post("/admin/api/login", async (req, res, next) => {
    console.log(req.body);
    const { username, password } = req.body;
    const user = await AdminUser.findOne({ username }).select("+password");
    // const AdminUser = require("../../models/AdminUser");
    // if (!user) {
    //   // 设置状态码422;
    //   return res.status(422).send({
    //     message: "用户不存在",
    //   });
    // }
    try {
      assert(user, 422, "用户不存在");
      assert(password, 422, "请输入密码");
      // compareSync比较必须保证两个参数不为空且不是undefined
      const isValid = require("bcrypt").compareSync(password, user.password);
      // if (!isValid) {
      //   return res.status(422).send({
      //     message: "密码错误",
      //   });
      // }
      assert(isValid, 422, "密码错误");
      // sign签名（要加密的数据（对象），密钥））
      // get 里面只有一个参数，表示获取环境变量 ，多个参数则是表示路由
      const token = jwt.sign({ id: user._id }, app.get("secret"));
      res.send(token);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
  // 错误处理逻辑
  app.use((error, req, res, next) => {
    //发送使用assert语句传入的状态码和错误提示信息
    res.status(error.statusCode || 500).send({
      message: error.message,
    });
  });
};

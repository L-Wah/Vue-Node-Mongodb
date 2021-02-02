const express = require("express");
const app = express();

app.use(express.json());
app.use(require("cors")());

require("./plugins/db")(app);
require("./routes/admin")(app);

// 静态文件托管
app.use("/uploads", express.static(__dirname + "/uploads"));

app.listen(3000, () => {
  console.log("端口3000连接成功");
});

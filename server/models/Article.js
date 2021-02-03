const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  // 分类关联Category分类模型，有多个值所以定义一个数组,界面中下拉选择，不用手动输入
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Category" }],
  title: { type: String },
  body:{ type: String}
});
module.exports = mongoose.model("Article", schema);

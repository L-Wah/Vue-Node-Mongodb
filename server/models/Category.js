const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  name: { type: String },
  // 父级类型:mongoose.SchemaTypes.ObjectId 是一个id ，ref 关联的模型是 本身 Category
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: "Category" },
});
module.exports = mongoose.model("Category", schema);

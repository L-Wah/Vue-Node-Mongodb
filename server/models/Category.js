const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  name: { type: String },
  // 父级类型:mongoose.SchemaTypes.ObjectId 是一个id ，ref 关联的模型是 本身 Category
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: "Category" },
})

schema.virtual('children', {
  localField: '_id',
  foreignField: 'parent',
  justOne: false,
  ref: 'Category'
})

schema.virtual('newsList', {
  localField: '_id',
  foreignField: 'categories',
  justOne: false,
  ref: 'Article'
})
module.exports = mongoose.model("Category", schema);

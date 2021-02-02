const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  name: { type: String },
  avatar: { type: String },
  title: { type: String },
  // 分类关联Category分类模型，有多个值所以定义一个数组,界面中下拉选择，不用手动输入
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Category" }],
  scores: {
    difficult: { type: Number },
    skills: { type: Number },
    attack: { type: Number },
    survive: { type: Number },
  },
  skills: [
    {
      icon: { type: String },
      name: { type: String },
      description: { type: String },
      tips: { type: String },
    },
  ],
  // 分类关联Item物品模型
  // 顺风出装
  items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Item" }],
  // 逆风出装
  items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Item" }],
  usageTips: { type: String },
  battleTips: { type: String },
  teamTips: { type: String },
  partners: [
    {
      hero: { type: mongoose.SchemaTypes.ObjectId, ref: "Hero" },
      description: { type: String },
    },
  ],
});
module.exports = mongoose.model("Hero", schema);

const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  name: { type: String },
  avatar: { type: String },
  banner: { type: String },
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
      delay:{type: String},
      cost:{type: String},
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
// 使用mongoosejs连接数据库新建的collection若非以s结尾，会自动加上s，可加上第三个参数，自定义数据库中模型的名字
module.exports = mongoose.model("Hero", schema,"heroes");

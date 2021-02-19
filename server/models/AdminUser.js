const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  username: { type: String },
  password: {
    type: String,
    // 不会被查询显示出来
    select: false,
    // set函数，进行加密 , bcrypt加密，比md5更安全，完全不可逆且每次生成的hash值不相同,散列次数可填10-12次
    set(val) {
      return require("bcrypt").hashSync(val, 10);
    },
  },
});
module.exports = mongoose.model("AdminUser", schema);

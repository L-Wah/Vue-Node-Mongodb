module.exports = {
  // 定义打包build后存放的目录在server文件夹中
  outputDir: __dirname + '/../server/admin',
  // 打包后使用process.env获取当前配置信息
  publicPath: process.env.NODE_ENV === 'production'
    ? '/admin/'
    : '/'
}
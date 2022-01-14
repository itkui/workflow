const { name } = require("./../../package.json");

module.exports = (program) => {
  // 帮助信息
  program.name(name).usage("[command] [options] 插件改变生活");
};

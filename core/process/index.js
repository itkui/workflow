const helpSet = require("./help");
const versionSet = require("./version");

const configBind = (program) => {
  // 设置版本信息
  versionSet(program);
  // 设置帮助信息
  helpSet(program);
};

module.exports = {
  configBind,
};

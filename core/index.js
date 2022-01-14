#!/usr/bin/env node
const { program } = require("commander");
const { childBind } = require("./process");
const { configBind } = require("./config");

// 绑定所有基础参数配置
configBind(program);
// 绑定所有子命令
childBind(program);

const run = () => {
  program.parse(process.argv);
};

module.exports = {
  run,
};

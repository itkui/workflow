#!/usr/bin/env node
const figlet = require("figlet");
const chalk = require("chalk");
const { program } = require("commander");
const { childBind } = require("./process");
const { configBind } = require("./config");

const run = () => {
  // 绑定所有基础参数配置
  configBind(program);
  // 绑定所有子命令
  childBind(program);

  figlet('w o r k f l o w', (err, data) => {
    !err && console.log(chalk.red.bold(data), '\r\n', '');
    // 初始化所有的选项
    program.parse(process.argv);
  });
};

module.exports = {
  run,
};

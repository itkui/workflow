const add = require("./add");
const init = require("./init");
const defaultCommand = require("./default");

const childBind = (process) => {
  add(process);
  init(process);
  defaultCommand(process);
};

module.exports = {
  childBind,
};

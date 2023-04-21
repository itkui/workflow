const updateProgram = require("./update");
const defaultProgram = require("./default");

const childBind = (program) => {
  updateProgram(program);
  defaultProgram(program);
};

module.exports = {
  childBind,
};

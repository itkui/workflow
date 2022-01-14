const { version } = require('./../../package.json');

module.exports = (program) => {
  // 版本信息
  program.version(version, '-v, --version', '当前版本信息');
}
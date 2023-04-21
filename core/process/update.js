const { log } = require('./../../utils')

module.exports = (program) => {
    program
        .command('update')
        .action(function (cmd) {
            log(cmd)
        })

}
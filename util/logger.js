// Global logging utility.

const _findLevel = (level) => {
  return level === 'debug' ? 1
    :    level === 'info'  ? 2
      :  level === 'warn'  ? 3
        : /* errors only */  4
}

const level = _findLevel(process.env.LOG)

const log = (lvl, message) => {
  if (lvl >= level) {
    // eslint-disable-next-line no-console
    console.log(message)
  }
}

exports.log = log

exports.debug = (message) => log(1, message)
exports.info  = (message) => log(2, message)
exports.warn  = (message) => log(3, message)
exports.error = (message) => log(4, message)

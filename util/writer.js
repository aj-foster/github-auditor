let fs = require('fs')
let L = require('./logger.js')

const outputDir = 'output'

exports.setup = function () {
  if (!fs.existsSync(outputDir)) {
    L.debug('Creating output directory, ' + outputDir)
    fs.mkdirSync(outputDir)
  }
}

exports.write = function (data) {
  const outputFile = outputDir + '/' + global.org + '.json'

  L.debug('Writing output file, ' + outputFile)
  fs.writeFileSync(outputFile, JSON.stringify(data))
}

let fs = require('fs')
let L = require('./logger.js')

const outputDir = 'output'
const jsonFile = function () {
  return outputDir + '/' + global.org + '.json'
}

exports.setup = function () {
  if (!fs.existsSync(outputDir)) {
    L.debug('Creating output directory, ' + outputDir)
    fs.mkdirSync(outputDir)
  }
}

exports.writeJSON = function (data) {
  L.debug('Writing output file, ' + jsonFile())
  fs.writeFileSync(jsonFile(), JSON.stringify(data))
}

exports.jsonFile = jsonFile

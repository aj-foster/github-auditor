let fs = require('fs')
let L = require('./logger.js')

const outputDir = 'output'
const jsonFile = function () {
  return outputDir + '/' + global.org + '.json'
}
const reportFile = function () {
  return outputDir + '/' + global.org + '.html'
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

exports.readJSON = function () {
  L.debug('Reading saved output, ' + jsonFile())

  const data = fs.readFileSync(jsonFile(), 'utf8')
  return JSON.parse(data)
}

exports.writeReport = function (report) {
  L.debug('Writing report file, ' + reportFile())
  fs.writeFileSync(reportFile(), report)
}

exports.jsonFile = jsonFile
exports.reportFile = reportFile

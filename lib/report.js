/* Here is an informal reference of the saved JSON structure:

{
  "organization": [organization "login" name],

  "teams": [
    {
      "name": [human-readable team name],
      "slug": [URL-friendly team name],
      "repos": [
        {
          "name": [repository name],
          "permission": ["READ" | "WRITE" | "ADMIN"]
        }
      ],
      "users": [
        {
          "name": [human name],
          "login": [user name]
        }
      ]
    }
  ],

  "repositories": [
    {
      "name": [repository name],
      "private": [true | false],
      "collaborators": [
        {
          "name": [human name],
          "login": [user name],
          "permission": ["READ" | "WRITE" | "ADMIN"]
        }
      ]
    }
  ],

  "users": [
    {
      "name": [human name],
      "login": [user name]
    }
  ]

  "login": [retriever user name]
}

*/


let ejs = require('ejs')
let fs = require('fs')
let L = require('../util/logger.js')
let writer = require('../util/writer.js')

exports.test = async function () {
  // const inputFile = writer.outputFile()

  const template = fs.readFileSync('lib/template.html.ejs', 'utf8')
  const rendered = await ejs.render(template, {
    organization: global.org,
    time: (new Date(Date.now())).toDateString(),
    login: global.login
  })

  L.debug(rendered)
}

exports.render = async function () {
  const data = await writer.readJSON()
  const template = fs.readFileSync('lib/template.html.ejs', 'utf8')
  const rendered = await ejs.render(template, data)

  writer.writeReport(rendered)
}

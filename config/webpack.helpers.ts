const paths = require('./paths')
import dotenv from 'dotenv'

function selectEnv(pathToEnv = '/.env.dev') {
  const fileEnv = dotenv.config({ path: paths.rootDir + pathToEnv }).parsed
  if (fileEnv) {
    return Object.keys(fileEnv).reduce<{ [key: string]: string }>((prev, next) => {
      prev[`process.env.${next}`] = JSON.stringify(fileEnv[next])
      return prev
    }, {})
  }
}

module.exports = {
  selectEnv
}

declare module './webpack.helpers.js' {
  function selectEnv(pathToEnv?: string): { [p: string]: string } | undefined
}

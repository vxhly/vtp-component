const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const uppercamelize = require('uppercamelcase')
const Components = require('./get-components')()
const log = message => console.log(chalk.green(`${message}`))
const config = require('../config')

function buildPackagesEntry () {
  const uninstallComponents = []

  const importList = Components.map(
    name => `import ${uppercamelize(name)} from './${name}'`
  )
  const exportList = Components.map(name => `${uppercamelize(name)}`)
  const intallList = exportList.filter(
    name => !~uninstallComponents.indexOf(uppercamelize(name))
  )
  const content = `import './assets/scss/common.scss'
${config.ElementUI ? `import 'element-ui/lib/theme-chalk/index.css'` : '\n'}
import './utils/filters'

${importList.join('\n')}

const version = require('../package.json').version
const components = [
  ${intallList.join(',\n  ')}
]

const install = Vue => {
  if (install.installed) return
  components.map(component => Vue.component(component.name, component))
}

export {
  install,
  version,
  ${exportList.join(',\n  ')}
}

export default {
  install,
  version
}
`

  fs.writeFileSync(path.join(__dirname, '../packages/index.js'), content)
  log('packages/index.js 文件已更新依赖')
  log('exit')
}

function setDocsConfig () {
  const docsURL = []
  Components.forEach(item => {
    docsURL.push(`'/${item}'`)
  })
  const content = `const config = {
  dest: 'public',
  serviceWorker: true,
  themeConfig: {
    sidebar: [
      ['/CHANGELOG', '更新日志'],
      ['/', '指南'], 
      {
        title: '组件',
        collapsable: false,
        children: [
          ${docsURL.join(',\n          ')}
        ]
      }
    ]
  },
  markdown: {
    lineNumbers: true
  },
  title: '${config.docsTitle}',
  base: '${config.base}'
}

module.exports = config
`

  fs.writeFileSync(path.join(__dirname, '../docs/.vuepress/config.js'), content)
  log('packages/index.js 文件已更新依赖')
  log('exit')
}

buildPackagesEntry()
setDocsConfig()

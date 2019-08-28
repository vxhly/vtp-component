// 创建自定义组件脚本

const chalk = require('chalk')
const path = require('path')
const fs = require('fs-extra')
const uppercamelize = require('uppercamelcase')
const resolve = (...file) => path.resolve(__dirname, ...file)
const log = message => console.log(chalk.green(`${message}`))
const successLog = message => console.log(chalk.blue(`${message}`))
const errorLog = error => console.log(chalk.red(`${error}`))
const {
  vueTemplate,
  entryTemplate,
  scssTemplate,
  mdDocs
} = require('./template')

const generateFile = (path, data) => {
  if (fs.existsSync(path)) {
    errorLog(`${path}文件已存在`)
    return
  }
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, 'utf8', err => {
      if (err) {
        errorLog(err.message)
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}

// 这里生成自定义组件
log('请输入要生成的组件名称, 形如 demo 或者 demo-test')
let componentName = ''
process.stdin.on('data', async chunk => {
  const inputName = String(chunk).trim().toString()
  const upperInputname = uppercamelize(inputName)
  const componentDirectory = resolve('../packages', upperInputname)
  const componentVueName = resolve(componentDirectory, `${upperInputname}.vue`)
  const scssName = resolve(componentDirectory, `${inputName}.scss`)
  const entryComponentName = resolve(componentDirectory, 'index.js')

  const hasComponentDirectory = fs.existsSync(componentDirectory)
  if (upperInputname) {
    // 这里生成组件
    if (hasComponentDirectory) {
      errorLog(`${upperInputname}组件目录已存在，请重新输入`)
      return
    } else {
      log(`生成 component 目录 ${componentDirectory}`)
      await dotExistDirectoryCreate(componentDirectory)
    }
    try {
      if (upperInputname.includes('/')) {
        const inputArr = upperInputname.split('/')
        componentName = inputArr[inputArr.length - 1]
      } else {
        componentName = upperInputname
      }
      log(`生成 vue 文件 ${componentVueName}`)
      await generateFile(componentVueName, vueTemplate(inputName))
      log(`生成 scss 文件 ${scssName}`)
      await generateFile(scssName, scssTemplate(inputName))
      log(`生成 entry 文件 ${entryComponentName}`)
      await generateFile(entryComponentName, entryTemplate(componentName))
      successLog('生成 component 成功')
    } catch (e) {
      errorLog(e.message)
    }
  } else {
    errorLog(`请重新输入组件名称:`)
    return
  }

  // 这里生成自定义组件说明文档
  const docsDirectory = resolve('../docs/component')
  const docsMdName = resolve(docsDirectory, `${upperInputname}.md`)

  try {
    log(`生成 component 文档 ${docsMdName}`)
    await generateFile(docsMdName, mdDocs(`${inputName}`))
    successLog('生成 component 文档成功')
  } catch (e) {
    errorLog(e.message)
  }

  process.stdin.emit('end')
})

process.stdin.on('end', () => {
  log('exit')
  process.exit()
})

function dotExistDirectoryCreate (directory) {
  return new Promise((resolve) => {
    mkdirs(directory, function () {
      resolve(true)
    })
  })
}

// 递归创建目录
function mkdirs (directory, callback) {
  var exists = fs.existsSync(directory)
  if (exists) {
    callback()
  } else {
    mkdirs(path.dirname(directory), function () {
      fs.mkdirSync(directory)
      callback()
    })
  }
}

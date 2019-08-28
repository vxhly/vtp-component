// 删除自定义组件脚本

const chalk = require('chalk')
const path = require('path')
const fs = require('fs-extra')
const uppercamelize = require('uppercamelcase')
const resolve = (...file) => path.resolve(__dirname, ...file)
const log = message => console.log(chalk.green(`${message}`))
const successLog = message => console.log(chalk.blue(`${message}`))
const errorLog = error => console.log(chalk.red(`${error}`))

log('请输入要删除的组件名称, 形如 demo 或者 demo-test')
process.stdin.on('data', async chunk => {
  let inputName = String(chunk).trim().toString()
  inputName = uppercamelize(inputName)
  const componentDirectory = resolve('../packages', inputName)

  const hasComponentDirectory = fs.existsSync(componentDirectory)

  const docsDirectory = resolve('../docs/component')
  const docsMdName = resolve(docsDirectory, `${inputName}.md`)
  if (inputName) {
    if (hasComponentDirectory) {
      log(`删除 component 目录 ${componentDirectory}`)
      await removePromise(componentDirectory)
      successLog(`已删除 ${inputName} 组件目录`)

      log(`删除 component 文档 ${docsMdName}`)
      fs.unlink(docsMdName)
      successLog(`已删除 ${inputName} 组件说明文档`)
    } else {
      errorLog(`${inputName}组件目录不存在`)
      return
    }
  } else {
    errorLog(`请重新输入组件名称:`)
    return
  }

  process.stdin.emit('end')
})

process.stdin.on('end', () => {
  log('exit')
  process.exit()
})

function removePromise (dir) {
  return new Promise(function (resolve, reject) {
    // 先读文件夹
    fs.stat(dir, function (_err, stat) {
      if (stat.isDirectory()) {
        fs.readdir(dir, function (_err, files) {
          files = files.map(file => path.join(dir, file)) // a/b  a/m
          files = files.map(file => removePromise(file)) // 这时候变成了promise
          Promise.all(files).then(function () {
            fs.rmdir(dir, resolve)
          })
        })
      } else {
        fs.unlink(dir, resolve)
      }
    })
  })
}

import './assets/scss/common.scss'
import 'element-ui/lib/theme-chalk/index.css'
import './utils/filters'

const version = require('../package.json').version
const components = [

]

const install = Vue => {
  if (install.installed) return
  components.map(component => Vue.component(component.name, component))
}

export {
  install,
  version

}

export default {
  install,
  version
}

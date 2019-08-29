const uppercamelize = require('uppercamelcase')
const config = require('../config')

module.exports = {
  vueTemplate: compoenntName => {
    return `<template>
  <div class="${config.prefix}-${compoenntName}">
    ${compoenntName}
  </div>
</template>

<script>
export default {
  name: '${config.prefix}-${compoenntName}',

  data () {
    return {}
  },

  props: {},

  methods: {}
}
</script>

<style lang="scss">
  @import './${compoenntName}';
</style>
`
  },
  entryTemplate: compoenntName => {
    return `import ${compoenntName} from './${compoenntName}'

${compoenntName}.install = function (Vue) {
  Vue.component(${compoenntName}.name, ${compoenntName})
}

export default ${compoenntName}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component(${compoenntName}.name, ${compoenntName})
}
`
  },
  scssTemplate: compoenntName => {
    return `.${config.prefix}-${compoenntName} {}`
  },
  mdDocs: compoenntName => {
    const upperCompoenntName = uppercamelize(compoenntName)
    const upperPrefix = uppercamelize(config.prefix)

    return `# ${compoenntName}

::: tip 组件作用说明
${compoenntName}
::: 

## Code Demo

### 基础用法

::: demo 基础用法

\`\`\` vue
<template>
  <${config.prefix}-${compoenntName}></${config.prefix}-${compoenntName}>
</template>
\`\`\` 

:::

## Used

### 按需引入

\`\`\` javascript
import Vue from 'vue'
import {
  ${upperPrefix}${upperCompoenntName}
} from '${config.name}'
import '${config.name}/packages/${upperCompoenntName}/${compoenntName}.css'

Vue.use(${upperPrefix}${upperCompoenntName})
\`\`\` 

### 局部引入

\`\`\`  javascript
import {
  ${upperPrefix}${upperCompoenntName}
} from '${config.name}'
import '${config.name}/packages/${upperCompoenntName}/${compoenntName}.css'

export default {
  components: {
    ${upperPrefix}${upperCompoenntName}
  }
}
\`\`\` 

## API

### Props

| 参数  | 说明  | 类型  | 可选值 | 默认值 | 版本 |
|-----|-----|-----|-----|-----|-----|
| -   | -   | -   | -   | -   | -   |

### Events

| 事件名  | 说明  | 回调参数  |
|-----|-----|-----|
| -   | -   | -   |

`
  }
}

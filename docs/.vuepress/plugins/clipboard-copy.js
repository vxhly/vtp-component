// 插件修改于 https://github.com/dovy/vuepress-plugin-clipboard-copy
const path = require('path')

module.exports = (options, context) => ({
  define: {
    COPY_SELECTOR: options.copy_selector || 'div[class*="language-"] pre'
  },
  clientRootMixin: path.resolve(__dirname, 'clientRootMixin.js')
})

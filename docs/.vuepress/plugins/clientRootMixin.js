/* global SELECTOR */

import './style.css'
import Vue from 'vue'
import {
  Message
} from 'element-ui'
Vue.prototype.$message = Message

export default {
  data() {
    return {
      zoom: null
    }
  },

  mounted() {
    this.updateCopy()
  },

  updated() {
    this.updateCopy()
  },

  methods: {
    updateCopy() {
      setTimeout(() => {
        document.querySelectorAll(COPY_SELECTOR).forEach(this.generateCopyButton)
      }, 1000)
    },
    generateCopyButton: function (parent) {
      if (parent.classList.contains('codecopy-enabled')) return
      const copyElement = document.createElement('span')
      copyElement.className = 'code-copy el-icon-copy-document'
      copyElement.title = 'Click to Copy to Clipboard'
      copyElement.addEventListener('click', () => {
        this.copyToClipboard(parent.innerText)
      })
      parent.appendChild(copyElement)
      parent.classList.add('codecopy-enabled')
    },
    copyToClipboard: function (str) {
      const el = document.createElement('textarea')
      el.value = str
      el.setAttribute('readonly', '')
      el.style.position = 'absolute'
      el.style.left = '-9999px'
      document.body.appendChild(el)
      const selected =
        document.getSelection().rangeCount > 0 ?
        document.getSelection().getRangeAt(0) :
        false
      el.select()
      document.execCommand('copy')
      this.$message.success('复制成功, 快去粘贴运行吧 !!!')
      document.body.removeChild(el)
      if (selected) {
        document.getSelection().removeAllRanges()
        document.getSelection().addRange(selected)
      }
    }
  }
}

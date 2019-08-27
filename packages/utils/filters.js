/**
 * vue 过滤器
 */

import Vue from 'vue'

/**
 * @filter digitUppercase 人民币金额转成汉字大写
 * @param {Number} value 金额数字
 * 使用方法 {{ 1111 | digitUppercase }}
 */
Vue.filter('digitUppercase', (value) => {
  if (Number(value)) {
    let fraction = ['角', '分']
    let digit = [
      '零', '壹', '贰', '叁', '肆',
      '伍', '陆', '柒', '捌', '玖'
    ]
    let unit = [
      ['元', '万', '亿'],
      ['', '拾', '佰', '仟']
    ]

    let head = value < 0 ? '欠' : ''
    value = Math.abs(value)
    let s = ''
    for (let i = 0; i < fraction.length; i++) {
      s += (digit[Math.floor(value * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
    }
    s = s || '整'
    value = Math.floor(value)
    for (let i = 0; i < unit[0].length && value > 0; i++) {
      let p = ''
      for (let j = 0; j < unit[1].length && value > 0; j++) {
        p = digit[value % 10] + unit[1][j] + p
        value = Math.floor(value / 10)
      }
      s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
    }
    return head + s.replace(/(零.)*零元/, '元')
      .replace(/(零.)+/g, '零')
      .replace(/^整$/, '零元整')
  } else {
    return '零元整'
  }
})

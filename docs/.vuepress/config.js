const config = {
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
          
        ]
      }
    ]
  },
  markdown: {
    lineNumbers: true
  },
  title: 'vtp-component',
  base: '/'
}

module.exports = config

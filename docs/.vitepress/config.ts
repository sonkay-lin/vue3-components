module.exports = {
  title: 'l-ui',
  description: 'lsk UI',
  themeConfig: {
    lastUpdate: '最后更新时间',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: '编辑此网站',
    repo: '',
    footer: {
      message: 'Released under the NIT License.',
      copyright: 'Copyright @ 2022-present lsk'
    },
    nav: [
      { text: '组件', link: '/components/button', activeMath: '/components/' },
      { text: '指南', link: '/guide/installation', activeMath: '/guide/' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [{ text: '安装', link: '/guide/installation' }]
        }
      ],
      '/components/': [
        {
          text: '组件',
          items: [
            { text: 'button 按钮', link: '/components/button.md' },
            { text: 'checkbox 选择框', link: '/components/checkbox.md' },
            { text: 'form 表单', link: '/components/form.md' },
            { text: 'icon 图标', link: '/components/icon.md' },
            { text: 'input 输入框', link: '/components/input.md' },
            { text: 'tree 树', link: '/components/tree.md' },
            {
              text: 'virtual-list 虚拟列表',
              link: '/components/virtual-list.md'
            }
          ]
        }
      ]
    }
  }
}

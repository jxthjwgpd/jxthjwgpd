const gettingStarted = [
  {
    name: 'Pick Quasar Flavour',
    path: 'pick-quasar-flavour'
  },
  {
    name: 'Quasar Flavours',
    opened: true,
    children: [
      {
        name: 'Quasar CLI',
        path: 'quasar-cli'
      },
      {
        name: 'UMD / Standalone',
        path: 'umd'
      },
      {
        name: 'Vue CLI Plugin',
        path: 'vue-cli-plugin'
      }
    ]
  }
]

module.exports = [
  {
    name: '总览',
    icon: 'storage',
    path: 'ecs/dashboard'
  },
  {
    name: '弹性云服务器',
    icon: 'healing',
    path: 'introduction-to-quasar'
  },
  {
    name: '专属主机',
    icon: 'widgets',
    path: 'introduction-to-quasar'
  },
  {
    name: '分布式存储',
    icon: 'style',
    path: 'start',
    children: gettingStarted
  }
]

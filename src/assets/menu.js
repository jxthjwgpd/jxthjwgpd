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
        path: 'index'
      },
      {
        name: 'UMD / Standalone',
        path: 'umd'
      },
      {
        name: 'Vue CLI Plugin',
        path: 'vue-cli-plugin'
      },
      {
        name: 'Quasar CLI2',
        badge: '更新',
        path: 'quasar-cli2'
      },
      {
        name: 'UMD / Standalone2',
        path: 'umd2'
      },
      {
        name: 'Vue CLI Plugin2',
        path: 'vue-cli-plugin2'
      },
      {
        name: 'Quasar CLI3',
        path: 'quasar-cli3'
      },
      {
        name: 'UMD / Standalone3',
        path: 'umd3'
      },
      {
        name: 'Vue CLI Plugin3',
        path: 'vue-cli-plugin3'
      },
      {
        name: 'Quasar CLI4',
        path: 'quasar-cli4'
      },
      {
        name: 'UMD / Standalone4',
        path: 'umd4'
      },
      {
        name: 'Vue CLI Plugin4',
        path: 'vue-cli-plugin4'
      }
    ]
  }
]

module.exports = [
  {
    name: '总览',
    icon: 'view_quilt',
    path: 'ecs/dashboard'
  },
  {
    name: '弹性云服务器',
    icon: 'healing',
    path: 'events'
  },
  {
    name: '专属主机',
    icon: 'widgets',
    badge: '更新',
    path: 'lists'
  },
  {
    name: '分布式存储',
    icon: 'style',
    path: 'start',
    children: gettingStarted
  }
]

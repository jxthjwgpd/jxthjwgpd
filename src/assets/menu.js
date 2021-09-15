const gettingStarted = [
  {
    name: '账号管理',
    path: 'test3'
  },
  {
    name: '权限管理',
    path: 'test2'
  },
  {
    name: '费用中心',
    children: [
      {
        name: '账户总览',
        path: 'index'
      },
      {
        name: '支收明细',
        path: 'test1'
      },
      {
        name: '订单管理',
        path: 'vue-cli-plugin'
      },
      {
        name: '账单',
        badge: '更新',
        path: 'quasar-cli2'
      },
      {
        name: '发票',
        path: 'vue-cli-plugin2'
      },
      {
        name: '优惠券',
        path: 'umd2'
      }
    ]
  }
]

module.exports = [
  {
    name: '总览',
    icon: 'broken_image',
    path: 'dashboard'
  },
  {
    name: '弹性云服务器',
    icon: 'healing',
    path: 'events'
  },
  {
    name: '专属主机',
    icon: 'subtitles',
    badge: '更新',
    path: 'lists'
  },
  {
    name: '权限管理',
    icon: 'style',
    path: 'system',
    opened: true,
    children: gettingStarted
  }
]

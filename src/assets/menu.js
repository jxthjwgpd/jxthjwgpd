const gettingStarted = [
  {
    name: '概览',
    path: 'demo-form'
  },
  {
    name: '人员管理',
    opened: true,
    children: [
      {
        name: '用户组',
        path: 'index'
      },
      {
        name: '用户',
        path: 'test1'
      },
      {
        name: '设置',
        path: 'vue-cli-plugin'
      }
    ]
  },
  {
    name: 'SSO管理',
    path: 'demo-form1'
  },
  {
    name: '权限管理',
    children: [
      {
        name: '授权',
        path: 'index11'
      },
      {
        name: '授权策略管理',
        path: 'test1222'
      }
    ]
  },
  {
    name: '角色管理',
    path: 'demo-form2'
  },
  {
    name: '应用管理',
    path: 'demo-form3'
  }
]

module.exports = [
  {
    name: '总览',
    icon: 'broken_image',
    path: 'dashboard'
  },
  {
    name: '数据表格',
    icon: 'healing',
    path: 'events'
  },
  {
    name: '组件展示',
    icon: 'subtitles',
    badge: '更新',
    path: 'lists'
  },
  {
    name: '模块扩展',
    icon: 'style',
    path: 'system',
    opened: true,
    children: gettingStarted
  }
]

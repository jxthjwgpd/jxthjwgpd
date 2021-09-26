const gettingStarted = [
  {
    name: '概览',
    path: 'overview'
  },
  {
    name: '用户管理',
    opened: true,
    children: [
      {
        name: '用户',
        path: 'users'
      },
      {
        name: '用户组',
        path: 'groups'
      },
      {
        name: '设置',
        path: 'settings'
      }
    ]
  },
  {
    name: '权限管理',
    opened: true,
    children: [
      {
        name: '授权',
        path: 'permissions'
      },
      {
        name: '策略管理',
        path: 'policies'
      }
    ]
  },
  {
    name: '角色管理',
    path: 'roles'
  },
  {
    name: '应用管理',
    path: 'applications'
  },
  {
    name: '登录日志',
    path: 'login-logs'
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
    name: '系统管理',
    icon: 'style',
    path: 'system',
    opened: true,
    children: gettingStarted
  }
]

const gettingStarted = [
  {
    name: '仪表盘',
    path: 'dashboard',
    children: [
      {
        name: '分析页',
        path: '1'
      },
      {
        name: '监控页',
        path: '2'
      },
      {
        name: '工作台',
        path: '3'
      }
    ]
  },
  {
    name: '表单页',
    path: 'form',
    children: [
      {
        name: '基础表单',
        path: 'basic-form'
      },
      {
        name: '分步表单',
        path: '5'
      },
      {
        name: '高级表单',
        path: '6'
      }
    ]
  },
  {
    name: '列表页',
    path: 'list',
    children: [
      {
        name: '搜索列表',
        path: '7'
      },
      {
        name: '查询表格',
        path: 'table-list'
      },
      {
        name: '标准列表',
        path: 'basic-list'
      },
      {
        name: '卡片列表',
        path: '10'
      }
    ]
  },
  {
    name: '详情页',
    path: 'profile',
    children: [
      {
        name: '基础详情',
        path: '11'
      },
      {
        name: '高级详情',
        path: '12'
      }
    ]
  },
  {
    name: '结果页',
    path: 'result',
    children: [
      {
        name: '成功页',
        path: '13'
      },
      {
        name: '失败页',
        path: '14'
      }
    ]
  },
  {
    name: '异常页',
    path: 'exception',
    children: [
      {
        name: '403',
        path: '15'
      },
      {
        name: '404',
        path: '16'
      },
      {
        name: '500',
        path: '17'
      }
    ]
  },
  {
    name: '个人页',
    path: 'account',
    children: [
      {
        name: '个人中心',
        path: '18'
      },
      {
        name: '个人设置',
        path: '19'
      }
    ]
  }
  // {
  //   name: '用户管理',
  //   opened: true,
  //   children: [
  //     {
  //       name: '用户',
  //       path: 'users'
  //     }
  // {
  //   name: '用户组',
  //   path: 'groups'
  // },
  // {
  //   name: '设置',
  //   path: 'settings'
  // }
  // ]
  // }
  // {
  //   name: '权限管理',
  //   opened: true,
  //   children: [
  //     {
  //       name: '授权',
  //       path: 'permissions'
  //     },
  //     {
  //       name: '策略管理',
  //       path: 'policies'
  //     }
  //   ]
  // },
  // {
  //   name: '角色管理',
  //   path: 'roles'
  // },
  // {
  //   name: '应用管理',
  //   path: 'applications'
  // },
  // {
  //   name: '登录日志',
  //   path: 'login-logs'
  // }
]

module.exports = [
  {
    name: '总览',
    icon: 'broken_image',
    path: 'dashboard'
  },
  // {
  //   name: '数据表格',
  //   icon: 'healing',
  //   path: 'events'
  // },
  // {
  //   name: '组件展示',
  //   icon: 'subtitles',
  //   badge: '更新',
  //   path: 'lists'
  // },
  {
    name: '系统组件',
    icon: 'style',
    path: 'system',
    opened: true,
    children: gettingStarted
  }
]

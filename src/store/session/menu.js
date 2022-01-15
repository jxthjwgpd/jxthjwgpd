const gettingComponent = [
  {
    id: 'dashboard',
    name: '仪表盘',
    icon: 'broken_image',
    path: '/component/dashboard',
    opened: true,
    children: [
      {
        id: 'analysis',
        name: '分析页',
        icon: 'timelapse',
        path: '/component/dashboard/analysis'
      },
      {
        id: 'monitor',
        name: '监控页',
        icon: 'grain',
        badge: 'New',
        path: '/component/dashboard/monitor'
      },
      {
        id: 'workplace',
        name: '工作台',
        icon: 'work_outline',
        path: '/component/dashboard/workplace'
      }
    ]
  },
  {
    id: 'admin',
    name: '管理员',
    icon: 'group',
    badge: 'New',
    path: '/component/form/basic-form'
  },
  {
    id: 'form',
    name: '表单页',
    icon: 'widgets',
    path: '/component/form',
    children: [
      {
        id: 'basic-form',
        name: '基础表单',
        path: '/component/form/basic-form'
      },
      {
        id: 'step-form',
        name: '分步表单',
        path: '/component/form/step-form'
      },
      {
        id: 'advanced-form',
        name: '高级表单',
        path: '/component/form/advanced-form'
      }
    ]
  },
  {
    id: 'list',
    name: '列表页',
    icon: 'view_list',
    path: '/component/list',
    children: [
      {
        id: 'search-list',
        name: '搜索列表',
        path: '/component/7'
      },
      {
        id: 'table-list',
        name: '查询表格',
        path: '/component/table-list'
      },
      {
        id: 'basic-list',
        name: '标准列表',
        path: '/component/basic-list'
      },
      {
        id: 'card-list',
        name: '卡片列表',
        path: '/component/10'
      }
    ]
  },
  {
    id: 'profile',
    name: '详情页',
    icon: 'assignment',
    path: '/component/profile',
    children: [
      {
        id: 'profile-basic',
        name: '基础详情',
        path: '/component/11'
      },
      {
        id: 'profile-advanced',
        name: '高级详情',
        path: '/component/12'
      }
    ]
  },
  {
    id: 'result',
    name: '结果页',
    icon: 'library_books',
    path: '/component/result',
    children: [
      {
        id: 'result-success',
        name: '成功页',
        path: '/component/13'
      },
      {
        id: 'result-fail',
        name: '失败页',
        path: '/component/14'
      }
    ]
  },
  {
    id: 'exception',
    name: '异常页',
    icon: 'remove_circle',
    path: '/component/exception',
    children: [
      {
        id: 'exception-403',
        name: '403',
        path: '/component/15'
      },
      {
        id: 'exception-404',
        name: '404',
        path: '/component/16'
      },
      {
        id: 'exception-500',
        name: '500',
        path: '/component/17'
      }
    ]
  },
  {
    id: 'account',
    name: '个人页',
    icon: 'supervised_user_circle',
    path: '/component/account',
    children: [
      {
        id: 'account-center',
        name: '个人中心',
        path: '/component/18'
      },
      {
        id: 'account-seting',
        name: '个人设置',
        path: '/component/19'
      }
    ]
  }
]

// const gettingSystem = [
//   {
//     name: '管理员',
//     icon: 'group',
//     badge: 'New',
//     path: 'admin'
//   }
// ]

module.exports = [
  {
    id: 'dashboard',
    name: '总览',
    icon: 'eco',
    path: '/dashboard'
  },
  {
    id: 'component',
    name: '组件',
    icon: 'style',
    path: '/component',
    opened: true,
    children: gettingComponent
  }
  // ,
  // {
  //   name: '系统设置',
  //   icon: 'broken_image',
  //   path: 'system',
  //   opened: true,
  //   children: gettingSystem
  // }
]

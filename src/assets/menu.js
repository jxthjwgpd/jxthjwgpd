const gettingComponent = [
  {
    name: '仪表盘',
    icon: 'broken_image',
    path: 'dashboard',
    opened: true,
    children: [
      {
        name: '分析页',
        icon: 'broken_image',
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
    icon: 'broken_image',
    path: 'form',
    children: [
      {
        name: '基础表单',
        path: 'basic-form'
      },
      {
        name: '分步表单',
        path: 'step-form'
      },
      {
        name: '高级表单',
        path: '6'
      }
    ]
  },
  {
    name: '列表页',
    icon: 'broken_image',
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
    icon: 'broken_image',
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
    icon: 'broken_image',
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
    icon: 'broken_image',
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
    icon: 'broken_image',
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
]

const gettingSystem = [
  {
    name: '管理员',
    icon: 'broken_image',
    path: 'admin'
  }
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
    name: '组件',
    icon: 'style',
    path: 'component',
    opened: true,
    children: gettingComponent
  },
  {
    name: '系统设置',
    icon: 'broken_image',
    path: 'system',
    opened: true,
    children: gettingSystem
  }
]

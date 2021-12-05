
const routes = [
  {
    path: '/user',
    component: () => import('layouts/UserLayout.vue'),
    children: [
      { path: '', redirect: { name: 'user-login' } },
      { path: 'login', name: 'user-login', component: () => import('pages/Login.vue') },
      { path: 'signup', name: 'user-signup', component: () => import('pages/Signup.vue') }
    ]
  },
  {
    path: '/503',
    component: () => import('pages/Error503.vue')
  },
  {
    path: '/404',
    component: () => import('pages/Error404.vue')
  },
  {
    path: '/',
    component: () => import('layouts/MainLayoutNew.vue'),
    // meta: { auth: true },
    children: [
      { path: '', redirect: { path: 'dashboard' } },
      { path: 'dashboard', meta: { auth: true }, component: () => import('pages/Dashboard.vue') },
      {
        path: 'component',
        component: () => import('layouts/BlankLayout.vue'),
        children: [
          { path: '', redirect: { path: 'overview' } },
          { path: 'overview', meta: { sidebar: true, auth: true }, component: () => import('pages/system/Overview.vue') },
          {
            path: 'form',
            component: () => import('layouts/BlankLayout.vue'),
            children: [
              { path: '', redirect: { path: 'basic-form' } },
              { path: 'basic-form', meta: { sidebar: true, auth: true }, component: () => import('pages/form/BasicForm.vue') },
              { path: 'step-form', meta: { sidebar: true, auth: true }, component: () => import('pages/form/StepForm.vue') }
            ]
          },
          {
            path: 'list',
            component: () => import('layouts/BlankLayout.vue'),
            children: [
              { path: '', redirect: { path: 'basic-list' } },
              { path: 'table-list', meta: { sidebar: true, auth: true }, component: () => import('pages/list/TableList.vue') },
              { path: 'basic-list', meta: { sidebar: true, auth: true }, component: () => import('pages/list/BasicList.vue') }
            ]
          }
        ]
      },
      {
        path: 'system',
        component: () => import('layouts/BlankLayout.vue'),
        children: [
          { path: '', redirect: { path: 'admin/users' } },
          { path: 'admin', redirect: { path: 'admin/users' } },
          { path: 'admin/users', meta: { sidebar: true, auth: true }, component: () => import('pages/system/UserList.vue') },
          { path: 'admin/users/:username', meta: { sidebar: true, auth: true }, component: () => import('pages/system/UserDetail.vue') }
        ]
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    redirect: { path: '/404' }
  })
}

export default routes

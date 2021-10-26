
const routes = [
  {
    path: '/user',
    component: () => import('layouts/UserLayout.vue'),
    children: [
      { path: '', redirect: { name: 'user-login' } },
      { path: 'login', name: 'user-login', component: () => import('pages/Login.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayoutNew.vue'),
    // meta: { auth: true },
    children: [
      { path: '', redirect: { path: 'dashboard' } },
      { path: 'dashboard', meta: { auth: true }, component: () => import('pages/Dashboard.vue') },
      { path: 'events', component: () => import('pages/Events.vue') },
      { path: 'lists', component: () => import('pages/Lists.vue') },
      {
        path: 'system',
        component: () => import('layouts/BlankLayout.vue'),
        children: [
          { path: '', redirect: { path: 'overview' } },
          { path: 'overview', meta: { sidebar: true, auth: true }, component: () => import('pages/system/Overview.vue') },
          { path: 'groups', meta: { sidebar: true, auth: true }, component: () => import('pages/system/GroupList.vue') },
          { path: 'users', meta: { sidebar: true, auth: true }, component: () => import('pages/system/UserList.vue') },
          { path: 'users/create', meta: { sidebar: true, auth: true }, component: () => import('pages/system/UserCreate.vue') },
          { path: 'users/:userId/:loginName', meta: { sidebar: true, auth: true }, component: () => import('pages/system/UserDetail.vue') },
          { path: 'settings', meta: { sidebar: true }, component: () => import('pages/system/Setting.vue') },
          { path: 'roles', meta: { sidebar: true, auth: true }, component: () => import('pages/system/RoleList.vue') },
          { path: 'policies', meta: { sidebar: true, auth: true }, component: () => import('pages/system/PolicyList.vue') },
          { path: 'policies/create', meta: { sidebar: true, auth: true }, component: () => import('pages/system/PolicyCreate.vue') }
        ]
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes

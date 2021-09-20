
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
    meta: { auth: true },
    children: [
      { path: '', redirect: { path: 'dashboard' } },
      { path: 'dashboard', component: () => import('pages/ecs/Dashboard.vue') },
      { path: 'events', component: () => import('pages/Events.vue') },
      { path: 'lists', component: () => import('pages/Lists.vue') },
      {
        path: 'system',
        component: () => import('layouts/BlankLayout.vue'),
        children: [
          { path: '', redirect: { path: 'demo-form' } },
          { path: 'demo-form', meta: { sidebar: true }, component: () => import('pages/Form.vue') },
          { path: 'test2', meta: { sidebar: true }, component: () => import('pages/Index.vue') }
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

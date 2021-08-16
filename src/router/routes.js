
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
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true },
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'ecs/dashboard', component: () => import('pages/ecs/Dashboard.vue') },
      { path: 'events', component: () => import('pages/Events.vue') }
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

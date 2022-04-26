
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
          { path: 'overview', meta: { sidebar: true, auth: true }, component: () => import('pages/system/Overview2.vue') },
          { path: 'dashboard/analysis', meta: { sidebar: true, auth: true }, component: () => import('pages/ComeSoon.vue') },
          { path: 'dashboard/monitor', meta: { sidebar: true, auth: true }, component: () => import('pages/ComeSoon.vue') },
          { path: 'dashboard/workplace', meta: { sidebar: true, auth: true }, component: () => import('pages/ComeSoon.vue') },
          {
            path: 'form',
            component: () => import('layouts/BlankLayout.vue'),
            children: [
              { path: '', redirect: { path: 'basic-form' } },
              { path: 'basic-form', meta: { sidebar: true, auth: true }, component: () => import('pages/form/BasicForm.vue') },
              { path: 'step-form', meta: { sidebar: true, auth: true }, component: () => import('pages/form/StepForm.vue') },
              { path: 'advanced-form', meta: { sidebar: true, auth: true }, component: () => import('pages/ComeSoon.vue') },
              { path: 'sku', meta: { sidebar: true, auth: false }, component: () => import('pages/form/SKU.vue') },
              { path: 'upload', meta: { sidebar: true, auth: false }, component: () => import('pages/form/Upload.vue') }
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
          { path: '', redirect: { path: 'overview' } },
          { path: 'overview', meta: { sidebar: true, auth: true }, component: () => import('pages/system/Overview.vue') },
          { path: 'users', meta: { sidebar: true, auth: true }, component: () => import('pages/system/UserList.vue') },
          { path: 'users/form', meta: { sidebar: true, auth: true }, component: () => import('pages/system/UserForm.vue') },
          { path: 'users/edit/:id', meta: { sidebar: true, auth: true }, component: () => import('pages/system/UserEdit.vue') },
          { path: 'roles', meta: { sidebar: true, auth: true }, component: () => import('pages/system/RoleList.vue') },
          { path: 'roles/form', meta: { sidebar: true, auth: true }, component: () => import('pages/system/RoleForm.vue') },
          { path: 'roles/form/:id', meta: { sidebar: true, auth: true }, component: () => import('pages/system/RoleForm.vue') },
          { path: 'policies', meta: { sidebar: true, auth: true }, component: () => import('pages/system/PolicyList.vue') },
          { path: 'policies/form', meta: { sidebar: true, auth: true }, component: () => import('pages/system/PolicyForm.vue') },
          { path: 'policies/form/:id', meta: { sidebar: true, auth: true }, component: () => import('pages/system/PolicyForm.vue') },
          { path: 'logs', meta: { sidebar: true, auth: true }, component: () => import('pages/system/LogList.vue') },
          { path: 'metrics', meta: { sidebar: true, auth: true }, component: () => import('pages/system/Metrics.vue') },
          { path: 'menus', meta: { sidebar: true, auth: true }, component: () => import('pages/system/MenuIndex.vue') }
        ]
      },
      {
        path: 'goods',
        component: () => import('layouts/BlankLayout.vue'),
        children: [
          { path: '', redirect: { path: 'brand' } },
          { path: 'brand', meta: { sidebar: true, auth: true }, component: () => import('pages/shop/goods/BrandList.vue') },
          { path: 'brand/form', meta: { sidebar: true, auth: true }, component: () => import('pages/shop/goods/BrandForm.vue') },
          { path: 'brand/form/:id', meta: { sidebar: true, auth: true }, component: () => import('pages/shop/goods/BrandForm.vue') },
          { path: 'category', meta: { sidebar: true, auth: true }, component: () => import('pages/shop/goods/CategoryIndex.vue') },
          { path: 'attribute', meta: { sidebar: true, auth: true }, component: () => import('pages/shop/goods/AttributeList.vue') },
          { path: 'attribute/form', meta: { sidebar: true, auth: true }, component: () => import('pages/shop/goods/AttributeForm.vue') },
          { path: 'attribute/form/:id', meta: { sidebar: true, auth: true }, component: () => import('pages/shop/goods/AttributeForm.vue') },
          { path: 'form', meta: { sidebar: true, auth: true }, component: () => import('pages/shop/goods/GoodsForm.vue') },
          { path: 'form/:id', meta: { sidebar: true, auth: true }, component: () => import('pages/shop/goods/GoodsForm.vue') },
          { path: 'list', meta: { sidebar: true, auth: true }, component: () => import('pages/shop/goods/GoodsList.vue') },
          { path: 'list/:type', meta: { sidebar: true, auth: true }, component: () => import('pages/ComeSoon.vue') },
          { path: 'album', meta: { sidebar: true, auth: true }, component: () => import('pages/shop/goods/AlbumList.vue') }
        ]
      },
      {
        path: 'order',
        component: () => import('layouts/BlankLayout.vue'),
        children: [
          { path: '', meta: { sidebar: true, auth: true }, component: () => import('pages/Error404.vue') }
        ]
      },
      {
        path: 'account',
        component: () => import('layouts/BlankLayout.vue'),
        children: [
          { path: '', meta: { sidebar: true, auth: true }, component: () => import('pages/Error404.vue') }
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

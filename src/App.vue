<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
function metac (title, description) {
  return {
    title: {
      name: 'title',
      content: title
    },
    ogTitle: {
      name: 'og:title',
      content: title
    },
    twitterTitle: {
      name: 'twitter:title',
      content: title
    },
    description: {
      name: 'description',
      content: description
    },
    ogDesc: {
      name: 'og:description',
      content: description
    },
    twitterDesc: {
      name: 'twitter:description',
      content: description
    }
  }
}
export default {
  name: 'App',
  meta: {
    title: 'Quasar Admin Element Pro',
    titleTemplate: title => `${title} | Quasar Framework`,
    meta: metac(
      '2020 武汉加油，中国加油，权限系统，Tangdao，Springboot，VueJs，QuasarFramework',
      'Tangdao 是基于角色的权限管理系统（RBAC），采用Springboot开发。系统简单易懂，前端使用Vue、Quasarframework开发，页面简洁美观。后端核心框架使用Springboot、Mybatis-plus、SpringSecurity为主要，扩展基于框架的权限校验、参数校验、统一异常、统一响应的通用功能。'
    )
  }
}
</script>

<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import getMeta from 'assets/get-meta.js'
export default {
  name: 'App',
  meta: {
    title: 'Quasar Admin Element Pro',
    titleTemplate: title => `${title} | Quasar Framework`,
    meta: getMeta(
      '2020 武汉加油，中国加油，权限系统，Tangdao，Springboot，VueJs，QuasarFramework',
      'Tangdao 是一个基于角色的授权（RBAC - Role-Based Authorization）系统，用于提供和配置（集中授权）认证策略在服务运行时的访问权限。'
    )
  }
}
</script>

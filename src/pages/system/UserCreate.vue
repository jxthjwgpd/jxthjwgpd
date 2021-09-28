<template>
  <q-page class="q-pa-lg user-create">
    <div class="row items-center justify-between q-mb-md">
      <div>
        <q-breadcrumbs align="left">
          <q-breadcrumbs-el
            label="系统管理"
            to="/system"
          />
          <q-breadcrumbs-el
            label="用户"
            to="/system/users"
          />
          <q-breadcrumbs-el label="新建用户" />
        </q-breadcrumbs>
        <div
          class="q-mt-xs row items-center"
          v-if="$q.screen.gt.sm"
        >
          <router-link to="/system/users">
            <q-icon
              name="arrow_back"
              size="sm"
              class="text-bold text-dark"
            />
          </router-link>
          <div class="text-h6">新建用户</div>
        </div>
      </div>
    </div>
    <div class="q-mb-lg my-card">
      <q-card
        flat
        class="q-pb-md"
      >
        <q-card-section class="q-gutter-y-md q-mt-none">
          <q-item-label class="q-mt-none">用户账号信息</q-item-label>
          <div class="row q-gutter-x-md">
            <div class="username">
              <q-input
                outlined
                v-model="form.loginName"
                label="登录账号"
                :dense="true"
              />
            </div>
            <div class="nickname">
              <q-input
                outlined
                v-model="form.loginName"
                label="昵称"
                :dense="true"
              />
            </div>
          </div>
          <q-item-label>访问平台</q-item-label>
          <div class="column">
            <q-checkbox
              v-model="form.teal"
              label="控制台账号"
            />
            <q-checkbox
              v-model="form.teal"
              label="接口访问"
            />
          </div>
          <q-item-label>控制台账号密码</q-item-label>
        </q-card-section>
        <q-card-actions class="q-pl-md">
          <q-btn
            label="保存"
            color="primary"
            class="submit"
          />
          <q-btn
            label="返回"
            to="/system/users"
          />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'UserCreate',
  data () {
    return {
      form: {
        loginName: null,
        teal: true
      }
    }
  }
}
</script>
<style lang="sass" scoped>
.user-create
  & .username
      width: 300px;
  & .nickname
      width: 200px;
  & .submit
      width: 88px;
</style>

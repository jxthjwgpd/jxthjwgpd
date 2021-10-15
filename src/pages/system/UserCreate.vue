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
        <q-form @submit="onSubmit">
          <q-card-section class="q-gutter-y-md q-mt-none">
            <q-item-label class="q-mt-none">用户账号信息</q-item-label>
            <div class="row q-gutter-x-md">
              <div class="wd-300">
                <q-input
                  stack-label
                  v-model="form.loginName"
                  label="登录账号"
                  :dense="true"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || '请输入登录账号']"
                />
              </div>
              <div class="wd-200">
                <q-input
                  stack-label
                  v-model="form.nickname"
                  label="昵称"
                  :dense="true"
                />
              </div>
            </div>
            <q-item-label>访问平台</q-item-label>
            <div class="column">
              <q-checkbox
                v-model="form.webPass"
                label="控制台账号"
              />
              <q-checkbox
                v-model="form.apiPass"
                label="接口访问"
              />
            </div>
            <q-item-label>控制台账号密码</q-item-label>
            <div class="row q-gutter-x-md">
              <div class="wd-200">
                <q-input
                  stack-label
                  v-model="form.password"
                  label="账号密码"
                  :dense="true"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || '请输入账号密码']"
                />
              </div>
            </div>
          </q-card-section>
          <q-card-actions class="q-pl-md">
            <q-btn
              label="保存"
              color="primary"
              type="submit"
              class="wd-80"
            />
            <q-btn
              label="返回"
              class="wd-60"
              to="/system/users"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'UserCreate',
  data () {
    return {
      loading: false,
      form: {
        loginName: null,
        password: null,
        nickname: null,
        webPass: true,
        apiPass: false
      }
    }
  },
  methods: {
    onSubmit () {
      this.loading = true
      this.$store.dispatch('system/saveUser', this.form).then(data => {
        this.loading = false
      }).catch(e => {
        this.loading = false
      })
    }
  }
}
</script>

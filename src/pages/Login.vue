<template>
  <q-page class="row items-center justify-center">
    <q-card
      class="login-wrapper"
      flat
      bordered
    >
      <q-card-section horizontal>
        <q-img
          class="col-5"
          src="statics/th.jpg"
          v-if="$q.screen.gt.xs"
        />

        <q-card-section :class="`${$q.screen.gt.xs?'col-7':'col'} q-mt-xs q-pa-xl`">
          <div class="text-overline text-primary">资产管理系统</div>
          <div class="text-h5 q-mt-sm q-mb-xs">欢迎回来，请登录后继续</div>
          <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="login-form"
          >
            <q-input
              stack-label
              v-model.trim="form.loginName"
              label="用户账号"
              lazy-rules
              :rules="[ val => val && val.length > 0 || '请输入用户账号']"
            />
            <q-input
              stack-label
              type="password"
              v-model.trim="form.password"
              label="密码"
              lazy-rules
              :rules="[ val => val && val.length > 0 || '请输入密码']"
            />
            <div class="q-mt-md">
              <q-btn
                label="登录"
                type="submit"
                color="primary"
                class="wd-80"
              />
              <q-btn
                label="重置"
                type="reset"
                color="primary"
                flat
                class="q-ml-sm"
              />
            </div>
          </q-form>

        </q-card-section>
      </q-card-section>
      <q-separator />

      <q-card-actions v-if="$q.screen.gt.sm">
        <q-btn flat>
          5:30PM
        </q-btn>
        <q-btn flat>
          7:00PM
        </q-btn>
        <q-btn
          flat
          color="primary"
        >
          Reserve
        </q-btn>
        <q-space />
        <q-btn
          flat
          round
          icon="settings_system_daydream"
        />
      </q-card-actions>
      <q-inner-loading :showing="loading" />
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'UserLogin',
  data () {
    return {
      loading: false,
      form: {
        loginName: 'system',
        password: '123456'
      },
      accept: false
    }
  },

  methods: {
    onSubmit () {
      this.loading = true
      this.$store.dispatch('session/login', this.form).then(() => {
        this.loading = false
        const params = { redirect: this.$route.query.redirect || '/' }
        this.$router.push({ path: params.redirect })
      }).catch(e => {
        this.loading = false
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: '登录失败，请稍后重试。'
        })
        console.error(e)
      })
    },

    onReset () {
      this.form.username = null
      this.form.password = null
      this.accept = false
    }
  }
}
</script>

<style lang="sass" scoped>
.login-wrapper, login-form
  width: 640px
@media (max-width: 1023px)
  .login-wrapper, login-form
    width: 98%
@media (max-width: 599px)
  .q-pa-xl
    padding: 15px
</style>

<template>
  <q-page class="row items-center justify-center">
    <q-card
      class="login-wrapper shadow-24"
      bordered
    >
      <q-card-section horizontal>

        <q-card-section class="col q-mt-xs q-pa-xl">
          <div class="text-h5 text-primary q-mb-xs">注册</div>
          <div class="text-h6 q-mt-sm q-mb-xs">创建我的账号</div>
          <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="login-form my-form q-mt-lg"
          >
            <q-input
              outlined
              dense
              no-error-icon
              v-model.trim="form.loginName"
              placeholder="账号"
              :rules="[ val => val && val.length > 0 || '请设置用户账号']"
            />
            <q-input
              outlined
              dense
              no-error-icon
              type="password"
              v-model.trim="form.password"
              placeholder="密码"
              :rules="[ val => val && val.length > 0 || '请设置登录密码']"
            />
            <q-input
              outlined
              dense
              no-error-icon
              type="password"
              v-model.trim="form.cpassword"
              placeholder="确认密码"
              :rules="[ val => val && val.length > 0 || '请再次输入你的密码', val => val && val === form.password || '两次密码输入不一致' ]"
            />
            <q-input
              outlined
              dense
              no-error-icon
              type="mobile"
              v-model.trim="form.mobile"
              placeholder="手机号码"
              :rules="[ val => val && val.length > 0 || '请输入你的手机号码']"
            >
              <template v-slot:prepend>
                +86
              </template>
            </q-input>
            <div class="column items-center">
              <q-btn
                label="注册"
                type="submit"
                color="primary"
                class="full-width"
              />
              <div class="q-mt-md">登录已有账号？<router-link
                  to="/user/login"
                  class="text-blue"
                >点击登录</router-link>
              </div>
            </div>
          </q-form>

        </q-card-section>
      </q-card-section>
      <q-separator />

      <q-card-actions v-if="$q.screen.gt.sm">
        <q-chip
          color="primary"
          text-color="white"
          icon="directions"
        >
          Get directions
        </q-chip>
        <q-space />
        <q-btn
          flat
          round
          icon="settings_system_daydream"
        />
      </q-card-actions>
      <q-inner-loading :showing="loading">
        <q-spinner-hourglass
          size="sm"
          color="primary"
        />
      </q-inner-loading>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'UserSignup',
  data () {
    return {
      loading: false,
      form: {
        loginName: '',
        password: '',
        cpassword: '',
        mobile: ''
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
          color: 'negative',
          textColor: 'white',
          position: 'top',
          icon: 'highlight_off',
          message: '登录失败，请稍后重试！'
        })
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
  width: 450px
@media (max-width: 1023px)
  .login-wrapper, login-form
    width: 98%
@media (max-width: 599px)
  .q-pa-xl
    padding: 15px
</style>

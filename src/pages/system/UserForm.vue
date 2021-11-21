<template>
  <q-dialog v-model="fixed">
    <q-card
      class="my-dialog"
      style="min-width:680px;"
    >
      <q-form
        @submit="onSubmit"
        class="my-form"
      >
        <q-card-section class="q-dialog-header">
          <div class="text-subtitle1">新增用户</div>
        </q-card-section>

        <q-separator />

        <q-card-section
          style="max-height: 50vh; "
          class="scroll q-gutter-y-md q-mt-none"
        >
          <template v-if="!action">
            <div class="row q-form-item">
              <div class="col-3 q-label text-right required">
                <label for="username">
                  账号
                </label>
              </div>
              <div class="col-8">
                <q-input
                  outlined
                  dense
                  no-error-icon
                  v-model.trim="form.loginName"
                  placeholder="请输入账号"
                  :rules="[ val => val && val.length > 0 || '请设置用户账号']"
                />
              </div>
            </div>
            <div class="row q-form-item">
              <div class="col-3 q-label text-right required">
                <label for="password">
                  密码
                </label>
              </div>
              <div class="col-8">
                <q-input
                  outlined
                  dense
                  no-error-icon
                  type="password"
                  v-model.trim="form.password"
                  placeholder="请输入密码"
                  :rules="[ val => val && val.length > 0 || '请设置登录密码']"
                />
              </div>
            </div>
            <div class="row q-form-item">
              <div class="col-3 q-label text-right required">
                <label for="cpassword">
                  再次输入密码
                </label>
              </div>
              <div class="col-8">
                <q-input
                  outlined
                  dense
                  no-error-icon
                  type="password"
                  v-model.trim="form.cpassword"
                  placeholder="请输入确认密码"
                  :rules="[ val => val && val.length > 0 || '请再次输入你的密码', val => val && val === form.password || '两次密码输入不一致' ]"
                />
              </div>
            </div>
            <div class="row q-form-item">
              <div class="col-3 q-label text-right">
                <label for="cpassword">
                  选择角色组
                </label>
              </div>
              <div class="col-8">

              </div>
            </div>
          </template>
          <template v-else>
            <q-action-success />
          </template>
        </q-card-section>

        <q-separator />

        <q-card-actions
          align="right"
          class="q-dialog-footer"
        >
          <q-btn
            label="确认"
            color="primary"
            type="submit"
            :loading="loading"
            v-if="!action"
          />
          <q-btn
            outline
            label="取消"
            color="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'RoleForm',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      fixed: false,
      loading: false,
      action: false,
      form: {
        roleId: null,
        roleName: null,
        remarks: null
      }
    }
  },
  watch: {
    value () {
      this.action = false
      this.fixed = this.value
    },
    fixed () {
      this.$emit('input', this.fixed)
    }
  },
  methods: {
    onSubmit () {
      this.loading = true
      this.$store.dispatch('system/saveRole', this.form).then(data => {
        this.loading = false
        this.action = true

        this.$emit('refresh')

        this.onReset()
      }).catch(e => {
        this.loading = false
      })
    },
    onReset () {
      this.form.roleId = null
      this.form.roleName = null
      this.form.remarks = null
    }
  }
}
</script>

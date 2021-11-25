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
                v-model.trim="form.username"
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
                v-model.trim="cpassword"
                type="password"
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
              <user-role-list v-model="form.roleIds" />
            </div>
          </div>
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
            @click="onReset"
            v-close-popup
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import UserRoleList from './UserRoleList.vue'
import axios from 'axios'
export default {
  name: 'UserForm',
  components: {
    UserRoleList
  },
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
      form: {
        roleIds: [],
        username: null,
        password: null
      },
      cpassword: null
    }
  },
  watch: {
    value () {
      this.fixed = this.value
    },
    fixed () {
      this.$emit('input', this.fixed)
    }
  },
  methods: {
    async onSubmit () {
      this.loading = true
      await axios.post('/admin/users', this.form).then(response => {
        const { code, message, data } = response.data
        if (code === '200' && data) {
          this.$emit('refresh')
          this.onReset()
          this.$emit('input', false) // 关闭窗口
        } else {
          this.$q.notify({
            message
          })
        }
      }).catch(error => {
        console.error(error)
      })
      setTimeout(() => {
        this.loading = false
      }, 500)
    },
    onReset () {
      this.form.roleIds = []
      this.form.username = null
      this.form.password = null
      this.cpassword = null
    }
  }
}
</script>

<template>
  <q-dialog v-model="fixed">
    <q-card
      class="my-dialog"
      style="min-width:680px;"
    >
      <q-toolbar>
        <q-toolbar-title>编辑用户</q-toolbar-title>
        <q-btn
          flat
          round
          dense
          icon="close"
          v-close-popup
        />
      </q-toolbar>
      <q-separator />
      <q-form
        @submit="onSubmit"
        class="my-form"
      >
        <q-card-section
          style="max-height: 56vh; "
          class="scroll q-gutter-y-md q-mt-none"
        >
          <div class="row q-form-item">
            <div class="col-3 q-label text-right">
              <label for="id">
                用户ID
              </label>
            </div>
            <div class="col-8 q-value">
              {{user.id}}
            </div>
          </div>
          <div class="row q-form-item">
            <div class="col-3 q-label text-right">
              <label for="id">
                创建时间
              </label>
            </div>
            <div class="col-8 q-value">
              {{user.created}}
            </div>
          </div>
          <div class="row q-form-item q-mb-md">
            <div class="col-3 q-label text-right">
              <label for="avatar">
                头像
              </label>
            </div>
            <div class="col-8">
              <q-uploader
                url="http://localhost:4444/upload"
                style="max-width: 230px"
                with-credentials
              />
            </div>
          </div>
          <div class="row q-form-item">
            <div class="col-3 q-label text-right required">
              <label for="username">
                用户账号
              </label>
            </div>
            <div class="col-8">
              <q-input
                outlined
                dense
                no-error-icon
                v-model.trim="user.username"
                placeholder="请输入用户名"
                :rules="[ val => val && val.length > 0 || '请设置用户名称']"
              />
            </div>
          </div>
          <div class="row q-form-item">
            <div class="col-3 q-label text-right">
              <label for="nickname">
                昵称
              </label>
            </div>
            <div class="col-8">
              <q-input
                outlined
                dense
                no-error-icon
                v-model.trim="user.nickname"
                placeholder="请输入昵称"
              />
            </div>
          </div>
          <div class="row q-form-item">
            <div class="col-3 q-label text-right">
              <label for="realname">
                姓名
              </label>
            </div>
            <div class="col-8">
              <q-input
                outlined
                dense
                no-error-icon
                v-model.trim="user.realname"
                placeholder="请输入姓名"
              />
            </div>
          </div>
          <div class="row q-form-item">
            <div class="col-3 q-label text-right">
              <label for="realname">
                性别
              </label>
            </div>
            <div class="col-8 q-value">
              <div class="q-gutter-sm">
                <q-radio
                  v-model="user.gender"
                  val="1"
                  label="男"
                  dense
                />
                <q-radio
                  v-model="user.gender"
                  val="2"
                  label="女"
                  dense
                />
              </div>
            </div>
          </div>
          <div class="row q-form-item">
            <div class="col-3 q-label text-right">
              <label for="email">
                邮箱
              </label>
            </div>
            <div class="col-8">
              <q-input
                outlined
                dense
                no-error-icon
                v-model.trim="user.email"
                placeholder="请输入邮箱"
              />
            </div>
          </div>
          <div class="row q-form-item">
            <div class="col-3 q-label text-right">
              <label for="mobile">
                手机号码
              </label>
            </div>
            <div class="col-8">
              <q-input
                outlined
                dense
                no-error-icon
                v-model.trim="user.mobile"
                placeholder="请输入手机号码"
              />
            </div>
          </div>
          <div class="row q-form-item q-mb-md">
            <div class="col-3 q-label text-right">
              <label for="signature">
                签名
              </label>
            </div>
            <div class="col-8">
              <q-input
                dense
                outlined
                no-error-icon
                v-model="user.signature"
                autogrow
                :input-style="{ minHeight: '60px' }"
              />
            </div>
          </div>

        </q-card-section>

        <q-separator />

        <q-card-actions
          align="right"
          class="q-dialog-footer"
        >
          <q-btn
            :label="$q.lang.label.ok"
            color="primary"
            type="submit"
            :loading="loading"
          />
          <q-btn
            :label="$q.lang.label.cancel"
            @click="onReset"
            v-close-popup
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import axios from 'axios'
export default {
  name: 'UserDetailEdit',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      fixed: false,
      loading: false,
      oldUser: {}

    }
  },
  watch: {
    value () {
      this.fixed = this.value
    },
    fixed () {
      this.oldUser = this.user
      this.$emit('input', this.fixed)
    }
  },
  methods: {
    async onRequest () {
      this.loading = true

      setTimeout(() => {
        this.loading = false
      }, 200)
    },
    async onSubmit () {
      this.loading = true
      const form = {
        oldUsername: this.oldUser.username,
        ...this.user
      }
      delete form.password
      delete form.created
      await axios.post('/admin/users/update', form).then(response => {
        const { code, message, data } = response.data
        if (code === '200' && data) {
          this.$q.notify({
            type: 'positive',
            message: '保存成功！'
          })
          this.$emit('refresh')
          // this.onReset()
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
      this.$emit('refresh')
    }
  }
}
</script>

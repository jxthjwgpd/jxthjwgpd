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
                v-model.trim="form.username"
                placeholder="请输入用户名"
                :rules="[ val => val && val.length > 0 || '请设置用户名称']"
              />
            </div>
          </div>
          <div class="row q-form-item">
            <div class="col-3 q-label text-right">
              <label for="status">
                状态
              </label>
            </div>
            <div class="col-8 q-value">
              <div class="q-gutter-sm">
                <q-radio
                  v-model="form.status"
                  val="0"
                  label="正常"
                  dense
                />
                <q-radio
                  v-model="form.status"
                  val="2"
                  label="禁用"
                  dense
                />
              </div>
            </div>
          </div>
          <div class="row q-form-item q-mb-md">
            <div class="col-3 q-label text-right">
              <label for="remark">
                备注
              </label>
            </div>
            <div class="col-8">
              <q-input
                dense
                outlined
                no-error-icon
                v-model="form.remark"
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
      form: {
        oldUsername: this.user.username,
        ...this.user
      }
    }
  },
  mounted () {
    console.log(this.form)
  },
  watch: {
    value () {
      this.fixed = this.value
    },
    fixed () {
      this.form.id = this.user.id
      this.$emit('input', this.fixed)
    }
  },
  methods: {
    async onSubmit () {
      this.loading = true
      await axios.post('/admin/roles/update', this.form).then(response => {
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
      // this.form.id = null
      // this.form.remark = this.user.remark
      // this.form.status = this.user.status
    }
  }
}
</script>

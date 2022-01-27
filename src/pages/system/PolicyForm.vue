<template>
  <q-dialog v-model="fixed">
    <q-card
      class="my-dialog"
      style="min-width:680px;"
    >
      <q-toolbar>
        <q-toolbar-title>新增策略</q-toolbar-title>
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
            <div class="col-3 q-label text-right required">
              <label for="policyName">
                策略名称
              </label>
            </div>
            <div class="col-8">
              <q-input
                outlined
                dense
                no-error-icon
                v-model.trim="form.policyName"
                placeholder="请输入策略名称"
                :rules="[ val => val && val.length > 0 || '请设置策略名称']"
              />
            </div>
          </div>
          <div class="row q-form-item q-mb-md">
            <div class="col-3 q-label text-right">
              <label for="policyNameCn">
                策略类型
              </label>
            </div>
            <div class="col-3">
              <q-select
                outlined
                dense
                options-dense
                v-model="policyType"
                :options="policyTypeOptions"
              />
            </div>
          </div>
          <div class="row q-form-item q-mb-md">
            <div class="col-3 q-label text-right">
              <label for="policyNameCn">
                说明
              </label>
            </div>
            <div class="col-8">
              <q-input
                dense
                outlined
                no-error-icon
                v-model="form.policyNameCn"
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
  name: 'PolicyForm',
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
      policyTypeOptions: [
        { label: '系统策略', value: '1' },
        { label: '自定义策略', value: '2' }
      ],
      policyType: { label: '自定义策略', value: '2' },
      form: {
        policyName: null,
        policyNameCn: null,
        policyType: null
      }
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
      this.form.policyType = this.policyType.value
      await axios.post('/admin/policies', this.form).then(response => {
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
      this.form.policyName = null
      this.form.policyNameCn = null
      this.form.policyType = null
    }
  }
}
</script>

<template>
  <q-page class="my-page">
    <div class="row items-center justify-between">
      <div class="my-page-header q-pb-none">
        <q-breadcrumbs align="left">
          <q-breadcrumbs-el
            label="首页"
            to="/"
          />
          <q-breadcrumbs-el
            label="系统设置"
            to="/system"
          />
          <q-breadcrumbs-el label="策略管理" />
        </q-breadcrumbs>
        <div class="my-page-header-subtitle">
          <router-link
            to="/system/admin/policies"
            class="my-page-header-goback"
          >
            <q-icon
              name="arrow_back"
              size="sm"
              class="text-bold text-dark"
            />
          </router-link>
          策略编辑
        </div>
      </div>
    </div>

    <div class="my-page-body">
      <q-card
        flat
        class="q-pa-xl"
      >
        <q-form class="my-form">
          <div class="row">
            <div class="col-2 q-label">
              <label for="created">
                策略ID
              </label>
            </div>
            <div class="col-8 q-value">
              {{form.id}}
            </div>
          </div>
          <div class="row">
            <div class="col-2 q-label">
              <label for="created">
                创建时间
              </label>
            </div>
            <div class="col-8 q-value">
              {{form.created}}
            </div>
          </div>
          <div class="row">
            <div class="col-2 q-label">
              <label for="roleName">
                策略名称
              </label>
            </div>
            <div class="col-8 q-value">
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
          <div class="row">
            <div class="col-2 q-label">
              <label for="policyNameCn">
                说明
              </label>
            </div>
            <div class="col-8 q-value">
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
          <div class="row">
            <div class="col-2 q-label">
              <label for="menu">
                策略内容
              </label>
            </div>
            <div class="col-8 q-pt-sm">
              <q-card
                flat
                bordered
              >
                <codemirror
                  v-model="policyContent"
                  :options="cmOptions"
                />
                <q-separator />
                <div class="flex justify-center q-pa-sm">
                  <q-btn-group outline>
                    <q-btn
                      outline
                      color="brown"
                      label="prettify"
                      @click="policyContent = prettify(policyContent)"
                    />
                    <q-btn
                      outline
                      color="brown"
                      label="minify"
                    />
                  </q-btn-group>
                </div>
              </q-card>
            </div>
          </div>
          <div class="row q-mt-lg">
            <div class="col offset-2">
              <q-btn
                color="primary"
                label="保存设置"
                @click="onSubmit"
              />
            </div>
          </div>
        </q-form>
        <q-inner-loading :showing="loading">
          <q-spinner-hourglass
            size="sm"
            color="primary"
          />
        </q-inner-loading>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios'
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/selection/active-line.js'
import 'codemirror/mode/javascript/javascript.js'

import json from '../../assets/json.js'
export default {
  name: 'PolicyEdit',
  components: {
    codemirror
  },
  data () {
    return {
      loading: false,
      cmOptions: {
        tabSize: 4,
        lineNumbers: true,
        mode: {
          name: 'javascript',
          json: true
        }
      },
      form: {},
      oldPolicyName: null,
      policyContent: null
    }
  },
  mounted () {
    this.onRequest()
  },
  methods: {
    prettify: json.prettify,
    async onRequest (props) {
      this.loading = true
      await axios.get('/admin/policies/detail', { params: { id: this.$route.params.id } }).then(response => {
        const { code, data } = response.data
        if (code === '200' && data) {
          this.form = data.policy
          this.oldPolicyName = data.policy.policyName
          this.policyContent = this.prettify(data.policy.content)
        }
      }).catch(error => {
        console.error(error)
      })

      setTimeout(() => {
        this.loading = false
      }, 200)
    },
    async onSubmit () {
      this.loading = true
      this.form.oldPolicyName = this.oldPolicyName
      this.form.content = this.policyContent
      await axios.post('/admin/policies/update', this.form).then(response => {
        const { code, message } = response.data
        if (code === '200') {
          this.$q.notify({
            type: 'positive',
            message: '保存设置成功！'
          })
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
    }
  }
}
</script>

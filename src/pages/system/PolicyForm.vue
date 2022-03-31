<template>
  <q-page class="my-page">
    <div class="row items-center justify-between">
      <div class="my-page-header">
        <q-breadcrumbs align="left">
          <q-breadcrumbs-el
            label="首页"
            to="/"
          />
          <q-breadcrumbs-el
            label="系统权限"
            to="/system"
          />
          <q-breadcrumbs-el label="策略管理" />
        </q-breadcrumbs>
      </div>
    </div>
    <div class="my-page-body">
      <div class="my-tabs">
        <q-tabs
          narrow-indicator
          align="left"
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
        >
          <q-route-tab to="/system/policies">策略列表</q-route-tab>
          <q-route-tab :to="`/system/policies/form${form.id!=null?'/'+form.id:''}`">{{form.id!=null?'编辑':'新增'}}策略</q-route-tab>
        </q-tabs>
      </div>
      <q-card
        flat
        class="fit "
      >
        <div class="container">
          <q-form
            class="my-form gutter"
            @submit="onSubmit"
          >
            <q-card-section class="q-pa-xl">
              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-4 col-lg-4">
                  <label for="policyName"> 策略名称</label>
                  <q-input
                    outlined
                    dense
                    no-error-icon
                    v-model.trim="form.policyName"
                    placeholder="请输入策略名称"
                    :rules="[ val => val && val.length > 0 || '请设置策略名称']"
                    class="q-mt-sm"
                  >
                  </q-input>
                </div>
                <div class="col-12">
                  <label for="policyNameCn"> 策略描述 </label>
                  <q-input
                    outlined
                    dense
                    no-error-icon
                    v-model.trim="form.policyNameCn"
                    placeholder="请输入策略描述"
                    class="q-mt-sm"
                  >
                  </q-input>
                </div>
                <div class="col-12">
                  <label for="roleNameCn"> 策略类型 </label>
                  <div class="q-gutter-sm q-mt-xs">
                    <q-radio
                      v-model="form.policyType"
                      val="1"
                      label="系统策略"
                      dense
                      disable
                    />
                    <q-radio
                      v-model="form.policyType"
                      val="2"
                      label="自定义策略"
                      dense
                    />
                  </div>
                </div>
              </div>
              <div class="row q-col-gutter-md q-mt-xs">
                <div class="col-12">
                  <label for="brandName"> 策略内容</label>
                  <q-card
                    flat
                    bordered
                    class="q-mt-sm"
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
                          @click="policyContent = minify(policyContent)"
                        />
                      </q-btn-group>
                    </div>
                  </q-card>
                </div>
                <div class="col-12">
                  <label for="remark"> 备注 </label>
                  <q-input
                    dense
                    outlined
                    no-error-icon
                    v-model="form.remark"
                    autogrow
                    :input-style="{ minHeight: '65px' }"
                    class="q-mt-sm"
                  />
                </div>
              </div>
            </q-card-section>
            <q-separator />
            <q-card-actions class="q-pa-xl">
              <q-btn
                color="primary"
                class="wd-80"
                type="submit"
              >保存</q-btn>
              <q-btn
                class="wd-80"
                type="reset"
              >重置</q-btn>
              <q-space />
              <q-btn
                color="negative"
                class="wd-80"
                v-if="form.id"
                v-del:goback="{id:form.id, url:'/admin/policy-delete'}"
              >删除</q-btn>
            </q-card-actions>
          </q-form>
        </div>
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
  name: 'PolicyForm',
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
      form: {
        id: this.$route.params.id,
        policyType: '2'
      },
      oldPolicyName: null,
      policyContent: null
    }
  },
  mounted () {
    if (this.form.id) {
      this.onRequest()
    }
  },
  methods: {
    prettify: json.prettify,
    minify: json.minify,
    async onRequest () {
      this.loading = true
      await axios.get('/admin/policy-detail', { params: { id: this.form.id } }).then(response => {
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
      delete this.form.created
      delete this.form.status
      this.form.oldPolicyName = this.oldPolicyName
      this.form.content = this.minify(this.policyContent)
      await axios.post(`/admin/polic${this.form.id ? 'y-update' : 'ies'}`, this.form).then(response => {
        const { code, message, data } = response.data
        if (code === '200' && data) {
          this.$q.notify({
            type: 'positive',
            message: '保存成功.'
          })

          this.$router.go(-1)
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
      }, 200)
    }
  }
}
</script>

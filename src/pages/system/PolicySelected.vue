<template>
  <q-dialog v-model="fixed">
    <q-card
      class="my-dialog"
      style="min-width:880px;"
    >
      <q-toolbar>
        <q-toolbar-title>授权</q-toolbar-title>
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
          class="scroll q-mt-none"
        >
          <q-item-label
            header
            class="text-dark text-bold q-pt-none q-pl-none"
          >
            对象 ： <span class="text-primary"> {{label}}</span>
          </q-item-label>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-8">
              <q-card
                flat
                bordered
              >
                <q-card-section>
                  策略名称/描述 <span class="text-primary">可选（{{policyList.length}}）</span>
                </q-card-section>
                <q-separator />
                <q-list
                  class="scroll"
                  style="height: 260px;"
                >
                  <q-item
                    tag="label"
                    v-ripple
                    v-for="(item, index) in policyList"
                    :key="index"
                  >
                    <q-item-section side>
                      <q-checkbox
                        dense
                        v-model="form.policyIds"
                        :val="item.id"
                      />
                    </q-item-section>
                    <q-item-section>
                      {{item.policyName}}
                      <q-item-label caption>{{item.policyNameCn||'--'}}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      {{ policyType[item.policyType] }}
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card>
            </div>
            <div class="col-12 col-sm-4">
              <q-card
                flat
                bordered
              >
                <q-card-section>
                  策略名称<span class="text-primary"> 已选（{{selectedPolicies.length}}）</span>
                </q-card-section>
                <q-separator />
                <q-list
                  class="scroll"
                  style="height: 260px;"
                >
                  <div
                    v-for="item in selectedPolicies"
                    :key="item.id"
                  >
                    <q-item
                      tag="label"
                      v-ripple
                    >
                      <q-item-section>
                        {{item.policyName}}
                        <q-item-label caption>{{item.policyNameCn||'--'}}</q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-icon
                          name="clear"
                          size="14px"
                          color="primary"
                          @click="clearSelected(item.id)"
                        />
                      </q-item-section>
                    </q-item>
                  </div>
                  <div
                    v-if="selectedPolicies.length==0"
                    style="line-height:45px; text-align:center;"
                  >
                    暂无数据
                  </div>
                </q-list>
              </q-card>
            </div>
            <q-inner-loading :showing="loading">
              <q-spinner-hourglass
                size="sm"
                color="primary"
              />
            </q-inner-loading>
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
import { policyType } from '../../assets/dict.js'
export default {
  name: 'RoleEdit',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    id: String,
    label: String,
    url: String,
    data: Array
  },
  data () {
    return {
      fixed: false,
      loading: false,
      policyName: null,
      policyList: [],
      policyType,
      form: {
        id: null,
        policyIds: []
      }
    }
  },
  computed: {
    selectedPolicies () {
      return this.policyList.filter(e => this.form.policyIds.find(a => a === e.id))
    }
  },
  mounted () {
    this.onRequest()
  },
  watch: {
    value () {
      this.fixed = this.value
      this.form.policyIds = this.data
    },
    fixed () {
      this.form.id = this.id
      this.$emit('input', this.fixed)
    }
  },
  methods: {
    async onRequest () {
      this.loading = true
      const params = {
        policyName: this.policyName
      }
      await axios.get('/admin/policies/list', params).then(response => {
        const { code, data } = response.data
        if (code === '200' && data) {
          this.policyList = data
        }
      }).catch(error => {
        console.error(error)
      })
      setTimeout(() => {
        this.loading = false
      }, 200)
    },
    clearSelected (id) {
      this.form.policyIds.splice(this.form.policyIds.indexOf(id), 1)
    },
    async onSubmit () {
      this.loading = true
      await axios.post(this.url, this.form).then(response => {
        const { code, message, data } = response.data
        if (code === '200' && data) {
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
      this.form.id = null
    }
  }
}
</script>

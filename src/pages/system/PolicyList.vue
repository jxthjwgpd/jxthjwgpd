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
          <q-route-tab to="/system/policies/form">新增策略</q-route-tab>
        </q-tabs>
      </div>
      <div class="my-table">
        <q-table
          :data="data"
          :columns="columns"
          row-key="id"
          :pagination.sync="pagination"
          :loading="loading"
          :filter="policyName"
          @request="onRequest"
          binary-state-sort
          square
        >

          <template v-slot:no-data="{ message }">
            <div class="full-width row flex-center q-gutter-sm q-pa-lg">
              <span>
                {{ message }}
              </span>
            </div>
          </template>

          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td
                key="policyName"
                :props="props"
              >
                <a
                  class="text-primary"
                  href="javascript:;"
                  @click="onContent(props.row)"
                >{{ props.row.policyName|| '-' }}</a>
              </q-td>
              <q-td
                key="policyNameCn"
                :props="props"
                class="text--line2-f"
              >{{ props.row.policyNameCn }}</q-td>
              <q-td
                key="policyType"
                :props="props"
              >
                {{ policyType[props.row.policyType] }}</q-td>
              <q-td
                key="status"
                :props="props"
              >
                <q-sys-status :value="props.row.status" />
              </q-td>
              <q-td
                key="created"
                :props="props"
              >{{ props.row.created }}</q-td>
              <q-td
                key="action"
                :props="props"
                class="q-gutter-xs action"
              >
                <router-link
                  :to="`policies/${props.row.id}`"
                  class="text-primary"
                  v-if="props.row.policyType==='2'"
                >编辑</router-link>
                <a
                  class="text-primary"
                  href="javascript:;"
                  @click="onDel(props.row)"
                  v-if="props.row.policyType==='2'"
                >删除</a>
                <span
                  class="text-grey"
                  v-if="props.row.policyType==='1'"
                >限制</span>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
    <q-dialog v-model="fixedEdit">
      <q-card
        flat
        bordered
        style="min-width:680px;"
      >
        <q-card-section header>
          策略内容
        </q-card-section>
        <q-separator />
        <q-card-section class="q-pa-none">
          <codemirror
            v-model="policy.content"
            :options="cmOptions"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- <role-edit
      v-model="fixedEdit"
      v-on:refresh="onRefresh"
      :role="role"
    /> -->
  </q-page>
</template>

<script>
import axios from 'axios'
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/selection/active-line.js'
import 'codemirror/mode/javascript/javascript.js'

import { policyType } from '../../assets/dict.js'
import json from '../../assets/json.js'
export default {
  name: 'PolicyList',
  components: {
    codemirror
  },
  data () {
    return {
      cmOptions: {
        tabSize: 4,
        lineNumbers: true,
        mode: {
          name: 'javascript',
          json: true
        }
      },
      loading: false,
      policyName: null,
      pagination: {
        sortBy: null,
        descending: false,
        page: 1,
        rowsPerPage: 15,
        rowsNumber: 10
      },
      columns: [
        { name: 'policyName', label: '策略名称', align: 'left', field: 'policyName', style: 'width: 280px' },
        { name: 'policyNameCn', label: '说明', align: 'left', field: 'policyNameCn' },
        { name: 'policyType', label: '策略类型', align: 'left', field: 'policyType', style: 'width: 100px' },
        { name: 'status', label: '状态', align: 'center', field: 'status', sortable: true, style: 'width: 100px' },
        { name: 'created', label: '创建时间', align: 'center', field: 'created', style: 'width: 180px' },
        { name: 'action', label: '操作', field: 'action', align: 'center', style: 'width: 100px' }
      ],
      policy: {},
      data: [],
      fixed: false,
      fixedEdit: false,
      policyType
    }
  },
  mounted () {
    this.onRefresh()
  },
  methods: {
    prettify: json.prettify,
    onRefresh () {
      this.pagination.page = 0
      this.onRequest({
        pagination: this.pagination,
        filter: null
      })
    },
    async onRequest (props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      const filter = props.filter
      this.loading = true
      await axios.get('/admin/policies', { params: { current: page, size: rowsPerPage, policyName: filter } }).then(response => {
        const { code, data } = response.data
        if (code === '200' && data) {
          this.pagination.page = data.current
          this.pagination.rowsNumber = data.total
          this.pagination.rowsPerPage = data.size

          this.pagination.sortBy = sortBy
          this.pagination.descending = descending
          this.data = data.records

          // if (this.data && this.data[0]) {
          //   this.onContent(this.data[0])
          // }
        }
      }).catch(error => {
        console.error(error)
      })
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },
    onContent (policy) {
      this.fixedEdit = !this.fixedEdit
      this.policy = policy
      this.policy.content = this.prettify(policy.content)
    },
    onSubmit () {

    },
    onDel (policy) {
      this.$q.dialog({
        title: this.$t('dialog.delete.title'),
        message: this.$t('dialog.delete.message'),
        cancel: true
      }).onOk(() => {
        this.loading = true
        axios.post('/admin/policies/delete', { id: policy.id }).then(response => {
          const { code, data } = response.data
          if (code === '200' && data) {
            this.onRefresh()
          }
          this.loading = false
        }).catch(error => {
          console.error(error)
          this.loading = false
        })
      })
    }
  }
}
</script>

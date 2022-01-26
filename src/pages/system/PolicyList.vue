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
          <q-breadcrumbs-el label="权限策略" />
        </q-breadcrumbs>
        <div class="my-page-header-subtitle">
          <router-link
            to="/system/admin/users"
            class="my-page-header-goback"
          >
            <q-icon
              name="arrow_back"
              size="sm"
              class="text-bold text-dark"
            />
          </router-link>
          策略管理
        </div>
      </div>
    </div>

    <div class="my-page-body row q-col-gutter-xs">
      <div class="my-table col-12 col-sm-6 col-lg-8">
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
          <template v-slot:top-left>
            <q-btn
              label="新建"
              color="primary"
              @click="fixed=!fixed"
            />
          </template>

          <template v-slot:top-right>
            <q-input
              dense
              debounce="300"
              v-model="policyName"
              placeholder="请输入策略名称"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>

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
                <a
                  class="text-primary"
                  href="javascript:;"
                  @click="onRoleEdit(props.row)"
                  v-if="props.row.policyType==='2'"
                >编辑</a>
                <a
                  class="text-primary"
                  href="javascript:;"
                  @click="onRoleDel(props.row)"
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
      <div class="col-12 col-sm-6 col-lg-4">
        <q-form
          @submit="onSubmit"
          class="my-form"
        >
          <q-card
            flat
            class="q-pa-none"
          >
            <q-item>

              <q-item-section>
                <q-item-label>{{policy.policyName}}</q-item-label>
                <q-item-label caption>
                  {{policy.policyNameCn}}
                </q-item-label>
              </q-item-section>
              <q-btn color="primary">保存</q-btn>
            </q-item>

            <q-separator />
            <codemirror
              v-model="policy.content"
              :options="cmOptions"
            />
          </q-card>
        </q-form>
      </div>
    </div>
    <!-- <role-form
      v-model="fixed"
      v-on:refresh="onRefresh"
    />
    <role-edit
      v-model="fixedEdit"
      v-on:refresh="onRefresh"
      :role="role"
    /> -->
  </q-page>
</template>

<script>
// import RoleForm from './RoleForm.vue'
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
        rowsPerPage: 10,
        rowsNumber: 15
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
      show: false,
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

          if (this.data && this.data[0]) {
            this.onContent(this.data[0])
          }
        }
      }).catch(error => {
        console.error(error)
      })
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },
    onContent (policy) {
      this.show = !this.show
      this.policy = policy
      this.policy.content = this.prettify(policy.content)
    },
    onSubmit () {

    }
    // onRoleEdit (role) {
    //   this.fixedEdit = !this.fixedEdit
    //   this.role = role
    // },
    // onRoleDel (role) {
    //   this.$q.dialog({
    //     title: this.$t('dialog.delete.title'),
    //     message: this.$t('dialog.delete.message'),
    //     cancel: true
    //   }).onOk(() => {
    //     this.$store.dispatch('system/DeleteRole', role.id).then(data => {
    //       this.onRefresh()
    //     }).catch(error => {
    //       console.log(error)
    //     })
    //   })
    // }
  }
}
</script>

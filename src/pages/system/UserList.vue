<template>
  <q-page class="my-page">
    <div class="row items-center justify-between">
      <div class="my-page-header q-pb-none">
        <q-breadcrumbs align="left">
          <q-breadcrumbs-el
            label="首页"
            to=""
          />
          <q-breadcrumbs-el
            label="系统设置"
            to=""
          />
          <q-breadcrumbs-el label="管理员" />
        </q-breadcrumbs>
        <div class="my-page-header-subtitle">基础表单</div>
        <div class="q-mt-sm">
          <q-tabs
            v-model="tab"
            dense
            align="left"
          >
            <q-tab name="mails">用户</q-tab>
            <q-tab name="alarms">角色组</q-tab>
            <q-tab name="sa">设置</q-tab>
          </q-tabs>
        </div>
      </div>
    </div>
    <div class="my-page-body my-table">
      <q-table
        :data="data"
        :columns="columns"
        row-key="id"
        :pagination.sync="pagination"
        :loading="loading"
        :filter="username"
        @request="onRequest"
        binary-state-sort
        square
        :card-style="{ boxShadow: 'none', padding: '0 10px' }"
        :table-header-style="{ backgroundColor: '#eeeeee'}"
      >
        <template v-slot:top-left>
          <q-btn
            label="新建用户"
            color="primary"
            @click="fixed=!fixed"
          />
        </template>
        <template v-slot:top-right>
          <q-input
            dense
            debounce="300"
            v-model="username"
            placeholder="请输入用户名"
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
              key="username"
              :props="props"
            >
              <router-link
                :to="`/system/users/${props.row.id}/${props.row.username}`"
                class="text-primary"
              >{{ props.row.username }}</router-link>
            </q-td>
            <q-td
              key="roleName"
              :props="props"
            >{{ props.row.roleName|| '-' }}</q-td>
            <q-td
              key="lastLoginIp"
              :props="props"
            >{{ props.row.lastLoginIp }} <span v-show="props.row.lastLoginDate">（{{ props.row.lastLoginDate }}）</span></q-td>
            <q-td
              key="status"
              :props="props"
            >
              <q-dict-status :status="props.row.status" />
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
                href="#"
              >编辑</a>
              <a
                class="text-negative"
                href="#"
                @click="confirm(props.row)"
              >删除</a>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
    <user-form
      v-model="fixed"
      v-on:refresh="onRefresh"
    />
    <!-- </q-scroll-area> -->
  </q-page>
</template>

<script>
import UserForm from './UserForm.vue'
import axios from 'axios'
export default {
  name: 'UserList',
  components: {
    UserForm
  },
  data () {
    return {
      loading: false,
      username: '',
      tab: 'mails',
      pagination: {
        sortBy: '',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 10
      },
      columns: [
        { name: 'username', label: '用户账号', align: 'left', field: 'username', sortable: true },
        { name: 'roleName', label: '角色组', align: 'left', field: 'roleName' },
        { name: 'lastLoginIp', label: '最后登录信息', align: 'left', field: 'lastLoginIp', style: 'width: 200px' },
        { name: 'status', label: '状态', align: 'center', field: 'status', sortable: true, style: 'width: 100px' },
        { name: 'created', label: '创建时间', align: 'center', field: 'created', style: 'width: 180px' },
        { name: 'action', label: '操作', field: 'action', align: 'center', style: 'width: 100px' }
      ],
      data: [],
      selected: [],
      fixed: false
    }
  },
  mounted () {
    // get initial data from server (1st page)
    this.onRequest({
      pagination: this.pagination,
      filter: undefined
    })
  },
  methods: {
    onRefresh () {
      this.pagination.page = 0
      this.onRequest({
        pagination: this.pagination,
        filter: undefined
      })
    },
    async onRequest (props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      const filter = props.filter
      this.loading = true
      await axios.get('/admin/users', { params: { current: page, size: rowsPerPage, username: filter } }).then(response => {
        const { code, data } = response.data
        if (code === '200' && data) {
          this.pagination.page = data.current
          this.pagination.rowsNumber = data.total
          this.pagination.rowsPerPage = data.size

          this.pagination.sortBy = sortBy
          this.pagination.descending = descending
          this.data = data.records
        }
      }).catch(error => {
        console.error(error)
      })
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },
    confirm (item) {
      this.$q.dialog({
        title: '删除操作',
        message: '确定要删除当前所选记录吗?',
        color: 'negative',
        cancel: true,
        persistent: true
      }).onOk(() => {
        console.log(item)
        // console.log('>>>> OK')
      }).onOk(() => {
        // console.log('>>>> second OK catcher')
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    }
  }
}
</script>

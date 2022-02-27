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
            label="商品"
            to="/goods"
          />
          <q-breadcrumbs-el label="商品品牌" />
        </q-breadcrumbs>
      </div>
    </div>
    <div class="my-page-body my-table">
      <div class="my-tabs">
        <q-tabs
          narrow-indicator
          align="left"
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
        >
          <q-route-tab to="/goods/brand">品牌列表</q-route-tab>
          <q-route-tab to="/goods/brand/form">新增品牌</q-route-tab>
        </q-tabs>
      </div>
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
              key="username"
              :props="props"
            >
              <router-link
                :to="`users/${props.row.username}`"
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
                @click="onUserEdit(props.row)"
                v-if="!props.row.isa"
              >编辑</a>
              <a
                class="text-primary"
                href="javascript:;"
                @click="onUserRole(props.row)"
                v-if="!props.row.isa"
              >角色配置</a>
              <a
                class="text-primary"
                href="javascript:;"
                @click="onUserPolicy(props.row)"
                v-if="!props.row.isa"
              >授权</a>
              <a
                class="text-primary"
                href="javascript:;"
                @click="onUserDel(props.row)"
                v-if="!props.row.isa"
              >删除</a>
              <span
                class="text-grey"
                v-if="props.row.isa"
              > 默认管理员</span>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
    <!-- <user-form
      v-model="fixed"
      v-on:refresh="onRefresh"
    />
    <user-edit
      v-model="fixedEdit"
      v-on:refresh="onRefresh"
      :user="user"
    />
    <user-role-edit
      v-model="fixedUserRoleEdit"
      :user="user"
      v-on:refresh="onRefresh"
    />
    <policy-selected
      v-model="fixedPolicyEdit"
      :id="user.id"
      :label="user.username"
      :data="userPolicyList"
      url="/admin/users/policies"
    /> -->
  </q-page>
</template>

<script>
// import UserForm from './UserForm.vue'
// import UserEdit from './UserEdit.vue'
// import UserRoleEdit from './UserRoleEdit.vue'
// import PolicySelected from './PolicySelected.vue'
import axios from 'axios'
export default {
  name: 'UserList',
  components: {
    // UserForm,
    // UserEdit,
    // UserRoleEdit,
    // PolicySelected
  },
  data () {
    return {
      loading: false,
      username: '',
      pagination: {
        sortBy: '',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 10
      },
      columns: [
        { name: 'brandName', label: '品牌名', align: 'left', field: 'brandName', sortable: true, style: 'width: 200px' },
        { name: 'roleName', label: '角色组', align: 'left', field: 'roleName', style: 'width: 200px' },
        { name: 'lastLoginIp', label: '最后登录信息', align: 'left', field: 'lastLoginIp', style: 'width: 200px' },
        { name: 'status', label: '状态', align: 'center', field: 'status', sortable: true, style: 'width: 100px' },
        { name: 'created', label: '创建时间', align: 'center', field: 'created', style: 'width: 180px' },
        { name: 'action', label: '操作', field: 'action', align: 'center', style: 'width: 100px' }
      ],
      user: {},
      data: [],
      selected: [],
      fixed: false,
      fixedEdit: false,
      fixedUserRoleEdit: false,
      fixedPolicyEdit: false,
      userPolicyList: []
    }
  },
  mounted () {
    // get initial data from server (1st page)
    this.onRequest({
      pagination: this.pagination,
      filter: undefined
    })
    // test
    // axios.get('/admin/users/log', { params: { current: 1, size: 10 } }).then(response => {
    //   console.log(response)
    // })
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
      await axios.get('/admin/goods/brands', { params: { current: page, size: rowsPerPage, username: filter } }).then(response => {
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
    onUserEdit (user) {
      this.fixedEdit = !this.fixedEdit
      this.user = user
    },
    async onUserRole (user) {
      await this.$store.dispatch('system/UserRoleList', { username: user.username })
      this.fixedUserRoleEdit = !this.fixedUserRoleEdit
      this.user = user
    },
    async onUserPolicy (user) {
      await axios.get('/admin/users/policies', { params: { userId: user.id } }).then(response => {
        const { code, data } = response.data
        if (code === '200' && data) {
          this.userPolicyList = data.map(e => e.policyId)
        }
      }).catch(error => {
        console.error(error)
      })
      setTimeout(() => {
        this.loading = false
      }, 1000)

      this.fixedPolicyEdit = !this.fixedPolicyEdit
      this.user = user
    },
    onUserDel (user) {
      this.$q.dialog({
        title: this.$t('dialog.delete.title'),
        message: this.$t('dialog.delete.message'),
        ok: { color: 'primary' },
        cancel: true
      }).onOk(() => {
        this.$store.dispatch('system/DeleteUser', user.id).then(data => {
          this.onRefresh()
        }).catch(error => {
          console.log(error)
        })
      })
    }
  }
}
</script>

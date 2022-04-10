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
          <q-breadcrumbs-el label="用户管理" />
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
          <q-route-tab to="/system/users">用户列表</q-route-tab>
          <q-route-tab to="/system/users/form">新增用户</q-route-tab>
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
        <!-- <template v-slot:top-left>
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
            v-model="username"
            placeholder="请输入用户名"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template> -->

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
                :to="`users/edit/${props.row.id}`"
                class="text-primary"
              >{{ props.row.username }}</router-link>
            </q-td>
            <q-td
              key="nickname"
              :props="props"
            >{{ props.row.nickname|| '-' }}</q-td>
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
              <router-link
                :to="`users/edit/${props.row.id}`"
                class="text-primary"
                v-if="!props.row.isa"
              >编辑</router-link>
              <a
                class="text-primary"
                href="javascript:;"
                @click="onUserRole(props.row)"
                v-if="!props.row.isa"
              >角色</a>
              <a
                class="text-primary"
                href="javascript:;"
                @click="onUserPolicy(props.row)"
                v-if="!props.row.isa"
              >授权</a>
              <a
                class="text-primary"
                href="javascript:;"
                v-del:refresh="{id:props.row.id, url:'/admin/user-delete'}"
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
    /> -->
    <!-- <user-role-edit
      v-model="fixedRoleEdit"
      :user="user"
      v-on:refresh="onRefresh"
    /> -->
    <role-selected
      v-model="fixedRoleEdit"
      :id="user.id"
      :label="user.username"
      :data="userRoleList"
      url="/admin/user-roles"
    />
    <policy-selected
      v-model="fixedPolicyEdit"
      :id="user.id"
      :label="user.username"
      :data="userPolicyList"
      url="/admin/user-policies"
    />
  </q-page>
</template>

<script>
// import UserForm from './UserForm.vue'
// import UserEdit from './UserEdit.vue'
// import UserRoleEdit from './UserRoleEdit.vue'
import PolicySelected from './PolicySelected.vue'
import RoleSelected from './RoleSelected.vue'
import axios from 'axios'
export default {
  name: 'UserList',
  components: {
    // UserForm,
    // UserEdit,
    PolicySelected,
    RoleSelected
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
        { name: 'username', label: '登录账号', align: 'left', field: 'username', sortable: true, style: 'width: 200px' },
        { name: 'nickname', label: '用户昵称', align: 'left', field: 'nickname', style: 'width: 200px' },
        { name: 'roleName', label: '角色组', align: 'left', field: 'roleName', style: 'width: 200px' },
        { name: 'lastLoginIp', label: '最后登录信息', align: 'left', field: 'lastLoginIp', style: 'width: 200px' },
        { name: 'status', label: '状态', align: 'center', field: 'status', sortable: true, style: 'width: 100px' },
        { name: 'created', label: '创建时间', align: 'center', field: 'created', style: 'width: 180px' },
        { name: 'action', label: '操作', field: 'action', align: 'center', style: 'width: 100px' }
      ],
      data: [],
      selected: [],
      fixedRoleEdit: false,
      fixedPolicyEdit: false,
      userPolicyList: [],
      userRoleList: [],
      user: {}
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
    async onUserRole (user) {
      await axios.get('/admin/user-roles', { params: { userId: user.id } }).then(response => {
        const { code, data } = response.data
        if (code === '200' && data) {
          this.userRoleList = data.map(e => e.roleId)
        }
      }).catch(error => {
        console.error(error)
      })
      setTimeout(() => {
        this.loading = false
      }, 1000)
      this.fixedRoleEdit = !this.fixedRoleEdit
      this.user = user
    },
    async onUserPolicy (user) {
      await axios.get('/admin/user-policies', { params: { userId: user.id } }).then(response => {
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
    }
  }
}
</script>

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
          <q-breadcrumbs-el label="角色管理" />
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
          <q-route-tab to="/system/roles">角色列表</q-route-tab>
          <q-route-tab to="/system/roles/form">新增角色</q-route-tab>
        </q-tabs>
      </div>
      <div class="my-table">
        <q-table
          :data="data"
          :columns="columns"
          row-key="id"
          :pagination.sync="pagination"
          :loading="loading"
          :filter="roleName"
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
              v-model="roleName"
              placeholder="请输入角色名"
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
                key="roleName"
                :props="props"
              >
                <router-link
                  :to="`roles/form/${props.row.id}`"
                  class="text-primary"
                >{{ props.row.roleName|| '-' }}</router-link>
              </q-td>
              <q-td
                key="roleNameCn"
                :props="props"
                class="text--line2-f"
              >{{ props.row.roleNameCn }}</q-td>
              <q-td
                key="remark"
                :props="props"
                class="text--line2-f"
              >{{ props.row.remark }}</q-td>
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
                  :to="`roles/form/${props.row.id}`"
                  class="text-primary"
                >编辑</router-link>
                <a
                  class="text-primary"
                  href="javascript:;"
                  @click="onRolePolicy(props.row)"
                >授权</a>
                <a
                  class="text-primary"
                  href="javascript:;"
                  v-del:refresh="{id:props.row.id, url:'/admin/role-delete'}"
                >删除</a>
              </q-td>
            </q-tr>
          </template>
        </q-table>
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
    <policy-selected
      v-model="fixedPolicyEdit"
      :id="role.id"
      :label="role.roleName"
      :data="rolePolicyList"
      url="/admin/role-policies"
    />
  </q-page>
</template>

<script>
// import RoleForm from './RoleForm.vue'
// import RoleEdit from './RoleEdit.vue'
import PolicySelected from './PolicySelected.vue'
import axios from 'axios'
export default {
  name: 'RoleList',
  components: {
    // RoleForm,
    // RoleEdit,
    PolicySelected
  },
  data () {
    return {
      loading: false,
      roleName: null,
      pagination: {
        sortBy: null,
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 10
      },
      columns: [
        { name: 'roleName', label: '角色', align: 'left', field: 'roleName', style: 'width: 200px' },
        { name: 'roleNameCn', label: '角色名称', align: 'left', field: 'roleNameCn' },
        { name: 'remark', label: '备注', align: 'left', field: 'remark' },
        { name: 'status', label: '状态', align: 'center', field: 'status', sortable: true, style: 'width: 100px' },
        { name: 'created', label: '创建时间', align: 'center', field: 'created', style: 'width: 180px' },
        { name: 'action', label: '操作', field: 'action', align: 'center', style: 'width: 100px' }
      ],
      role: {},
      data: [],
      fixed: false,
      fixedEdit: false,
      fixedPolicyEdit: false,
      rolePolicyList: []
    }
  },
  mounted () {
    this.onRefresh()
  },
  methods: {
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
      await axios.get('/admin/roles', { params: { current: page, size: rowsPerPage, roleName: filter } }).then(response => {
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
    onRoleEdit (role) {
      this.fixedEdit = !this.fixedEdit
      this.role = role
    },
    async onRolePolicy (role) {
      await axios.get('/admin/role-policies', { params: { roleId: role.id } }).then(response => {
        const { code, data } = response.data
        if (code === '200' && data) {
          this.rolePolicyList = data.map(e => e.policyId)
        }
      }).catch(error => {
        console.error(error)
      })
      setTimeout(() => {
        this.loading = false
      }, 1000)

      this.fixedPolicyEdit = !this.fixedPolicyEdit
      this.role = role
    }
  }
}
</script>

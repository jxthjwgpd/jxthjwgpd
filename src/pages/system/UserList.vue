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
        :filter="filter"
        @request="onRequest"
        binary-state-sort
        square
        :card-style="{ boxShadow: 'none', padding: '0 10px' }"
        :table-header-style="{ backgroundColor: '#eeeeee'}"
      >
        <template v-slot:top-left>
          <q-btn
            label="新增用户"
            color="primary"
            to="/system/users/create"
          />
          <q-btn-group
            class="q-ml-sm"
            v-if="$q.screen.gt.sm"
          >
            <q-btn
              label="活跃"
              color="primary"
            />
            <q-btn
              label="管理员"
              color="primary"
            />
            <q-btn
              label="外部"
              color="primary"
            />
            <q-btn
              label="禁用"
              color="primary"
            />
            <q-btn
              label="无策略"
              color="primary"
            />
          </q-btn-group>
        </template>

        <template v-slot:top-right>
          <q-input
            dense
            debounce="300"
            v-model="filter"
            placeholder="查询"
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
              key="loginName"
              :props="props"
            >
              <router-link
                :to="`/system/users/${props.row.userId}/${props.row.loginName}`"
                class="text-primary"
              >{{ props.row.loginName }}</router-link>
            </q-td>
            <q-td
              key="nickname"
              :props="props"
            >{{ props.row.nickname }}</q-td>
            <q-td
              class="text-line2-f"
              key="remarks"
              :props="props"
            >{{ props.row.remarks }}</q-td>
            <q-td
              key="createTime"
              :props="props"
            >{{ props.row.createTime }}</q-td>
            <q-td
              key="action"
              :props="props"
              class="q-gutter-xs"
            >
              <q-btn
                flat
                dense
                color="primary"
                label="添加用户组"
              />
              <q-btn
                flat
                dense
                color="primary"
                label="添加权限"
              />
              <q-btn
                flat
                dense
                color="negative"
                label="删除"
                @click="confirm(props.row)"
              />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
    <!-- </q-scroll-area> -->
  </q-page>
</template>

<script>
export default {
  name: 'UserList',
  data () {
    return {
      filter: '',
      loading: false,
      tab: 'mails',
      pagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 10
      },
      columns: [
        { name: 'loginName', label: '用户名称', align: 'left', field: 'loginName', sortable: true },
        { name: 'nickname', label: '昵称', align: 'left', field: 'nickname', sortable: true },
        { name: 'remarks', label: '备注', align: 'left', field: 'remarks' },
        { name: 'createTime', label: '创建时间', align: 'center', field: 'createTime', sortable: true },
        { name: 'action', label: '操作', field: 'action', align: 'center', style: 'width: 100px' }
      ],
      data: [],
      selected: []
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
      console.log('filter:' + filter)
      this.loading = true
      await this.$store.dispatch('system/getUserList', { current: page, size: rowsPerPage }).then(data => {
        this.pagination.page = data.current
        this.pagination.rowsNumber = data.total
        this.pagination.rowsPerPage = data.size

        this.pagination.sortBy = sortBy
        this.pagination.descending = descending
        this.data = data.records
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

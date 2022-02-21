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
          <q-breadcrumbs-el label="菜单管理" />
        </q-breadcrumbs>
      </div>
    </div>

    <div class="my-page-body">
      <div class="my-table">
        <q-table
          :data="data"
          :columns="columns"
          row-key="id"
          :pagination.sync="pagination"
          :loading="loading"
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
                key="title"
                :props="props"
              >{{ props.row.title|| '-' }}</q-td>
              <q-td
                key="requestUri"
                :props="props"
                class="text--line2-f"
              >{{ props.row.requestUri }}</q-td>
              <q-td
                key="operation"
                :props="props"
                class="text--line2-f"
              >{{ props.row.operation }}</q-td>
              <q-td
                key="createByName"
                :props="props"
                class="text--line2-f"
              >{{ props.row.createByName }}</q-td>
              <q-td
                key="isException"
                :props="props"
                class="text--line2-f"
              >{{ props.row.isException }}</q-td>
              <q-td
                key="created"
                :props="props"
              >{{ props.row.created }}</q-td>
              <q-td
                key="remoteAddr"
                :props="props"
              >
                {{ props.row.remoteAddr }}</q-td>
              <q-td
                key="deviceName"
                :props="props"
              >{{ props.row.deviceName }}</q-td>
              <q-td
                key="browserName"
                :props="props"
              >{{ props.row.browserName }}</q-td>
              <q-td
                key="executeTime"
                :props="props"
              >{{ props.row.executeTime || 0 }}</q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios'
export default {
  name: 'LogList',
  components: {
  },
  data () {
    return {
      loading: false,
      pagination: {
        sortBy: null,
        descending: false,
        page: 1,
        rowsPerPage: 15,
        rowsNumber: 10
      },
      columns: [
        { name: 'title', label: '标题', align: 'left', field: 'title' },
        { name: 'requestUri', label: '请求地址', align: 'left', field: 'requestUri' },
        { name: 'operation', label: '操作描述', align: 'left', field: 'operation' },
        { name: 'createByName', label: '操作用户', align: 'center', field: 'createByName' },
        { name: 'isException', label: '异常', align: 'center', field: 'isException' },
        { name: 'created', label: '操作时间', align: 'center', field: 'created' },
        { name: 'remoteAddr', label: '客户端地址', align: 'left', field: 'remoteAddr' },
        { name: 'deviceName', label: '操作平台', align: 'left', field: 'deviceName' },
        { name: 'browserName', label: '浏览器', align: 'left', field: 'browserName' },
        { name: 'executeTime', label: '响应时间', field: 'executeTime', align: 'center' }
      ],
      log: {
        title: null,
        requestUri: null
      },
      data: [],
      fixed: false
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
      await axios.get('/admin/users/log', { params: { current: page, size: rowsPerPage, roleName: filter } }).then(response => {
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
      }, 200)
    }
  }
}
</script>

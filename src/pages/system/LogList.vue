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
          <q-breadcrumbs-el label="操作日志" />
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
          日志列表
        </div>
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
          <!-- <template v-slot:top-left>
            <q-btn
              label="新建"
              color="primary"
              @click="fixed=!fixed"
            />
          </template> -->

          <template v-slot:top-left>
            <div class="row  q-gutter-x-sm">
              <div class="col">
                <q-input
                  outlined
                  dense
                  no-error-icon
                  v-model="log.title"
                  placeholder="输入标题"
                >
                </q-input>
              </div>
              <div class="col">
                <q-input
                  outlined
                  dense
                  no-error-icon
                  v-model="log.requestUri"
                  placeholder="输入请求地址"
                >
                </q-input>
              </div>
              <div class="col">
                <q-input
                  outlined
                  dense
                  no-error-icon
                  v-model="log.created"
                  placeholder="选择操作时间"
                >
                </q-input>
              </div>
              <div class="col">
                <q-btn
                  label="查询"
                  color="primary"
                />
              </div>
            </div>
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

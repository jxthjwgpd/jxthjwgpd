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
              key="brandName"
              :props="props"
            >
              <router-link
                :to="`/goods/brand/form/${props.row.id}`"
                class="text-primary"
              >{{ props.row.brandName }}</router-link>
            </q-td>
            <q-td
              key="brandInitial"
              :props="props"
            >{{ props.row.brandInitial|| '-' }}</q-td>
            <q-td
              key="summary"
              :props="props"
            >{{ props.row.summary }} </q-td>
            <q-td
              key="brandRecommend"
              :props="props"
            >
              <q-yes-or-no :value="props.row.brandRecommend" />
            </q-td>
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
                :to="`/goods/brand/form/${props.row.id}`"
                class="text-primary"
              >编辑</router-link>
              <a
                class="text-primary"
                href="javascript:;"
                v-del:refresh="{id:props.row.id, url:'/admin/goods/brand-delete'}"
              >删除</a>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios'
export default {
  name: 'UserList',
  data () {
    return {
      loading: false,
      pagination: {
        sortBy: '',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 10
      },
      columns: [
        { name: 'brandName', label: '品牌名', align: 'left', field: 'brandName', sortable: true, style: 'width: 150px' },
        { name: 'brandInitial', label: '首字母', align: 'left', field: 'brandInitial', style: 'width: 80px' },
        { name: 'summary', label: '摘要', align: 'left', field: 'summary', style: 'width: 200px' },
        { name: 'brandRecommend', label: '推荐', align: 'left', field: 'brandRecommend', sortable: true, style: 'width: 80px' },
        { name: 'status', label: '状态', align: 'left', field: 'status', sortable: true, style: 'width: 100px' },
        { name: 'created', label: '创建时间', align: 'center', field: 'created', style: 'width: 180px' },
        { name: 'action', label: '操作', field: 'action', align: 'center', style: 'width: 100px' }
      ],
      data: []
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
      }, 200)
    }
  }
}
</script>

<template>
  <q-page class="my-page">
    <div class="row items-center justify-between">
      <div class="my-page-header">
        <q-breadcrumbs align="left">
          <q-breadcrumbs-el label="根目录" />
        </q-breadcrumbs>
      </div>
    </div>
    <div class="my-page-body my-table">
      <div class="my-table">
        <q-table
          :data="data"
          :columns="columns"
          :pagination.sync="pagination"
          :loading="loading"
          @request="onRequest"
          square
          grid
          hide-header
        >
          <template v-slot:no-data="{ message }">
            <div class="full-width row flex-center q-gutter-sm q-pa-lg">
              <span>
                {{ message }}
              </span>
            </div>
          </template>
          <template v-slot:item="props">
            <div class="col-xs-6 col-sm-3 col-md-1">
              <q-img :src="baseUrl+props.row.brandCover" />
            </div>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios'
export default {
  name: 'UserList',
  data () {
    return {
      baseUrl: axios.defaults.baseURL,
      loading: false,
      pagination: {
        sortBy: '',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 10
      },
      columns: [
        { name: 'brandName', field: 'brandName' },
        { name: 'brandCover', field: 'brandCover' },
        { name: 'brandLogo', field: 'brandLogo' }
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

<template>
  <q-page class="my-page">
    <!-- <div class="row items-center justify-between">
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
    </div> -->

    <div class="my-page-body-none">
      <div class="menu-f">
        <div class="menu-f-sider">
          <div class="menu-f-sider-header row items-center justify-center">
            <q-btn
              label="新增菜单"
              color="primary"
              size="12px"
            />
          </div>
          <div class="menu-f-sider-body">
            <q-scroll-area class="fit">
              <div
                v-for="n in 100"
                :key="n"
                class="q-py-xs"
              >
                Lorem ipsum dolor sit amet, consectetur adipisicing
                elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
              </div>
            </q-scroll-area>
          </div>
        </div>
        <div class="menu-f-body">
          <div class="menu-f-body-header row items-center">
            Test
          </div>
          <div class="menu-f-body-content">
            <div
              v-for="n in 100"
              :key="n"
              class="q-py-xs"
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing
              elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="my-table">
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

          <template v-slot:top-left>

          </template>

          <template v-slot:no-data="{ message }">
            <div class="full-width row flex-center q-gutter-sm q-pa-lg">
              <span>
                {{ message }}
              </span>
            </div>
          </template>

          <template v-slot:body="props">
            <MenuTreeItem :lists="props" />
          </template>
        </q-table>
      </div> -->
    </div>
  </q-page>
</template>

<script>
import axios from 'axios'
// import MenuTreeItem from './MenuTreeItem.vue'
export default {
  name: 'MenuList',
  // components: {
  //   MenuTreeItem
  // },
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
      fixed: false,
      nodes: [
        {
          'id': 1,
          'name': 'text01',
          'children': [
            {
              'id': 3,
              'name': 'text03'
            }
          ]
        },
        {
          'id': 2,
          'name': 'text02'
        }
      ]
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
<style lang="sass" scoped>
.menu-f
  position: relative
  &-sider
    &-header
      border-right: 1px solid #eee
      border-bottom: 1px solid #eee
      position: fixed
      top: 50px
      width: 260px
      height: 48px
      background: #fff
    &-body
      border-right: 1px solid #eee
      position: fixed
      top: 98px
      bottom: 0
      width: 260px
      background: #fff
  &-body
    position: absolute
    top: 0
    left: 260px
    right: 0
    bottom: 0
    &-header
      height: 48px
      background: #fff
    &-content
      position: absolute
      top: 48px
      left: 0
      right: 0
      bottom: 0
</style>

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
          <q-breadcrumbs-el label="商品管理" />
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
          <q-route-tab to="/goods/list">商品列表</q-route-tab>
          <q-route-tab :to="`/goods/form`">新增商品</q-route-tab>
        </q-tabs>
      </div>
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

          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th auto-width />
              <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
              >
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>

          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td auto-width>
                <q-icon
                  color="primary"
                  size="18px"
                  @click="props.expand = !props.expand"
                  :name="props.expand ? 'arrow_drop_down' : 'arrow_right'"
                />
              </q-td>
              <q-td
                key="goodsName"
                :props="props"
              >
                <router-link
                  :to="`/goods/form/${props.row.id}`"
                  class="text-primary"
                >{{ props.row.goodsName }}</router-link>
              </q-td>
              <q-td
                key="categoryId"
                :props="props"
              >{{ props.row.categoryId|| '-' }}</q-td>
              <q-td
                key="marketPrice"
                :props="props"
              >{{ props.row.marketPrice|| '-' }}</q-td>
              <q-td
                key="storeCount"
                :props="props"
              >{{ props.row.storeCount }} </q-td>
              <q-td
                key="salesSum"
                :props="props"
              >
                <q-yes-or-no :value="props.row.brandRecommend" />
              </q-td>
              <q-td
                key="status"
                :props="props"
              >
                <!-- <q-sys-status :value="props.row.status" /> -->
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
            <q-tr
              v-show="props.expand"
              :props="props"
            >
              <q-td colspan="100%">
                <!-- <div class="text-left">{{ props.row }}</div> -->
                <div class="q-pa-md">
                  <div class="row q-col-gutter-md">
                    <div class="col-12 col-sm-6 col-md-4">
                      <q-desc-item title="登录名">
                        <q-chip
                          color="deep-orange"
                          text-color="white"
                          icon="fingerprint"
                        >
                          {{ props.row.goodsName }}
                        </q-chip>
                      </q-desc-item>
                    </div>
                    <div class="col-12 col-sm-6 col-md-4">
                      <q-desc-item title="账号昵称">
                        {{ props.row.nickname||'-' }}
                        <q-icon
                          class="q-ml-xs"
                          name="edit"
                          color="primary"
                        >
                          <q-popup-edit
                            v-model="props.row.nickname"
                            title="修改账号昵称"
                            @show="field='nickname'"
                            @save="onFieldValue"
                            buttons
                          >
                            <div style="width:350px;">
                              <q-input
                                outlined
                                dense
                                no-error-icon
                                v-model="props.row.nickname"
                              />
                            </div>
                          </q-popup-edit>
                        </q-icon>
                      </q-desc-item>
                    </div>
                    <div class="col-12 col-sm-6 col-md-4">
                      <q-desc-item title="账号ID">
                        {{ props.row.id }}
                      </q-desc-item>
                    </div>
                    <div class="col-12 col-sm-6 col-md-4">
                      <q-desc-item title="邮箱">
                        {{ props.row.email||'-' }}
                        <q-icon
                          class="q-ml-xs"
                          name="edit"
                          color="primary"
                        >
                          <q-popup-edit
                            v-model="props.row.email"
                            title="修改邮箱"
                            @show="field='email'"
                            @save="onFieldValue"
                            buttons
                          >
                            <div style="width:350px;">
                              <q-input
                                outlined
                                dense
                                no-error-icon
                                v-model="props.row.email"
                              />
                            </div>
                          </q-popup-edit>
                        </q-icon>
                      </q-desc-item>
                    </div>
                    <div class="col-12 col-sm-6 col-md-4">
                      <q-desc-item title="手机号码">
                        {{ props.row.mobile||'-' }}
                        <q-icon
                          class="q-ml-xs"
                          name="edit"
                          color="primary"
                        >
                          <q-popup-edit
                            v-model="props.row.mobile"
                            title="修改手机号码"
                            @show="field='mobile'"
                            @save="onFieldValue"
                            buttons
                          >
                            <div style="width:350px;">
                              <q-input
                                outlined
                                dense
                                no-error-icon
                                v-model="props.row.mobile"
                              />
                            </div>
                          </q-popup-edit>
                        </q-icon>
                      </q-desc-item>
                    </div>
                    <div class="col-12 col-sm-6 col-md-4">
                      <q-desc-item title="用户来源">
                        {{ props.row.createSource||'-' }}
                      </q-desc-item>
                    </div>
                    <div class="col-12 col-sm-6 col-md-4">
                      <q-desc-item title="注册时间">
                        {{ props.row.created }}
                      </q-desc-item>
                    </div>
                    <div class="col-12">
                      <q-desc-item title="备注">
                        {{ props.row.remark||'-' }}
                      </q-desc-item>
                    </div>
                  </div>
                </div>
              </q-td>
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
        { name: 'goodsName', label: '商品名称', align: 'left', field: 'goodsName', sortable: true, style: 'width: 150px' },
        { name: 'categoryId', label: '商品类型', align: 'left', field: 'categoryId', style: 'width: 80px' },
        { name: 'marketPrice', label: '商品市价', align: 'left', field: 'marketPrice', style: 'width: 80px' },
        { name: 'storeCount', label: '商品库存', align: 'left', field: 'storeCount', style: 'width: 200px' },
        { name: 'salesSum', label: '商品销量', align: 'left', field: 'salesSum', sortable: true, style: 'width: 80px' },
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
      await axios.get('/admin/goods', { params: { current: page, size: rowsPerPage, username: filter } }).then(response => {
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
    },
    onFieldValue () {

    }
  }
}
</script>

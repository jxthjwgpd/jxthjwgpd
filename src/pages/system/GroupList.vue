<template>
  <q-page class="q-pa-lg">
    <div class="row items-center justify-between q-mb-md">
      <div>
        <q-breadcrumbs align="left">
          <q-breadcrumbs-el
            label="系统管理"
            to="/system"
          />
          <q-breadcrumbs-el label="用户组" />
        </q-breadcrumbs>
        <div
          class="text-h6 q-mt-xs"
          v-if="$q.screen.gt.sm"
        >用户组</div>
      </div>
      <div
        class="q-gutter-sm"
        v-if="$q.screen.gt.sm"
      >
        <q-btn
          label="刷新"
          color="primary"
          outline
          @click="onRefresh"
        />
      </div>
    </div>
    <div class="q-mb-lg my-table">
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
            label="新增用户组"
            color="primary"
            @click="fixed=!fixed"
          />
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
            >{{ props.row.loginName }}</q-td>
            <q-td
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
                label="添加用户"
                @click="fixed=!fixed"
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
    <q-dialog v-model="fixed">
      <q-card>
        <q-card-section>
          <div class="text-h6">新增用户组</div>
        </q-card-section>

        <q-separator />

        <q-card-section
          style="max-height: 50vh; min-width:500px;"
          class="scroll q-gutter-y-md q-mt-none"
        >
          <q-item-label class="q-mt-none">用户组信息</q-item-label>
          <q-input
            outlined
            v-model="form.groupName"
            label="用户组名称"
            :dense="true"
          />
          <q-input
            outlined
            v-model="form.groupCode"
            label="用户组编码"
            :dense="true"
          />
          <q-item-label>其它</q-item-label>
          <q-input
            outlined
            v-model="form.remarks"
            type="textarea"
            label="备注说明"
            :dense="true"
          />
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn
            label="确认"
            color="primary"
            v-close-popup
          />
          <q-btn
            flat
            label="取消"
            color="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  name: 'UserList',
  data () {
    return {
      filter: '',
      loading: false,
      fixed: false,
      pagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 10
      },
      columns: [
        { name: 'loginName', label: '用户组名称', align: 'left', field: 'loginName', sortable: true },
        { name: 'remarks', label: '备注', align: 'left', field: 'remarks' },
        { name: 'createTime', label: '创建时间', align: 'center', field: 'createTime', sortable: true },
        { name: 'action', label: '操作', field: 'action', align: 'center', style: 'width: 100px' }
      ],
      data: [],
      original: [
        {
          'createBy': '100000001000000001',
          'createTime': '2018-09-26 09:49:23',
          'updateBy': '100000001000000001',
          'updateTime': '2020-01-20 01:11:50',
          'status': '0',
          'remarks': '开发者使用的最高级别管理员，主要用于开发和调试。',
          'userId': '100000001000000001',
          'loginName': 'system',
          'nickname': '超级管理员',
          'email': 'admin@aliyeye.com',
          'mobile': '13800000000',
          'phone': '',
          'sex': '2',
          'avatar': null,
          'sign': '',
          'lastLoginIp': '192.168.113.1',
          'lastLoginDate': '2020-01-20T01:11:50.000+0000',
          'freezeDate': null,
          'freezeCause': null,
          'mgrType': null,
          'domainId': '',
          'userType': null
        },
        {
          'createBy': '100000001000000001',
          'createTime': '2018-09-26 09:49:23',
          'updateBy': '100000001000000001',
          'updateTime': '2019-12-23 05:51:03',
          'status': '0',
          'remarks': '客户方使用的系统管理员，用于一些常用的基础数据配置。',
          'userId': '100000001000010000',
          'loginName': 'admin',
          'nickname': '系统管理员',
          'email': 'ruyangit@163.com',
          'mobile': '15888888888',
          'phone': '',
          'sex': null,
          'avatar': '/images/default.jpg',
          'sign': null,
          'lastLoginIp': '172.28.220.60',
          'lastLoginDate': '2019-05-29T09:56:23.000+0000',
          'freezeDate': null,
          'freezeCause': null,
          'mgrType': null,
          'domainId': '',
          'userType': null
        }
      ],
      selected: [],
      form: {
        loginName: null,
        nickname: null,
        teal: true
      }
    }
  },
  mounted () {
    // get initial data from server (1st page)
    this.onRefresh()
  },
  methods: {
    onRefresh () {
      this.onRequest({
        pagination: this.pagination,
        filter: undefined
      })
    },
    onRequest (props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      const filter = props.filter

      this.loading = true

      // emulate server
      setTimeout(() => {
        // update rowsCount with appropriate value
        this.pagination.rowsNumber = this.getRowsNumberCount(filter)

        // get all rows if "All" (0) is selected
        const fetchCount = rowsPerPage === 0 ? this.pagination.rowsNumber : rowsPerPage

        // calculate starting row of data
        const startRow = (page - 1) * rowsPerPage

        // fetch data from "server"
        const returnedData = this.fetchFromServer(startRow, fetchCount, filter, sortBy, descending)

        // clear out existing data and add new
        this.data.splice(0, this.data.length, ...returnedData)

        // don't forget to update local pagination object
        this.pagination.page = page
        this.pagination.rowsPerPage = rowsPerPage
        this.pagination.sortBy = sortBy
        this.pagination.descending = descending

        // ...and turn of loading indicator
        this.loading = false
      }, 1500)
    },

    // emulate ajax call
    // SELECT * FROM ... WHERE...LIMIT...
    fetchFromServer (startRow, count, filter, sortBy, descending) {
      const data = filter
        ? this.original.filter(row => row.loginName.includes(filter))
        : this.original.slice()

      // handle sortBy
      if (sortBy) {
        const sortFn = sortBy === 'desc'
          ? (descending
            ? (a, b) => (a.loginName > b.loginName ? -1 : a.loginName < b.loginName ? 1 : 0)
            : (a, b) => (a.loginName > b.loginName ? 1 : a.loginName < b.loginName ? -1 : 0)
          )
          : (descending
            ? (a, b) => (parseFloat(b[sortBy]) - parseFloat(a[sortBy]))
            : (a, b) => (parseFloat(a[sortBy]) - parseFloat(b[sortBy]))
          )
        data.sort(sortFn)
      }

      return data.slice(startRow, startRow + count)
    },

    // emulate 'SELECT count(*) FROM ...WHERE...'
    getRowsNumberCount (filter) {
      if (!filter) {
        return this.original.length
      }
      let count = 0
      this.original.forEach((treat) => {
        if (treat.loginName.includes(filter)) {
          ++count
        }
      })
      return count
    },
    getSelectedString () {
      return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.data.length}`
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
<style lang="sass">
</style>

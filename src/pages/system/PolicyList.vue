<template>
  <q-page class="q-pa-lg">
    <div class="row items-center justify-between q-mb-md">
      <div>
        <q-breadcrumbs align="left">
          <q-breadcrumbs-el
            label="系统管理"
            to="/system"
          />
          <q-breadcrumbs-el label="策略管理" />
        </q-breadcrumbs>
        <div
          class="text-h6 q-mt-xs"
          v-if="$q.screen.gt.sm"
        >策略管理</div>
      </div>
      <div
        class="q-gutter-sm"
        v-if="$q.screen.gt.sm"
      >
        <q-btn
          icon="loop"
          color="primary"
          outline
          dense
          :loading="loading"
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
            label="新增策略"
            color="primary"
            to="/system/policies/create"
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
              key="policyName"
              :props="props"
            >{{ props.row.policyName }}</q-td>
            <q-td
              class="text-line2-f"
              key="remarks"
              :props="props"
            >{{ props.row.remarks }}</q-td>
            <q-td
              key="policyType"
              :props="props"
            >{{ props.row.policyType }}</q-td>
            <q-td
              key="action"
              :props="props"
              class="q-gutter-xs"
            >
              <q-btn
                flat
                dense
                color="primary"
                label="添加策略"
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
  </q-page>
</template>

<script>
export default {
  name: 'PolicyList',
  data () {
    return {
      filter: '',
      loading: false,
      pagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 10
      },
      columns: [
        { name: 'policyName', label: '策略名称', align: 'left', field: 'policyName', sortable: true },
        { name: 'remarks', label: '备注', align: 'left', field: 'remarks' },
        { name: 'policyType', label: '策略类型', align: 'left', field: 'policyType', sortable: true },
        { name: 'action', label: '操作', field: 'action', align: 'center', style: 'width: 100px' }
      ],
      data: [],
      selected: [],
      fixed: false
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
      await this.$store.dispatch('system/getPolicyList', { current: page, size: rowsPerPage }).then(data => {
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

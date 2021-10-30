<template>
  <div class="my-table">
    <q-table
      :data="data"
      :columns="columns"
      row-key="groupId"
      :loading="loading"
      @request="onRequest"
      binary-state-sort
      square
      :card-style="{ boxShadow: 'none', padding: '0 10px' }"
      :table-header-style="{ backgroundColor: '#eeeeee'}"
    >
      <template v-slot:top-left>
        <q-btn
          label="添加到用户组"
          color="primary"
          @click="fixed=!fixed"
        />
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
            key="groupName"
            :props="props"
          >{{ props.row.groupName }}</q-td>
          <q-td
            class="text-line2-f"
            key="remarks"
            :props="props"
          >{{ props.row.remarks }}</q-td>
          <q-td
            key="action"
            :props="props"
            class="q-gutter-xs"
          >
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
</template>

<script>
export default {
  name: 'UserGroup',
  data () {
    return {
      loading: false,
      userId: this.$route.params.userId,
      columns: [
        { name: 'groupName', label: '用户组名称', align: 'left', field: 'groupName', sortable: true },
        { name: 'remarks', label: '备注', align: 'left', field: 'remarks' },
        { name: 'action', label: '操作', field: 'action', align: 'center', style: 'width: 100px' }
      ],
      data: []
    }
  },
  mounted () {
    this.onRequest()
  },
  methods: {
    onRefresh () {
      this.onRequest({})
    },
    async onRequest () {
      this.loading = true
      await this.$store.dispatch('system/getGroupsForUser', { userId: this.userId }).then(data => {
        this.data = data
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

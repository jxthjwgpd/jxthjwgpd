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
          <q-breadcrumbs-el label="角色组" />
        </q-breadcrumbs>
        <div class="my-page-header-subtitle">
          <router-link
            to="/system/admin/roles"
            class="my-page-header-goback"
          >
            <q-icon
              name="arrow_back"
              size="sm"
              class="text-bold text-dark"
            />
          </router-link>
          权限配置
        </div>
      </div>
    </div>

    <div class="my-page-body">
      <q-card
        flat
        class="q-pa-xl"
      >
        <q-form class="my-form">
          <div class="row">
            <div class="col-2 q-label">
              <label for="roleName">
                角色名
              </label>
            </div>
            <div class="col-8 q-value">
              {{role.roleName}}
            </div>
          </div>
          <div class="row">
            <div class="col-2 q-label">
              <label for="remark">
                备注
              </label>
            </div>
            <div class="col-8 q-value">
              {{role.remark||'-'}}
            </div>
          </div>
          <div class="row">
            <div class="col-2 q-label">
              <label for="created">
                创建时间
              </label>
            </div>
            <div class="col-8 q-value">
              {{role.created}}
            </div>
          </div>
          <div class="row">
            <div class="col-2 q-label">
              <label for="menu">
                设置权限
              </label>
            </div>
            <div class="col-5">
              <q-tree
                :nodes="treeData"
                node-key="id"
                label-key="name"
                :tick-strategy="'strict'"
                :ticked.sync="ticked"
                :expanded.sync="expanded"
                default-expand-all
              />
            </div>
          </div>
          <div class="row q-mt-lg">
            <div class="col offset-2">
              <q-btn
                color="primary"
                label="保存设置"
                @click="onSubmit"
              />
              <q-btn
                label="返回"
                class="q-ml-sm"
                to="/system/admin/roles"
              />
            </div>
          </div>
        </q-form>
        <q-inner-loading :showing="loading">
          <q-spinner-hourglass
            size="sm"
            color="primary"
          />
        </q-inner-loading>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios'
export default {
  name: 'RoleMenuEdit',
  data () {
    return {
      loading: false,
      treeData: [],
      ticked: [],
      expanded: ['1'],
      role: {}
    }
  },
  mounted () {
    this.onRequest()
  },
  methods: {
    async onRequest (props) {
      this.loading = true
      await axios.get('/admin/roles/detail', { params: { id: this.$route.params.id } }).then(response => {
        const { code, data } = response.data
        if (code === '200' && data) {
          this.role = data.role
          this.ticked = data.menuIds
        }
      }).catch(error => {
        console.error(error)
      })
      await axios.get('/admin/menus/tree', {}).then(response => {
        const { code, data } = response.data
        if (code === '200' && data) {
          this.treeData = data
        }
      }).catch(error => {
        console.error(error)
      })
      setTimeout(() => {
        this.loading = false
      }, 200)
    },
    async onSubmit () {
      this.loading = true
      await axios.post('/admin/roles/menu', {
        roleId: this.role.id,
        menuIds: this.ticked
      }).then(response => {
        const { code, message } = response.data
        if (code === '200') {
          this.$q.notify({
            type: 'positive',
            message: '保存设置成功！'
          })
        } else {
          this.$q.notify({
            message
          })
        }
      }).catch(error => {
        console.error(error)
      })
      setTimeout(() => {
        this.loading = false
      }, 500)
    }
  }
}
</script>

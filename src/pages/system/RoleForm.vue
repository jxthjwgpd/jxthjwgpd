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
            label="系统权限"
            to="/system"
          />
          <q-breadcrumbs-el label="角色管理" />
        </q-breadcrumbs>
      </div>
    </div>
    <div class="my-page-body">
      <div class="my-tabs">
        <q-tabs
          narrow-indicator
          align="left"
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
        >
          <q-route-tab to="/system/roles">角色列表</q-route-tab>
          <q-route-tab :to="`/system/roles/form${form.id!=null?'/'+form.id:''}`">{{form.id!=null?'编辑':'新增'}}角色</q-route-tab>
        </q-tabs>
      </div>
      <q-card
        flat
        class="fit "
      >
        <div class="container">
          <q-form
            class="my-form gutter"
            @submit="onSubmit"
          >
            <q-card-section class="q-pa-xl">
              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-4 col-lg-4">
                  <label for="roleName"> 角色</label>
                  <q-input
                    outlined
                    dense
                    no-error-icon
                    v-model.trim="form.roleName"
                    placeholder="请输入角色"
                    :rules="[ val => val && val.length > 0 || '请设置角色']"
                    class="q-mt-sm"
                  >
                  </q-input>
                </div>
                <div class="col-12">
                  <label for="roleNameCn"> 角色名称 </label>
                  <q-input
                    outlined
                    dense
                    no-error-icon
                    v-model.trim="form.roleNameCn"
                    placeholder="请输入角色名称"
                    class="q-mt-sm"
                  >
                  </q-input>
                </div>
                <div class="col-12">
                  <label for="roleType"> 角色类型 </label>
                  <div class="q-gutter-sm q-mt-xs">
                    <q-radio
                      v-model="form.roleType"
                      val="1"
                      label="员工角色"
                      dense
                    />
                  </div>
                </div>
                <div class="col-12">
                  <label for=""> 权限分配 </label>
                  <div
                    class="q-mt-sm"
                    style="max-width:300px"
                  >
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
                <div class="col-12">
                  <label for="remark"> 备注 </label>
                  <div class="q-mt-sm">
                    <q-input
                      dense
                      outlined
                      no-error-icon
                      v-model="form.remark"
                      autogrow
                      :input-style="{ minHeight: '60px' }"
                    />
                  </div>
                </div>
              </div>
            </q-card-section>
            <q-separator />
            <q-card-actions class="q-pa-xl">
              <q-btn
                color="primary"
                class="wd-80"
                type="submit"
              >保存</q-btn>
              <q-btn
                class="wd-80"
                type="reset"
              >重置</q-btn>
              <q-space />
              <q-btn
                color="negative"
                class="wd-80"
                v-if="form.id"
                v-del:goback="{id:form.id, url:'/admin/role-delete'}"
              >删除</q-btn>
            </q-card-actions>
          </q-form>
        </div>
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
  name: 'RoleForm',
  data () {
    return {
      loading: false,
      treeData: [],
      ticked: [],
      expanded: ['1'],
      form: {
        id: this.$route.params.id,
        roleType: '1'
      },
      oldRoleName: null
    }
  },
  mounted () {
    if (this.form.id) {
      this.onMenuTree()
      this.onRequest()
    } else {
      this.onMenuTree()
    }
  },
  methods: {
    async onRequest () {
      this.loading = true
      await axios.get('/admin/role-detail', { params: { id: this.form.id } }).then(response => {
        const { code, data } = response.data
        if (code === '200' && data) {
          this.form = data.role
          this.oldRoleName = this.form.roleName
          this.ticked = data.menuIds
        }
      }).catch(error => {
        console.error(error)
      })
      setTimeout(() => {
        this.loading = false
      }, 200)
    },
    async onMenuTree () {
      await axios.get('/admin/menu-tree', {}).then(response => {
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
      delete this.form.created
      delete this.form.status
      this.form.oldRoleName = this.oldRoleName
      this.form.menuIds = this.ticked
      await axios.post(`/admin/role${this.form.id ? '-update' : 's'}`, this.form).then(response => {
        const { code, message, data } = response.data
        if (code === '200' && data) {
          this.$q.notify({
            type: 'positive',
            message: '保存成功.'
          })

          this.$router.go(-1)
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
      }, 200)
    }
  }
}
</script>

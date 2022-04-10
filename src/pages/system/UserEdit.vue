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
          <q-breadcrumbs-el label="用户管理" />
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
          <q-route-tab to="/system/users">用户列表</q-route-tab>
          <q-route-tab :to="`/system/users/edit/${form.id}`">用户详情</q-route-tab>
        </q-tabs>
      </div>
      <q-card
        flat
        class="fit "
      >
        <div class="container">
          <q-card-section class="q-pa-xl">
            <div class="row q-col-gutter-md">
              <div class="col-12 col-sm-6 col-md-4">
                <q-desc-item title="登录名">
                  <q-chip
                    color="deep-orange"
                    text-color="white"
                    icon="fingerprint"
                  >
                    {{ form.username }}
                  </q-chip>
                </q-desc-item>
              </div>
              <div class="col-12 col-sm-6 col-md-4">
                <q-desc-item title="账号昵称">
                  {{ form.nickname||'-' }}
                  <q-icon
                    class="q-ml-xs"
                    name="edit"
                    color="primary"
                  >
                    <q-popup-edit
                      v-model="form.nickname"
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
                          v-model="form.nickname"
                        />
                      </div>
                    </q-popup-edit>
                  </q-icon>
                </q-desc-item>
              </div>
              <div class="col-12 col-sm-6 col-md-4">
                <q-desc-item title="账号ID">
                  {{ form.id }}
                </q-desc-item>
              </div>
              <div class="col-12 col-sm-6 col-md-4">
                <q-desc-item title="邮箱">
                  {{ form.email||'-' }}
                  <q-icon
                    class="q-ml-xs"
                    name="edit"
                    color="primary"
                  >
                    <q-popup-edit
                      v-model="form.email"
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
                          v-model="form.email"
                        />
                      </div>
                    </q-popup-edit>
                  </q-icon>
                </q-desc-item>
              </div>
              <div class="col-12 col-sm-6 col-md-4">
                <q-desc-item title="手机号码">
                  {{ form.mobile||'-' }}
                  <q-icon
                    class="q-ml-xs"
                    name="edit"
                    color="primary"
                  >
                    <q-popup-edit
                      v-model="form.mobile"
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
                          v-model="form.mobile"
                        />
                      </div>
                    </q-popup-edit>
                  </q-icon>
                </q-desc-item>
              </div>
              <div class="col-12 col-sm-6 col-md-4">
                <q-desc-item title="用户来源">
                  {{ form.createSource||'-' }}
                </q-desc-item>
              </div>
              <div class="col-12 col-sm-6 col-md-4">
                <q-desc-item title="注册时间">
                  {{ form.created }}
                </q-desc-item>
              </div>
              <div class="col-12">
                <q-desc-item title="备注">
                  {{ form.remark||'-' }}
                </q-desc-item>
              </div>
            </div>
            <div class="row q-col-gutter-md q-mt-xs">
              <div class="col-12 col-sm-6 col-md-4">
                <q-desc-item title="最后登录时间">
                  {{ form.lastLoginDate }}
                </q-desc-item>
              </div>
              <div class="col-12 col-sm-6 col-md-4">
                <q-desc-item title="最后登录IP">
                  {{ form.lastLoginIp }}
                </q-desc-item>
              </div>
            </div>
          </q-card-section>
        </div>
        <q-inner-loading :showing="loading">
          <q-spinner-hourglass
            size="sm"
            color="primary"
          />
        </q-inner-loading>
      </q-card>
      <q-card
        flat
        class="fit q-mt-md"
      >
        <div class="container">
          <q-card-section class="q-pa-xl">
            <q-tabs
              align="left"
              narrow-indicator
              v-model="tab"
            >
              <q-tab
                label="用户角色"
                name="1"
              />
            </q-tabs>
            <div class="my-table q-pt-sm">
              <q-markup-table
                flat
                class="q-table__card-f"
              >
                <thead>
                  <tr>
                    <th class="text-left wd-200">角色</th>
                    <th class="text-left wd-200">角色名称</th>
                    <th class="text-left">备注</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in roleList"
                    :key="item.id"
                  >
                    <td class="text-left">{{item.roleName}}</td>
                    <td class="text-left">{{item.roleNameCn}}</td>
                    <td class="text-left">{{item.remark}}</td>
                  </tr>
                </tbody>
              </q-markup-table>
            </div>
          </q-card-section>

        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios'
export default {
  name: 'UserEdit',
  data () {
    return {
      loading: false,
      isa: false,
      tab: '1',
      roleList: [],
      field: null,
      form: {
        id: this.$route.params.id
      }
    }
  },
  mounted () {
    if (this.form.id) {
      this.onRequest()
    }
  },
  methods: {
    async onRequest () {
      this.loading = true
      await axios.get('/admin/user-detail', { params: { id: this.form.id } }).then(response => {
        const { code, data } = response.data
        if (code === '200' && data) {
          this.form = data.user
          this.isa = data.isa
        }
      }).catch(error => {
        console.error(error)
      })
      await axios.get('/admin/user-roles', { params: { userId: this.form.id } }).then(response => {
        const { code, data } = response.data
        if (code === '200' && data) {
          this.roleList = data
        }
      }).catch(error => {
        console.error(error)
      })
      setTimeout(() => {
        this.loading = false
      }, 200)
    },
    async onFieldValue (value, initialValue) {
      const params = {
        id: this.form.id,
        name: this.field,
        value
      }
      await axios.post(`/admin/user-field`, params).then(response => {
        const { code, message, data } = response.data
        if (code === '200' && data) {
          this.$q.notify({
            type: 'positive',
            message: '保存成功.'
          })
        } else {
          this.$q.notify({
            message
          })
        }
      }).catch(error => {
        console.error(error)
      })
    }
  }
}
</script>

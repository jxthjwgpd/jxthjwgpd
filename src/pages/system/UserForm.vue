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
          <q-route-tab :to="`/system/users/form${form.id!=null?'/'+form.id:''}`">{{form.id!=null?'编辑':'新增'}}用户</q-route-tab>
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
              <q-stepper
                v-model="step"
                ref="stepper"
                color="primary"
                animated
                flat
              >
                <q-step
                  :name="1"
                  title="选择类型"
                  icon="settings"
                  :done="step > 1"
                >
                  <q-list class="shadow-3">
                    <q-item
                      tag="label"
                      v-ripple
                    >
                      <q-item-section
                        avatar
                        top
                      >
                        <q-radio
                          v-model="form.userType"
                          val="1"
                        />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>普通用户</q-item-label>
                        <q-item-label caption>用于访问系统基本功能和基本信息的用户。 </q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-step>

                <q-step
                  :name="2"
                  title="填写用户基本信息"
                  icon="create_new_folder"
                  :done="step > 2"
                >
                  <div class="row q-col-gutter-md">
                    <div class="col-12 col-md-4 col-lg-4">
                      <label for="username"> 登录账号</label>
                      <q-input
                        outlined
                        dense
                        no-error-icon
                        v-model.trim="form.username"
                        placeholder="请输入登录账号"
                        :rules="[ val => val && val.length > 0 || '请设置登录账号']"
                        class="q-mt-sm"
                      >
                      </q-input>
                    </div>
                    <div class="col-12 col-md-4 col-lg-4">
                      <label for="nickname"> 用户昵称</label>
                      <q-input
                        outlined
                        dense
                        no-error-icon
                        v-model.trim="form.nickname"
                        placeholder="请输入用户昵称"
                        class="q-mt-sm"
                      >
                      </q-input>
                    </div>
                  </div>
                  <div class="row q-col-gutter-md q-mt-sm">
                    <div class="col-12 col-md-4 col-lg-4">
                      <label for="password"> 登录密码</label>
                      <q-input
                        outlined
                        dense
                        no-error-icon
                        type="password"
                        v-model.trim="form.password"
                        placeholder="请输入密码"
                        :rules="[ val => val && val.length > 0 || '请设置登录密码']"
                        class="q-mt-sm"
                      >
                      </q-input>
                    </div>
                  </div>
                  <div class="row q-col-gutter-md q-mt-sm">
                    <div class="col-12 col-md-4 col-lg-4">
                      <label for="cpassword"> 再次输入密码</label>
                      <q-input
                        outlined
                        dense
                        no-error-icon
                        v-model.trim="cpassword"
                        type="password"
                        placeholder="请输入确认密码"
                        :rules="[ val => val && val.length > 0 || '请再次输入你的密码', val => val && val === form.password || '两次密码输入不一致' ]"
                        class="q-mt-sm"
                      >
                      </q-input>
                    </div>
                  </div>
                  <div class="row q-col-gutter-md q-mt-sm">
                    <div class="col-12 col-md-4 col-lg-4">
                      <label for="mobile"> 手机号码</label>
                      <q-input
                        outlined
                        dense
                        no-error-icon
                        v-model.trim="form.mobile"
                        placeholder="请输入手机号码"
                        class="q-mt-sm"
                      >
                      </q-input>
                    </div>
                    <div class="col-12 col-md-4 col-lg-4">
                      <label for="email"> 电子邮箱</label>
                      <q-input
                        outlined
                        dense
                        no-error-icon
                        v-model.trim="form.email"
                        placeholder="请输入电子邮箱"
                        class="q-mt-sm"
                      >
                        <template v-slot:append>
                          <q-icon name="mail_outline" />
                        </template>
                      </q-input>
                    </div>
                  </div>
                  <div class="col-12 q-mt-md">
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
                </q-step>

                <q-step
                  :name="3"
                  title="设置用户权限"
                  icon="assignment"
                  :done="step > 3"
                >
                  <div class="row">
                    <div class="col-12">
                      <label for="volume"> 选择角色</label>
                      <div class="q-mt-sm">
                        <div class="row q-col-gutter-md">
                          <div class="col-12 col-md-8">
                            <q-card
                              flat
                              bordered
                            >
                              <q-card-section>
                                角色名称/描述 <span class="text-primary">可选（{{roleList.length}}）</span>
                              </q-card-section>
                              <q-separator />
                              <q-list
                                class="scroll"
                                style="height: 260px;"
                              >
                                <q-item
                                  tag="label"
                                  v-ripple
                                  v-for="(item, index) in roleList"
                                  :key="index"
                                >
                                  <q-item-section side>
                                    <q-checkbox
                                      dense
                                      v-model="form.roleIds"
                                      :val="item.id"
                                    />
                                  </q-item-section>
                                  <q-item-section>
                                    {{item.roleName}}
                                    <q-item-label caption>{{item.roleNameCn||'--'}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section side>
                                    {{ roleType[item.roleType] }}
                                  </q-item-section>
                                </q-item>
                              </q-list>
                            </q-card>
                          </div>
                          <div class="col-12 col-sm-4">
                            <q-card
                              flat
                              bordered
                            >
                              <q-card-section>
                                角色名称<span class="text-primary"> 已选（{{selectedRoles.length}}）</span>
                              </q-card-section>
                              <q-separator />
                              <q-list
                                class="scroll"
                                style="height: 260px;"
                              >
                                <div
                                  v-for="item in selectedRoles"
                                  :key="item.id"
                                >
                                  <q-item
                                    tag="label"
                                    v-ripple
                                  >
                                    <q-item-section>
                                      {{item.roleName}}
                                      <q-item-label caption>{{item.roleNameCn||'--'}}</q-item-label>
                                    </q-item-section>
                                    <q-item-section side>
                                      <q-icon
                                        name="clear"
                                        size="14px"
                                        color="primary"
                                        @click="clearSelected(item.id)"
                                      />
                                    </q-item-section>
                                  </q-item>
                                </div>
                                <div
                                  v-if="selectedRoles.length==0"
                                  style="line-height:45px; text-align:center;"
                                >
                                  暂无数据
                                </div>
                              </q-list>
                            </q-card>
                          </div>
                          <q-inner-loading :showing="loading">
                            <q-spinner-hourglass
                              size="sm"
                              color="primary"
                            />
                          </q-inner-loading>
                        </div>
                      </div>
                    </div>
                  </div>
                </q-step>

                <q-step
                  :name="4"
                  title="查看权限"
                  icon="add_comment"
                  :done="step > 4"
                >
                  <div class="row q-col-gutter-md">
                    <div class="col-12">
                      <label for=""> 用户权限 </label>
                      <div
                        class="q-mt-sm"
                        style="max-width:300px"
                      >
                        <q-tree
                          :nodes="treeData"
                          node-key="id"
                          label-key="name"
                        />
                      </div>
                    </div>
                  </div>

                </q-step>

                <template v-slot:navigation>
                  <q-stepper-navigation>
                    <q-btn
                      type="submit"
                      color="primary"
                      label="下一步"
                      class="wd-80"
                      v-if="step > 1 && step < 4"
                    />
                    <q-btn
                      @click="step === 4 ? $router.push({path:'/system/users'}):$refs.stepper.next()"
                      color="primary"
                      :label="step === 4 ? '完成' : '下一步'"
                      class="wd-80"
                      v-else
                    />
                    <q-btn
                      v-if="step > 1 && step < 3"
                      @click="$refs.stepper.previous()"
                      label="返回"
                      class="wd-80 q-ml-sm"
                    />
                  </q-stepper-navigation>
                </template>
              </q-stepper>
            </q-card-section>
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
import { roleType } from '../../assets/dict.js'
export default {
  name: 'UserForm',
  data () {
    return {
      baseUrl: axios.defaults.baseURL,
      loading: false,
      step: 1,
      cpassword: null,
      roleList: [],
      roleType,
      treeData: [],
      form: {
        id: this.$route.params.id,
        userType: '1',
        roleIds: []
      }
    }
  },
  computed: {
    selectedRoles () {
      return this.roleList.filter(e => this.form.roleIds.find(a => a === e.id))
    }
  },
  watch: {
    step () {
      if (this.step === 3) {
        this.onRoleList()
      } else if (this.step === 4) {
        this.onMenuTreeList()
      }
    }
  },
  methods: {
    async onMenuTreeList () {
      if (this.form.id) {
        this.loading = true
        await axios.get('/admin/user-menu-tree', { params: { userId: this.form.id } }).then(response => {
          const { code, data } = response.data
          if (code === '200' && data) {
            this.treeData = data.menuList
          }
        }).catch(error => {
          console.error(error)
        })
        setTimeout(() => {
          this.loading = false
        }, 200)
      }
    },
    async onRoleList () {
      const params = {}
      await axios.get('/admin/role-list', params).then(response => {
        const { code, data } = response.data
        if (code === '200' && data) {
          this.roleList = data
        }
      }).catch(error => {
        console.error(error)
      })
    },
    clearSelected (id) {
      this.form.roleIds.splice(this.form.roleIds.indexOf(id), 1)
    },
    async onSubmit (evt) {
      this.loading = true
      delete this.form.created
      delete this.form.status
      console.log(this.form)
      if (this.step === 2) {
        await axios.post(`/admin/user${this.form.id ? '-update' : 's'}`, this.form).then(response => {
          const { code, message, data } = response.data
          if (code === '200' && data) {
            this.$refs.stepper.next()
            this.form.id = data.userId
          } else {
            this.$q.notify({
              message
            })
          }
        }).catch(error => {
          console.error(error)
        })
      } else if (this.step === 3) {
        const params = {
          userId: this.form.id,
          roleIds: this.form.roleIds
        }
        await axios.post(`/admin/user-roles`, params).then(response => {
          const { code, message, data } = response.data
          if (code === '200' && data) {
            this.$refs.stepper.next()
          } else {
            this.$q.notify({
              message
            })
          }
        }).catch(error => {
          console.error(error)
        })
      }
      setTimeout(() => {
        this.loading = false
      }, 200)
    }
  }
}
</script>

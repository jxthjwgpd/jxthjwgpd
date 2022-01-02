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
            label="用户列表"
            to="/system/admin/users"
          />
          <q-breadcrumbs-el label="用户" />
        </q-breadcrumbs>
        <div class="my-page-header-subtitle">
          <router-link
            to="/system/admin/users"
            class="my-page-header-goback"
          >
            <q-icon
              name="arrow_back"
              size="sm"
              class="text-bold text-dark"
            />
          </router-link>
          用户信息
        </div>
      </div>
    </div>

    <div class="my-page-body">
      <q-card
        flat
        class="q-pb-md"
      >
        <q-card-section class="q-gutter-y-md q-mt-none">
          <div class="row no-wrap items-center">
            <q-item-label class="q-mt-none text-h6">基本信息</q-item-label>
            <q-space />
            <q-btn
              outline
              color="primary"
              size="sm"
              label="编辑"
              @click="fixedUserDetail=!fixedUserDetail"
            />
            <q-btn
              outline
              color="negative"
              size="sm"
              label="删除"
              class="q-ml-xs"
              v-if="!users.isa"
              @click="onUserDel(users.user)"
            />
          </div>
          <div class="row">
            <div class="col-6">
              <q-desc-item title="用户账号">
                {{ users.user.username }}
              </q-desc-item>
            </div>
            <div class="col-6">
              <q-desc-item title="用户ID">
                {{ users.user.id}}
              </q-desc-item>
            </div>
            <div class="col-6">
              <q-desc-item title="用户昵称">
                {{  users.user.nickname || '-' }}
              </q-desc-item>
            </div>
            <div class="col-6">
              <q-desc-item title="创建时间">
                {{  users.user.created }}
              </q-desc-item>
            </div>
            <div class="col-12">
              <q-desc-item title="备注">
                {{  users.user.remark || '-'}}
              </q-desc-item>
            </div>
          </div>
          <q-separator />
          <q-item-label class="text-h6">联系方式</q-item-label>
          <div class="row">
            <div class="col-6">
              <q-desc-item title="姓名">
                {{  users.user.realname || '-' }}
              </q-desc-item>
            </div>
            <div class="col-6">
              <q-desc-item title="身份">
                {{ users.user.identity || '-'}}
              </q-desc-item>
            </div>
            <div class="col-6">
              <q-desc-item title="邮箱">
                {{ users.user.email || '-'}}
              </q-desc-item>
            </div>
            <div class="col-6">
              <q-desc-item title="电话号码">
                {{ users.user.mobile || '-'}}
              </q-desc-item>
            </div>
            <div class="col-6">
              <q-desc-item title="来源">
                {{ users.user.createSource || '-'}}
              </q-desc-item>
            </div>
          </div>
        </q-card-section>

        <!-- <q-card-actions class="q-pl-md">
          <q-btn
            label="详情编辑"
            color="primary"
            class="wd-80"
            :loading="loading"
          />
        </q-card-actions> -->

        <q-inner-loading :showing="loading">
          <q-spinner-hourglass
            size="sm"
            color="primary"
          />
        </q-inner-loading>
      </q-card>
      <q-card
        flat
        class="q-mt-md q-pb-md"
      >
        <q-card>
          <q-tabs
            v-model="tab"
            narrow-indicator
            align="left"
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
          >
            <q-tab
              name="roles"
              label="角色组"
            />
            <q-tab
              name="menus"
              label="用户权限"
            />
          </q-tabs>

          <q-separator />

          <q-tab-panels
            v-model="tab"
            animated
          >
            <q-tab-panel
              name="roles"
              class="my-table"
            >
              <div
                class="q-mb-sm"
                v-if="!users.isa"
              >
                <q-btn
                  outline
                  color="primary"
                  size="sm"
                  label="配置角色组"
                  @click="fixed=!fixed"
                />
              </div>
              <q-markup-table
                flat
                class="q-table__card-f"
              >
                <thead>
                  <tr>
                    <th class="text-left wd-200">角色名称</th>
                    <th class="text-left">备注</th>
                    <th
                      class="text-right"
                      v-if="!users.isa"
                    >操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in userRoleList"
                    :key="item.id"
                  >
                    <td class="text-left">{{item.roleName}}</td>
                    <td class="text-left">{{item.remark}}</td>
                    <td
                      class="text-right"
                      v-if="!users.isa"
                    >
                      <a
                        class="text-primary"
                        href="javascript:;"
                        @click="onUserRoleDel(item)"
                      >删除</a>
                    </td>
                  </tr>
                </tbody>
              </q-markup-table>
            </q-tab-panel>

            <q-tab-panel name="menus">
              <q-tree
                :nodes="treeData"
                node-key="id"
                label-key="name"
              />
            </q-tab-panel>
          </q-tab-panels>

        </q-card>
      </q-card>
    </div>
    <user-role-edit
      v-model="fixed"
      :user="users.user"
      v-on:refresh="onRefresh"
    />
    <user-detail-edit
      v-model="fixedUserDetail"
      :user="users.user"
      v-on:refresh="onUserDetail"
    />

  </q-page>
</template>

<script>
import UserRoleEdit from './UserRoleEdit.vue'
import UserDetailEdit from './UserDetailEdit.vue'
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
  name: 'UserCreate',
  components: {
    UserRoleEdit,
    UserDetailEdit
  },
  data () {
    return {
      loading: false,
      tab: 'roles',
      users: {
        username: this.$route.params.username,
        user: {}
      },
      treeData: [],
      fixed: false,
      fixedUserDetail: false
    }
  },
  computed: {
    ...mapGetters({
      userRoleList: 'system/UserRoleList'
    })
  },
  mounted () {
    this.onRequest()
  },
  methods: {
    async onRequest () {
      this.loading = true
      await this.onUserDetail()
      await this.$store.dispatch('system/UserRoleList', { username: this.users.username })

      await axios.get('/admin/users/menu', { params: { userId: this.users.user.id } }).then(response => {
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
    },
    onUserDetail () {
      this.$store.dispatch('system/UserDetail', this.users.username).then(data => {
        if (data.user) {
          this.users = {
            ...data,
            username: data.user.username
          }
        }
      }).catch(error => {
        console.error(error)
      })
    },
    onRefresh () {
      this.$store.dispatch('system/UserRoleList', { userId: this.users.user.id })
    },
    onUserDel (user) {
      this.$q.dialog({
        title: this.$t('dialog.delete.title'),
        message: this.$t('dialog.delete.message'),
        cancel: true
      }).onOk(() => {
        this.$store.dispatch('system/DeleteUser', user.id).then(data => {
          this.$router.push({ path: '/system/admin/users' })
        }).catch(error => {
          console.log(error)
        })
      })
    },
    onUserRoleDel (userRole) {
      this.$q.dialog({
        title: this.$t('dialog.delete.title'),
        message: this.$t('dialog.delete.message'),
        cancel: true
      }).onOk(() => {
        this.$store.dispatch('system/DeleteUserRole', { ...userRole })
      })
    }
  }
}
</script>

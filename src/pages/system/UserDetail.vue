<template>
  <q-page class="my-page">
    <div class="row items-center justify-between">
      <div class="my-page-header q-pb-none">
        <q-breadcrumbs align="left">
          <q-breadcrumbs-el
            label="首页"
            to=""
          />
          <q-breadcrumbs-el
            label="管理员"
            to=""
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
          <q-item-label class="q-mt-none text-h6">基本信息</q-item-label>
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
                v-if="users.isa==='0'"
              >
                <q-btn
                  outline
                  color="primary"
                  size="sm"
                  label="管理角色"
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
              <div class="text-h6">Policy</div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </q-tab-panel>
          </q-tab-panels>

        </q-card>
      </q-card>
    </div>
    <user-role-edit
      v-model="fixed"
      :userId="users.user.id"
    />
  </q-page>
</template>

<script>
import UserRoleEdit from './UserRoleEdit.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'UserCreate',
  components: {
    UserRoleEdit
  },
  data () {
    return {
      loading: false,
      tab: 'roles',
      users: {
        username: this.$route.params.username,
        user: {}
      },
      fixed: false
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
      await this.$store.dispatch('system/UserDetailInfo', this.users.username).then(data => {
        if (data.user) {
          this.users = {
            ...data,
            username: data.user.username
          }
        }
      }).catch(error => {
        console.error(error)
      })
      await this.$store.dispatch('system/UserRoleList', { username: this.users.username })
      setTimeout(() => {
        this.loading = false
      }, 500)
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

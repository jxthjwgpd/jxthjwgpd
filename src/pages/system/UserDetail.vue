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
          <q-item-label class="q-mt-none">用户账号基本信息</q-item-label>
          <div class="row">
            <div class="col-6">
              <q-desc-item title="用户名">
                {{ user.loginName }}
              </q-desc-item>
            </div>
            <div class="col-6">
              <q-desc-item title="USER_ID">
                {{user.userId}}
              </q-desc-item>
            </div>
            <div class="col-6">
              <q-desc-item title="用户昵称">
                {{ user.nickname }}
              </q-desc-item>
            </div>
            <div class="col-6">
              <q-desc-item title="创建时间">
                {{ user.createTime }}
              </q-desc-item>
            </div>
            <div class="col-12">
              <q-desc-item title="备注">
                {{ user.remarks }}
              </q-desc-item>
            </div>
          </div>
          <q-separator />
          <q-item-label>联系方式</q-item-label>
          <div class="row">
            <div class="col-6">
              <q-desc-item title="邮箱">
                {{ user.email }}
              </q-desc-item>
            </div>
            <div class="col-6">
              <q-desc-item title="手机号码">
                {{user.mobile}}
              </q-desc-item>
            </div>
            <div class="col-6">
              <q-desc-item title="电话">
                {{user.phone}}
              </q-desc-item>
            </div>
          </div>
        </q-card-section>

        <q-card-actions class="q-pl-md">
          <q-btn
            label="详情编辑"
            color="primary"
            class="wd-80"
            :loading="loading"
          />
        </q-card-actions>

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
            dense
            narrow-indicator
            align="left"
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
          >
            <q-tab
              name="group"
              label="用户组"
            />
            <q-tab
              name="policy"
              label="权限"
            />
            <q-tab
              name="project"
              label="项目"
            />
            <q-tab
              name="application"
              label="应用"
            />
            <q-tab
              name="setting"
              label="设置"
            />
          </q-tabs>

          <q-separator />

          <q-tab-panels
            v-model="tab"
            animated
          >
            <q-tab-panel
              name="group"
              class="q-pa-none"
            >
              <!-- <user-group /> -->
            </q-tab-panel>

            <q-tab-panel name="policy">
              <div class="text-h6">Policy</div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </q-tab-panel>

            <q-tab-panel name="project">
              <div class="text-h6">Project</div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </q-tab-panel>
            <q-tab-panel name="application">
              <div class="text-h6">Appliction</div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </q-tab-panel>
            <q-tab-panel name="setting">
              <div class="text-h6">Setting</div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </q-tab-panel>
          </q-tab-panels>

        </q-card>
      </q-card>
    </div>
  </q-page>
</template>

<script>
// import UserGroup from './UserGroup.vue'
export default {
  name: 'UserCreate',
  components: {
    // UserGroup
  },
  data () {
    return {
      loading: false,
      tab: 'group',
      user: {
        username: this.$route.params.username
      }
    }
  },
  mounted () {
    this.onRequest()
  },
  methods: {
    async onRequest () {
      this.loading = true
      await this.$store.dispatch('system/getUser', { userId: this.user.userId }).then(data => {
        this.user = data
      }).catch(error => {
        console.error(error)
      })
      setTimeout(() => {
        this.loading = false
      }, 1000)
    }
  }
}
</script>

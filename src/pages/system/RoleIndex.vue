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
            label="系统设置"
            to=""
          />
          <q-breadcrumbs-el label="角色组" />
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
          角色组管理
        </div>
      </div>
    </div>

    <div class="my-page-body">
      <q-card
        flat
        class="q-pb-md"
      >
        test
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'RoleIndex',
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

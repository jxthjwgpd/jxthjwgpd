<template>
  <q-page class="q-pa-lg user-create">
    <div class="row items-center justify-between q-mb-md">
      <div>
        <q-breadcrumbs align="left">
          <q-breadcrumbs-el
            label="系统管理"
            to="/system"
          />
          <q-breadcrumbs-el
            label="用户"
            to="/system/users"
          />
          <q-breadcrumbs-el label="用户详情" />
        </q-breadcrumbs>
        <div
          class="q-mt-xs row items-center"
          v-if="$q.screen.gt.sm"
        >
          <router-link to="/system/users">
            <q-icon
              name="arrow_back"
              size="sm"
              class="text-bold text-dark"
            />
          </router-link>
          <div class="text-h6">用户（{{ loginName }}）详情</div>
        </div>
      </div>
    </div>
    <div class="q-mb-lg my-card">
      <q-card
        flat
        class="q-pb-md"
      >
        <q-card-section class="q-gutter-y-md q-mt-none">
          <q-item-label class="q-mt-none">用户账号基本信息</q-item-label>
          <div class="row q-gutter-x-md">

          </div>
          <q-item-label>联系方式</q-item-label>
        </q-card-section>

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

      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'UserCreate',
  data () {
    return {
      userId: this.$route.params.userId,
      loginName: this.$route.params.loginName,
      loading: false,
      form: {
        loginName: null,
        password: null,
        nickname: null,
        cbPassWeb: false,
        cbPassApi: false,
        setPassType: '1',
        laSetPass: '0'
      }
    }
  },
  mounted () {
    console.log(this.$route.params.userId)
    console.log(this.$route.params.loginName)
    this.onRequest()
  },
  methods: {
    async onRequest () {
      this.loading = true
      await this.$store.dispatch('system/getUser', { userId: this.userId }).then(data => {
        console.log(data)
      }).catch(error => {
        console.error(error)
      })
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },
    onSubmit () {
      this.loading = true
      this.$store.dispatch('system/saveUser', this.form).then(data => {
        this.loading = false
        this.$q.notify({
          color: 'green-14',
          textColor: 'white',
          icon: 'offline_pin',
          message: '保存成功！'
        })
        this.$router.push({ path: '/system/users' })
      }).catch(e => {
        this.loading = false
      })
    }
  }
}
</script>

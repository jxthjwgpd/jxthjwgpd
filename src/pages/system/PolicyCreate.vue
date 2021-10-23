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
            label="策略管理"
            to="/system/policies"
          />
          <q-breadcrumbs-el label="新建策略" />
        </q-breadcrumbs>
        <div
          class="q-mt-xs row items-center"
          v-if="$q.screen.gt.sm"
        >
          <router-link to="/system/policies">
            <q-icon
              name="arrow_back"
              size="sm"
              class="text-bold text-dark"
            />
          </router-link>
          <div class="text-h6">新建自定义策略</div>
        </div>
      </div>
    </div>
    <q-banner
      dense
      class="bg-grey-3 q-mb-md"
    >
      权限策略（Policy）相当于传统的RBAC角色，它用于描述一组权限集。使用一种简单的 权限策略语法 来对权限集进行描述。<router-link to="/system/policies">
        <q-icon
          name="open_in_new"
          color="primary"
        />
      </router-link>
      <template v-slot:action>
        <q-btn
          flat
          label="关闭"
        />
      </template>
    </q-banner>
    <div class="q-mb-lg my-card">
      <q-card
        flat
        class="q-pb-md"
      >
        <q-form @submit="onSubmit">
          <q-card-section class="q-gutter-y-md q-mt-none">
            <q-item-label class="q-mt-none">策略名称 <span class="text-negative">*</span></q-item-label>
            <div class="q-mt-none">
              <q-input
                class="q-pb-md"
                v-model="form.policyName"
                :dense="true"
                lazy-rules
                :rules="[ val => val && val.length > 0 || '请输入策略名称']"
              />
            </div>
            <q-item-label>策略说明</q-item-label>
            <div>
              <q-input
                outlined
                v-model="form.remarks"
                type="textarea"
                style="height: 80px;"
                :dense="true"
              />
            </div>
            <q-item-label class="q-mt-lg">配置模式 <span class="text-negative">*</span></q-item-label>
            <div class="column q-gutter-y-md q-mt-none">
              <q-radio
                v-model="form.setPassType"
                val="1"
                label="页面配置"
                dense
              />
              <q-radio
                v-model="form.setPassType"
                val="0"
                label="自定义脚本"
                dense
              />
            </div>
            <div v-if="form.setPassType==='1'">
              <q-item-label class="q-mt-lg">权限效力 <span class="text-negative">*</span></q-item-label>
              <div class="column q-gutter-y-md q-mt-none">
                <q-radio
                  v-model="form.setPassType"
                  val="3"
                  label="允许"
                  dense
                />
                <q-radio
                  v-model="form.setPassType"
                  val="4"
                  label="拒绝"
                  dense
                />
              </div>
              <q-item-label class="q-mt-lg">选择权限 <span class="text-negative">*</span></q-item-label>
              <div class="column q-gutter-y-md q-mt-none">
                这里放权限树合适吗？
              </div>
              <q-item-label class="q-mt-lg">资源 </q-item-label>
              <div class="column q-gutter-y-md q-mt-none">
                这里的资源又该如何控制？
              </div>
              <q-item-label class="q-mt-lg">限制访问条件 </q-item-label>
              <div class="column q-gutter-y-md q-mt-none">
                访问的能力又做限制？
              </div>
            </div>
          </q-card-section>

          <q-card-actions class="q-pl-md">
            <q-btn
              label="保存"
              color="primary"
              type="submit"
              class="wd-80"
              :loading="loading"
            />
            <q-btn
              label="返回"
              class="wd-60"
              to="/system/policies"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PolicyCreate',
  data () {
    return {
      loading: false,
      form: {
        policyName: null,
        policyType: '0',
        nickname: null,
        cbPassWeb: false,
        cbPassApi: false,
        setPassType: '1',
        laSetPass: '0'
      }
    }
  },
  methods: {
    onSubmit () {
      this.loading = true
      this.$store.dispatch('system/savePolicy', this.form).then(data => {
        this.loading = false
        this.$q.notify({
          color: 'green-14',
          textColor: 'white',
          icon: 'offline_pin',
          message: '保存成功！'
        })
        this.$router.push({ path: '/system/policies' })
      }).catch(e => {
        this.loading = false
      })
    }
  }
}
</script>

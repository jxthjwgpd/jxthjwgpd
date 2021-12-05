<template>
  <q-dialog v-model="fixed">
    <q-card
      class="my-dialog"
      style="min-width:680px;"
    >
      <q-toolbar>
        <q-toolbar-title>角色选择</q-toolbar-title>
        <q-btn
          flat
          round
          dense
          icon="close"
          v-close-popup
        />
      </q-toolbar>
      <q-separator />
      <q-form
        @submit="onSubmit"
        class="my-form"
      >
        <q-card-section
          style="max-height: 56vh; "
          class="scroll q-gutter-y-md q-mt-none"
        >
          <div class="row q-form-item q-mb-md">
            <div class="col-3 q-label text-right">
              <label for="cpassword">
                选择角色组
              </label>
            </div>
            <div
              class="col-8"
              style="max-height: 260px; overflow: auto;"
            >
              <user-role-list v-model="form.roleIds" />
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions
          align="right"
          class="q-dialog-footer"
        >
          <q-btn
            :label="$q.lang.label.ok"
            color="primary"
            type="submit"
            :loading="loading"
          />
          <q-btn
            :label="$q.lang.label.cancel"
            v-close-popup
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
// import axios from 'axios'
import { mapGetters } from 'vuex'
import UserRoleList from './UserRoleList.vue'
export default {
  name: 'UserAdd',
  components: {
    UserRoleList
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    id: {
      type: String
    }
  },
  data () {
    return {
      fixed: false,
      loading: false,
      form: {
        userId: null,
        roleIds: []
      }
    }
  },
  computed: {
    ...mapGetters({
      userRoleList: 'system/UserRoleList'
    })
  },
  watch: {
    value () {
      this.fixed = this.value
    },
    fixed () {
      this.$emit('input', this.fixed)
    },
    'userRoleList' () {
      this.userRoleList.map(e => {
        this.form.roleIds.push(e.roleId)
      })
      this.form.userId = this.id
    }
  },
  methods: {
    async onSubmit () {
      // this.loading = true
      // await axios.post('/admin/users/role', this.form).then(response => {
      //   const { code, message, data } = response.data
      //   if (code === '200' && data) {
      //     this.$emit('refresh')
      //     this.onReset()
      //     this.$emit('input', false) // 关闭窗口
      //   } else {
      //     this.$q.notify({
      //       message
      //     })
      //   }
      // }).catch(error => {
      //   console.error(error)
      // })
      // setTimeout(() => {
      //   this.loading = false
      // }, 500)
    }
  }
}
</script>

<template>
  <q-dialog v-model="fixed">
    <q-card>
      <q-form @submit="onSubmit">
        <q-card-section>
          <div class="text-h6">新增用户组</div>
        </q-card-section>

        <q-separator />

        <q-card-section
          style="max-height: 50vh; min-width:500px;"
          class="scroll q-gutter-y-md q-mt-none"
        >
          <template v-if="!action">
            <q-item-label class="q-mt-none">用户组名称 <span class="text-negative">*</span></q-item-label>
            <q-input
              class="q-ma-none q-pb-md"
              v-model="form.groupName"
              :dense="true"
              lazy-rules
              :rules="[ val => val && val.length > 0 || '请输入用户组名称']"
            />
            <q-item-label>其它</q-item-label>
            <q-input
              outlined
              v-model="form.remarks"
              type="textarea"
              label="备注说明"
              :dense="true"
            />
          </template>
          <template v-else>
            <q-action-success />
          </template>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn
            label="确认"
            color="primary"
            type="submit"
            class="wd-80"
            :loading="loading"
            v-if="!action"
          />
          <q-btn
            flat
            label="取消"
            color="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'GroupForm',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      fixed: false,
      loading: false,
      action: false,
      form: {
        groupId: null,
        groupName: null,
        remarks: null
      }
    }
  },
  watch: {
    value () {
      this.action = false
      this.fixed = this.value
    },
    fixed () {
      this.$emit('input', this.fixed)
    }
  },
  methods: {
    onSubmit () {
      this.loading = true
      this.$store.dispatch('system/saveGroup', this.form).then(data => {
        this.loading = false
        this.action = true

        this.$emit('refresh')

        this.onReset()
      }).catch(e => {
        this.loading = false
      })
    },
    onReset () {
      this.form.groupId = null
      this.form.groupName = null
      this.form.remarks = null
    }
  }
}
</script>

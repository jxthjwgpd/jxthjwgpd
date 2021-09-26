<template>
  <q-page class="q-pa-lg">
    <div class="row items-center justify-between q-mb-md">
        <div>
            <q-breadcrumbs align="left">
            <q-breadcrumbs-el label="系统管理"  to="/system"/>
            <q-breadcrumbs-el label="设置" />
            </q-breadcrumbs>
            <div class="text-h6 q-mt-xs" v-if="$q.screen.gt.sm">安全设置</div>
        </div>
        <div class="q-gutter-sm" v-if="$q.screen.gt.sm">
            <q-btn color="primary" label="保存" />
        </div>
    </div>
    <div class="q-mt-md">
        <q-card flat>
            <q-card-section>
                <q-form
                @submit="onSubmit"
                @reset="onReset"
                class="q-gutter-md "
                >
                <q-input outlined v-model="form.test1" label="实例名称1" :dense="true" />

                <q-input outlined v-model="form.test4" type="textarea" label="机密信息（选填）" :dense="true" />
                <q-select outlined v-model="form.test5" :options="options" label="紧急程度" :dense="true" :options-dense="true" />
                </q-form>
            </q-card-section>
        </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'DemoForm',
  data () {
    return {
      options: [
        { label: '普通咨询', value: '1' },
        { label: '操作体验问题', value: '2' },
        { label: '业务/系统异常影响使用', value: '3', color: 'green' },
        { label: '业务完全不可用', value: '4', color: 'red' }
      ],
      form: {
        test1: '',
        test2: '1',
        test3: '',
        test4: '',
        test5: ''
      },
      check1: true,
      check2: false,
      check3: false
    }
  },
  methods: {
    onSubmit () {

    },
    onReset () {

    }
  }
}
</script>

<style lang="sass" scoped>
</style>

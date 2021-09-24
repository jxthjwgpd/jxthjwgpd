<template>
  <q-page class="q-pa-lg">
    <div class="row items-center justify-between q-mb-md">
        <div>
            <q-breadcrumbs align="left">
            <q-breadcrumbs-el label="首页" />
            <q-breadcrumbs-el label="基础表单" />
            </q-breadcrumbs>
            <div class="text-h6 q-mt-xs" v-if="$q.screen.gt.sm">普通展示，基础表单页面效果</div>
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
                <div class="row">
                  <div class="col q-pr-sm">
                  <q-input outlined v-model="form.test1" label="实例名称2" :dense="true" />
                  </div>
                  <div class="col">
                  <q-input outlined v-model="form.test1" label="实例名称3" :dense="true" />
                  </div>
                </div>
                <!-- <q-option-group
                :options="options"
                label="Notifications"
                type="radio"
                v-model="form.test2"
                /> -->
                <q-editor
                    min-height="5rem"
                    @paste.native="evt => pasteCapture(evt)"
                    v-model="form.test3"
                    :definitions="{
                        image: {
                            icon: 'image',
                            color: 'primary',
                            handler: onSubmit
                        },
                    }"
                    :toolbar="[
                        ['image']
                    ]"
                />
                <q-input outlined v-model="form.test4" type="textarea" label="机密信息（选填）" :dense="true" />
                <q-select outlined v-model="form.test5" :options="options" label="紧急程度" :dense="true" :options-dense="true" />
                </q-form>
            </q-card-section>
            <q-card-actions class="q-pl-md">
                <q-btn color="primary">
                提交工单
                </q-btn>
            </q-card-actions>
        </q-card>
    </div>
    <div class="q-mt-md">
        <q-card flat>
            <q-card-section>
                  <div class="row no-wrap items-center">
                    <div class="col text-subtitle2 ellipsis">
                      回复记录
                    </div>
                    <div class="col-auto text-grey text-caption row no-wrap items-center">
                      20-02-01 23:23:23
                    </div>
                  </div>
                </q-card-section>
            <q-card-section>
        <q-chat-message
        name="帅哥"
        avatar="https://cdn.quasar.dev/img/avatar1.jpg"
        :text="['给我修好了没？', '修好了赶快回复我，别墨迹～～']"
      />
      <q-chat-message
        name="深夜程序猿"
        avatar="https://cdn.quasar.dev/img/avatar2.jpg"
        :text="['亲，我会尽快处理好的！coding...']"
        sent
      />
            </q-card-section>
        </q-card>
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
                <div class="row">
                  <div class="col q-pr-sm">
                <q-input outlined v-model="form.test1" label="实例名称2" :dense="true" />
                  </div>
                  <div class="col">
                <q-input outlined v-model="form.test1" label="实例名称3" :dense="true" />
                  </div>
                </div>
                <!-- <q-option-group
                :options="options"
                label="Notifications"
                type="radio"
                v-model="form.test2"
                /> -->
                <q-editor
                    min-height="5rem"
                    @paste.native="evt => pasteCapture(evt)"
                    v-model="form.test3"
                    :definitions="{
                        image: {
                            icon: 'image',
                            color: 'primary',
                            handler: onSubmit
                        },
                    }"
                    :toolbar="[
                        ['image']
                    ]"
                />
                <q-input outlined v-model="form.test4" type="textarea" label="机密信息（选填）" :dense="true" />
                <q-select outlined v-model="form.test5" :options="options" label="紧急程度" :dense="true" :options-dense="true" />
                </q-form>
            </q-card-section>
            <q-card-actions class="q-pl-md">
                <q-btn color="primary">
                保存
                </q-btn>
            </q-card-actions>
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
      }
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

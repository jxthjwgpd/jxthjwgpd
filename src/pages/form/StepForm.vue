<template>
  <q-page class="my-page basic-form">
    <div class="row items-center justify-between">
      <div class="my-page-header q-pa-lg">
        <q-breadcrumbs align="left">
          <q-breadcrumbs-el
            label="首页"
            to=""
          />
          <q-breadcrumbs-el
            label="表单页"
            to=""
          />
          <q-breadcrumbs-el label="分步表单" />
        </q-breadcrumbs>
        <div class="q-mt-md q-mb-sm text-h6">分步表单</div>
        <div>将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。</div>
      </div>
    </div>
    <div class="my-card">
      <div class="q-ma-lg">
        <q-card
          flat
          class="q-pa-xl"
        >
          <q-form class="my-form">
            <q-stepper
              v-model="step"
              header-nav
              ref="stepper"
              color="primary"
              animated
              flat
            >
              <q-step
                :name="1"
                title="填写转账信息"
                icon="settings"
                :done="done1"
              >
                <div class="row">
                  <div class="col-4 q-label">
                    <label for="username">
                      账号
                      <em>（必填项）</em>
                    </label>
                  </div>
                  <div class="col-5">
                    <q-input
                      outlined
                      dense
                      no-error-icon
                      v-model.trim="form.loginName"
                      placeholder="请输入账号"
                      :rules="[ val => val && val.length > 0 || '请设置用户账号']"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-4 q-label">
                    <label for="price">
                      金额
                      <em>（选填）</em>
                    </label>
                  </div>
                  <div class="wd-150">
                    <q-input
                      outlined
                      dense
                      no-error-icon
                      v-model.trim="form.price"
                      mask="#.##"
                      fill-mask="0"
                      reverse-fill-mask
                      input-class="text-right"
                    />
                  </div>
                </div>
                <div class="row q-mt-lg">
                  <div class="col offset-4">
                    <q-stepper-navigation class="q-pt-none">
                      <q-btn
                        @click="() => { done1 = true; step = 2 }"
                        color="primary"
                        label="下一步"
                      />
                    </q-stepper-navigation>
                  </div>
                </div>
              </q-step>
              <q-step
                :name="2"
                title="确认转账信息"
                icon="create_new_folder"
                :done="done2"
              >
                <div class="row">
                  <div class="col-4 q-label">
                    <label for="username">
                      付款账号
                    </label>
                  </div>
                  <div class="col-5 q-value">
                    {{form.loginName}}
                  </div>
                </div>
                <div class="row">
                  <div class="col-4 q-label">
                    <label for="price">
                      付款金额
                    </label>
                  </div>
                  <div class="col-5 q-value">
                    {{form.price}}
                  </div>
                </div>
                <div class="row q-mt-lg">
                  <div class="col-4 q-label">
                    <label for="price">
                      支付密码
                      <em>（必填项）</em>
                    </label>
                  </div>
                  <div class="wd-150">
                    <q-input
                      outlined
                      dense
                      no-error-icon
                      v-model.trim="form.password"
                      mask="######"
                      input-class="text-right"
                    />
                  </div>
                </div>
                <div class="row q-mt-lg">
                  <div class="col offset-4">
                    <q-stepper-navigation class="q-pt-none">
                      <q-btn
                        @click="() => { done2 = true; step = 3 }"
                        color="primary"
                        label="提交"
                      />
                      <q-btn
                        flat
                        @click="step = 1"
                        color="primary"
                        label="上一步"
                        class="q-ml-sm"
                      />
                    </q-stepper-navigation>
                  </div>
                </div>

              </q-step>
              <q-step
                :name="3"
                title="完成"
                icon="add_comment"
                :done="done3"
              >
                <div class="row">
                  <div class="col-4 q-label">
                    <label for="username">
                      账号
                      <em>（必填项）</em>
                    </label>
                  </div>
                  <div class="col-5">
                    <q-input
                      outlined
                      dense
                      no-error-icon
                      v-model.trim="form.loginName"
                      placeholder="请输入账号"
                      :rules="[ val => val && val.length > 0 || '请设置用户账号']"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-4 q-label">
                    <label for="price">
                      金额
                      <em>（选填）</em>
                    </label>
                  </div>
                  <div class="wd-150">
                    <q-input
                      outlined
                      dense
                      no-error-icon
                      v-model.trim="form.price"
                      mask="#.##"
                      fill-mask="0"
                      reverse-fill-mask
                      input-class="text-right"
                    />
                  </div>
                </div>
                <div class="row q-mt-lg">
                  <div class="col offset-4">
                    <q-stepper-navigation class="q-pt-none">
                      <q-btn
                        color="primary"
                        @click="step = 1"
                        label="再转一笔"
                      />
                      <q-btn
                        flat
                        @click="done3 = true"
                        color="primary"
                        label="查看账单"
                        class="q-ml-sm"
                      />
                    </q-stepper-navigation>
                  </div>
                </div>

              </q-step>
            </q-stepper>
          </q-form>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'BasicForm',
  data () {
    return {
      loading: false,
      step: 1,
      done1: false,
      done2: false,
      done3: false,
      form: {
        loginName: null,
        price: 0,
        password: null,
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

    }
  }
}
</script>

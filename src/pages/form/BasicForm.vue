<template>
  <q-page class="my-page basic-form">
    <div class="row items-center justify-between">
      <div class="my-page-header">
        <q-breadcrumbs align="left">
          <q-breadcrumbs-el
            label="首页"
            to=""
          />
          <q-breadcrumbs-el
            label="表单页"
            to=""
          />
          <q-breadcrumbs-el label="基础表单" />
        </q-breadcrumbs>
        <div class="my-page-header-subtitle">基础表单</div>
        <div class="q-mt-sm">表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。</div>
      </div>
    </div>
    <div class="my-page-body">
      <q-card
        flat
        class="q-pa-xl"
      >
        <q-form class="my-form">
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
          <div class="row">
            <div class="col-4 q-label">
              <label for="price">
                付款项
                <em>（选填）</em>
              </label>
            </div>
            <div class="col">
              <q-tree
                :nodes="simple"
                node-key="label"
                :tick-strategy="tickStrategy"
                :ticked.sync="ticked"
                :expanded.sync="expanded"
                @update:ticked="onSubmit"
                default-expand-all
              />
              {{ticked}}
            </div>
          </div>
          <div class="row q-mt-lg">
            <div class="col offset-4">
              <q-btn color="primary q-mr-sm">提交</q-btn>
              <q-btn
                color="white"
                text-color="black"
                @click="onSubmit"
              >保存</q-btn>
            </div>
          </div>
        </q-form>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'BasicForm',
  data () {
    return {
      loading: false,
      form: {
        loginName: null,
        price: 0,
        password: null,
        nickname: null,
        cbPassWeb: false,
        cbPassApi: false,
        setPassType: '1',
        laSetPass: '0'
      },
      simple: [
        {
          label: 'Satisfied customers',
          children: [
            {
              label: 'Good food',
              children: [
                { label: 'Quality ingredients' },
                { label: 'Good recipe' }
              ]
            },
            {
              label: 'Good service (disabled node)',
              disabled: true,
              children: [
                { label: 'Prompt attention' },
                { label: 'Professional waiter' }
              ]
            },
            {
              label: 'Pleasant surroundings',
              children: [
                { label: 'Happy atmosphere (*)' },
                { label: 'Good table presentation' },
                { label: 'Pleasing decor (*)' }
              ]
            }
          ]
        }
      ],
      ticked: ['Pleasant surroundings', 'Quality ingredients'],
      expanded: [],
      tickStrategy: 'strict'
    }
  },
  mounted () {

  },
  methods: {
    onSubmit () {
      this.ticked.map(e => {
        // this.findNodeById(this.simple, e, true)
      })
    },
    findNodeById (array, label, withParents) {
      if (array) {
        for (let i = 0; i < array.length; i++) {
          const node = JSON.parse(JSON.stringify(array[i]))
          if (node.label === label) {
            node.children = []
            if (this.ticked.indexOf(node.label) < 0) {
              this.ticked = this.ticked.concat(node.label)
            }
            return node
          } else {
            const result = this.findNodeById(node.children, label, withParents)
            if (result !== undefined) {
              if (withParents) {
                const rtn = node
                rtn.children = [result]
                if (this.ticked.indexOf(rtn.label) < 0) {
                  this.ticked = this.ticked.concat(rtn.label)
                }
                return rtn
              } else {
                return result
              }
            }
          }
        }
      }
    }
  }
}
</script>

<template>
  <q-page class="my-page">
    <div class="row items-center justify-between">
      <div class="my-page-header">
        <q-breadcrumbs align="left">
          <q-breadcrumbs-el
            label="首页"
            to="/"
          />
          <q-breadcrumbs-el
            label="商品"
            to="/goods"
          />
          <q-breadcrumbs-el label="商品品牌" />
        </q-breadcrumbs>
      </div>
    </div>
    <div class="my-page-body">
      <div class="my-tabs">
        <q-tabs
          narrow-indicator
          align="left"
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
        >
          <q-route-tab to="/goods/brand">品牌列表</q-route-tab>
          <q-route-tab :to="`/goods/brand/form${form.id!=null?'/'+form.id:''}`">{{form.id!=null?'编辑':'新增'}}品牌</q-route-tab>
        </q-tabs>
      </div>
      <q-card
        flat
        class="fit "
      >
        <!-- <q-card-section>
          <q-icon name="content_paste" /> 品牌管理
        </q-card-section>
        <q-separator /> -->
        <div class="container">
          <q-form
            class="my-form "
            @submit="onSubmit"
          >
            <q-card-section class="q-pa-xl">
              <div class="row q-col-gutter-md">
                <div class="col-12">
                  <label for="brandName"> 品牌名称</label>
                  <q-input
                    outlined
                    dense
                    no-error-icon
                    v-model.trim="form.brandName"
                    placeholder="请输入品牌名称"
                    :rules="[ val => val && val.length > 0 || '请设置品牌名称']"
                    class="q-mt-sm"
                  >
                  </q-input>
                </div>
                <div class="col-12 col-md-4 col-lg-4  q-pt-none">
                  <label for="brandInitial"> 品牌首字母 </label>
                  <q-input
                    outlined
                    dense
                    no-error-icon
                    v-model.trim="form.brandInitial"
                    placeholder="请输入品牌首字母"
                    class="q-mt-sm"
                  >
                  </q-input>
                </div>
                <!-- <div class="col-12 col-lg-12">
                  <label for="username"> 品牌所属类别 </label>
                  <q-input
                    outlined
                    dense
                    no-error-icon
                    v-model.trim="form.menuPath"
                    placeholder="请输入菜单地址"
                    class="q-mt-sm"
                  />
                </div> -->
              </div>
              <div class="row q-col-gutter-md q-mt-xs">

                <div class="col-12 col-md-8 col-lg-8">
                  <label for="brandCover"> 封面</label>
                  <div class="q-mt-sm">
                    <q-img
                      :src="baseUrl+brandCoverUrl"
                      height="280px"
                      v-show="brandCoverUrl"
                    >
                      <div class="absolute-bottom text-center">
                        {{baseUrl+brandCoverUrl}}
                      </div>
                    </q-img>
                    <q-uploader
                      ref="brandCover"
                      :url="`${baseUrl}/uploader`"
                      style="width: 100%;"
                      class="q-mt-sm"
                      flat
                      bordered
                      @uploaded="uploadedCover"
                    />
                  </div>
                </div>
                <div class="col-12 col-md-4 col-lg-4">
                  <label for="brandLogo"> 品牌 logo </label>
                  <div class="q-mt-sm">
                    <q-img
                      :src="baseUrl+brandLogoUrl"
                      height="280px"
                      v-show="brandLogoUrl"
                    >
                      <div class="absolute-bottom text-center">
                        {{baseUrl+brandLogoUrl}}
                      </div>
                    </q-img>
                    <q-uploader
                      ref="brandLogo"
                      :url="`${baseUrl}/uploader`"
                      style="width: 100%;"
                      class="q-mt-sm"
                      flat
                      bordered
                      @uploaded="uploadedLogo"
                    />
                  </div>
                </div>
                <div class="col-12">
                  <label for="summary"> 简介 </label>
                  <q-input
                    dense
                    outlined
                    no-error-icon
                    v-model="form.summary"
                    autogrow
                    :input-style="{ minHeight: '65px' }"
                    class="q-mt-sm"
                  />
                </div>
                <div class="col-12">
                  <label for="content"> 详细描述 </label>
                  <q-editor
                    v-model="form.content"
                    min-height="15rem"
                    class="q-mt-sm"
                  />
                  <!-- <q-input
                    dense
                    outlined
                    no-error-icon
                    v-model="form.content"
                    autogrow
                    :input-style="{ minHeight: '300px' }"
                    class="q-mt-sm"
                  /> -->
                </div>
                <div class="col-12 col-md-4 col-lg-4">
                  <label for="sort"> 排序 </label>
                  <q-input
                    outlined
                    dense
                    no-error-icon
                    v-model.trim="form.sort"
                    placeholder="请输入排序号"
                    class="q-mt-sm"
                  />
                </div>
              </div>
              <div class="row q-mt-md">
                <div class="col-12">
                  <label for="username"> 品牌推荐 </label>
                  <div class="q-mt-sm q-gutter-sm">
                    <q-radio
                      v-model="form.brandRecommend"
                      val="1"
                      label="是"
                      dense
                    />
                    <q-radio
                      v-model="form.brandRecommend"
                      val="0"
                      label="否"
                      dense
                    />
                  </div>
                </div>
              </div>
              <!-- <div class="row q-mt-md">
                <div class="col-12">
                  <label for="username"> 备注 </label>
                  <q-input
                    dense
                    outlined
                    no-error-icon
                    v-model="form.remark"
                    autogrow
                    :input-style="{ minHeight: '60px' }"
                    class="q-mt-sm"
                  />
                </div>
              </div> -->
            </q-card-section>
            <q-separator />
            <q-card-actions class="q-pa-xl">
              <q-btn
                color="primary"
                class="wd-80"
                type="submit"
              >保存</q-btn>
              <q-btn class="wd-80">重置</q-btn>
              <q-space />
              <q-btn
                color="negative"
                class="wd-80"
              >删除</q-btn>
            </q-card-actions>
          </q-form>
        </div>
        <q-inner-loading :showing="loading">
          <q-spinner-hourglass
            size="sm"
            color="primary"
          />
        </q-inner-loading>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios'
export default {
  name: 'UserList',
  data () {
    return {
      loading: false,
      form: {
        id: this.$route.params.id,
        brandRecommend: '0',
        brandLogo: '',
        brandCover: '',
        content: ''
      },
      fixed: false,
      baseUrl: axios.defaults.baseURL,
      brandCoverUrl: '',
      brandLogoUrl: ''
    }
  },
  mounted () {
    if (this.form.id) {
      this.onRequest()
    }
  },
  methods: {
    async onRequest () {
      this.loading = true
      await axios.get('/admin/goods/brand-detail', { params: { id: this.form.id } }).then(response => {
        const { code, data } = response.data
        if (code === '200' && data) {
          this.form = data.goodsBrand
          if (this.form) {
            this.brandCoverUrl = this.form.brandCover
            this.brandLogoUrl = this.form.brandLogo
          }
        }
      }).catch(error => {
        console.error(error)
      })
      setTimeout(() => {
        this.loading = false
      }, 200)
    },
    uploadedCover (info) {
      if (info.xhr && info.xhr.status === 200) {
        const response = JSON.parse(info.xhr.response)
        if (response && response.code === '200') {
          this.$q.notify({
            type: 'positive',
            message: '上传成功！'
          })
          this.brandCoverUrl = response.data[0].fileUrl
          this.$refs.brandCover.reset()
        }
      }
    },
    uploadedLogo (info) {
      if (info.xhr && info.xhr.status === 200) {
        const response = JSON.parse(info.xhr.response)
        if (response && response.code === '200') {
          this.$q.notify({
            type: 'positive',
            message: '上传成功！'
          })
          this.brandLogoUrl = response.data[0].fileUrl
          this.$refs.brandLogo.reset()
        }
      }
    },
    async onSubmit () {
      this.loading = true
      delete this.form.id
      this.form.brandCover = this.brandCoverUrl
      this.form.brandLogo = this.brandLogoUrl
      await axios.post('/admin/goods/brands', this.form).then(response => {
        const { code, message, data } = response.data
        if (code === '200' && data) {
          this.$q.notify({
            type: 'positive',
            message: '保存成功！'
          })
        } else {
          this.$q.notify({
            message
          })
        }
      }).catch(error => {
        console.error(error)
      })
      setTimeout(() => {
        this.loading = false
      }, 200)
    }
  }
}
</script>

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
          <q-route-tab :to="`/goods/brand/form`">新增品牌</q-route-tab>
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
                <div class="col-12 ">
                  <label for="username"> 品牌 logo </label>
                  <div class="my-uploader">
                    <q-uploader
                      url="http://localhost:4444/upload"
                      style="max-width: 200px"
                      class="q-mt-md"
                      auto-upload
                    >
                      <template v-slot:header="scope">
                        <!-- <q-spinner
                          v-if="scope.isUploading"
                          class="q-uploader__spinner"
                        /> -->
                        <q-img
                          src="~assets/svg/Image.svg"
                          v-if="scope.canAddFiles"
                        >
                          <q-uploader-add-trigger />
                        </q-img>
                      </template>
                    </q-uploader>
                  </div>
                </div>
                <div class="col-12">
                  <label for="brandName"> 品牌名称 </label>
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
                <div class="col-12 col-md-4 col-lg-4">
                  <label for="brandCover"> 封面 </label>
                  <q-uploader
                    url="http://localhost:4444/upload"
                    style="width: 100%;"
                    class="q-mt-sm"
                  />
                </div>
                <div class="col-12">
                  <label for="summary"> 品牌摘要 </label>
                  <q-input
                    dense
                    outlined
                    no-error-icon
                    v-model="form.summary"
                    autogrow
                    :input-style="{ minHeight: '45px' }"
                    class="q-mt-sm"
                  />
                </div>
                <div class="col-12">
                  <label for="content"> 详细描述 </label>
                  <q-editor
                    v-model="form.content"
                    min-height="15rem"
                    class="q-mt-sm"
                    @paste.native="evt => pasteCapture(evt)"
                    @drop.native="evt => dropCapture(evt)"
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
        brandRecommend: '0'
      }
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
          console.log(data)
        }
      }).catch(error => {
        console.error(error)
      })
      setTimeout(() => {
        this.loading = false
      }, 200)
    },
    onSubmit () {

    }
  }
}
</script>

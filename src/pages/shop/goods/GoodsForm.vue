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
          <q-breadcrumbs-el label="发布品牌" />
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
        <div class="container">
          <q-form
            class="my-form "
            @submit="onSubmit"
          >
            <q-card-section class="q-pa-xl">
              <div class="row q-col-gutter-md">
                <div class="col-12">
                  <label for="brandName"> 商品名称</label>
                  <q-input
                    outlined
                    dense
                    no-error-icon
                    v-model.trim="form.brandName"
                    placeholder="请输入商品名称"
                    :rules="[ val => val && val.length > 0 || '请设置商品名称']"
                    class="q-mt-sm"
                  >
                  </q-input>
                </div>
                <div class="col-12">
                  <label for="brandInitial"> 商品类型 </label>
                  <q-dialog-tree-select
                    title="商品类型"
                    v-model="form.type"
                    url="/admin/goods/category-tree"
                  />
                  <!-- <q-tree-select
                    v-model="fixed"
                    :treeData="treeData"
                    :nodeId="form.id"
                    :pNodeId.sync="form.pid"
                    :pNodeName.sync="form.pNodeName"
                    title="上级分类"
                  /> -->
                  <!-- <q-input
                    outlined
                    dense
                    no-error-icon
                    v-model.trim="form.brandInitial"
                    placeholder="请输入品牌首字母"
                    :rules="[ val => val && val.length > 0 || '请设置品牌首字母']"
                    class="q-mt-sm"
                  >
                  </q-input> -->
                </div>
              </div>
              <div class="row q-col-gutter-md q-mt-xs">

                <div class="col-12 col-md-8 col-lg-8">
                  <label for="brandCover"> 封面</label>
                  <div class="q-mt-sm">
                    <!-- <q-uploader-file v-model="form.brandCover" /> -->
                  </div>
                </div>
                <div class="col-12 col-md-4 col-lg-4">
                  <label for="brandLogo"> 品牌 logo </label>
                  <div class="q-mt-sm">
                    <!-- <q-uploader-file v-model="form.brandLogo" /> -->
                  </div>
                </div>
                <!-- <div class="col-12">
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
                </div> -->
              </div>
            </q-card-section>
            <q-separator />
            <q-card-actions class="q-pa-xl">
              <q-btn
                color="primary"
                class="wd-80"
                type="submit"
              >保存</q-btn>
              <q-btn
                class="wd-80"
                type="reset"
              >重置</q-btn>
              <q-space />
              <q-btn
                color="negative"
                class="wd-80"
                v-if="form.id"
                v-del:goback="{id:form.id, url:'/admin/goods/brand-delete'}"
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
export default {
  name: 'GoodsForm',
  data () {
    return {
      loading: false,
      form: {
        type: '1296338546860351489'
      }
    }
  },
  methods: {
    onSubmit (evt) {

    }
  }
}
</script>

<style lang="sass" scoped>

</style>

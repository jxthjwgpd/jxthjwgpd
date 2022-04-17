<template>
  <q-page class="my-page">
    <div class="row items-center justify-between">
      <div class="my-page-header q-pb-none">
        <q-breadcrumbs align="left">
          <q-breadcrumbs-el
            label="首页"
            to="/"
          />
          <q-breadcrumbs-el
            label="商品"
            to="/system"
          />
          <q-breadcrumbs-el label="商品分类" />
        </q-breadcrumbs>
      </div>
    </div>

    <div class="my-page-body q-pa-sm">
      <div class="container">
        <q-toolbar class="q-pl-none">
          <q-btn
            color="primary"
            size="12"
            @click="onAdd"
          >新建分类</q-btn>
        </q-toolbar>
        <div class="row q-col-gutter-md">
          <div class="col-12 col-sm-3 col-lg-3">
            <q-card
              flat
              class="fit"
            >
              <q-scroll-area class="fit">
                <q-tree
                  class="q-mt-sm"
                  :nodes="treeData"
                  node-key="id"
                  label-key="name"
                  selected-color="primary"
                  :selected.sync="selected"
                  default-expand-all
                  no-connectors
                />
              </q-scroll-area>
            </q-card>
          </div>
          <div class="col-12 col-sm-9 col-lg-9">
            <q-card
              flat
              class="fit"
            >
              <q-card-section>
                <q-icon name="content_paste" /> {{optTitle || '未选择'}}
              </q-card-section>
              <q-separator />
              <q-form
                class="my-form "
                @submit="onSubmit"
              >
                <q-card-section class="q-pa-xl">
                  <div class="row q-col-gutter-md">
                    <div class="col-12 col-lg-4">
                      <label for="username"> 上级分类 </label>
                      <q-input
                        outlined
                        dense
                        no-error-icon
                        v-model.trim="form.pNodeName"
                        placeholder="请选择上级分类"
                        class="q-mt-sm"
                      >
                        <template v-slot:append>
                          <q-icon
                            name="low_priority"
                            @click="fixed=!fixed"
                          />
                        </template>
                      </q-input>
                      <q-tree-select
                        v-model="fixed"
                        :treeData="treeData"
                        :nodeId="form.id"
                        :pNodeId.sync="form.pid"
                        :pNodeName.sync="form.pNodeName"
                        title="上级分类"
                      />
                    </div>
                    <div class="col-12 col-lg-8">
                      <label for="username"> 分类名称 </label>
                      <q-input
                        outlined
                        dense
                        no-error-icon
                        v-model.trim="form.categoryName"
                        placeholder="请输入分类名称"
                        :rules="[ val => val && val.length > 0 || '请设置分类名称']"
                        class="q-mt-sm"
                      />
                    </div>
                    <div class="col-12">
                      <label for="brandCover"> 封面</label>
                      <div
                        class="q-mt-sm"
                        style="width:540px"
                      >
                        <q-uploader-file v-model="form.categoryCover" />
                      </div>
                    </div>
                    <!-- <div class="col-12">
                      <label for="brandLogo"> 缩略图 </label>
                      <div
                        class="q-mt-sm"
                        style="width:300px"
                      >
                        <q-uploader-file v-model="form.thumbnail" />
                      </div>
                    </div> -->
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
                    v-del:refresh="{id:form.id, url:'/admin/goods/category-delete'}"
                  >删除</q-btn>
                </q-card-actions>
              </q-form>
              <q-inner-loading :showing="loading">
                <q-spinner-hourglass
                  size="sm"
                  color="primary"
                />
              </q-inner-loading>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios'
export default {
  name: 'MenuList',
  data () {
    return {
      loading: false,
      treeData: [],
      selected: null,
      // thumbnail: [],
      // categoryCover: [],
      form: {
        id: null,
        content: ''
      },
      optTitle: null,
      fixed: false
    }
  },
  mounted () {
    this.onRefresh()
  },
  watch: {
    'selected' () {
      if (this.selected) {
        this.onRefeshCategoryDetail()
      }
    }
  },
  methods: {
    onRefresh () {
      this.onRequest()
    },
    async onRequest () {
      this.loading = true
      await axios.get('/admin/goods/category-tree', {}).then(response => {
        const { code, data } = response.data
        if (code === '200' && data) {
          this.treeData = data
        }
      }).catch(error => {
        console.error(error)
      })
      setTimeout(() => {
        this.loading = false
      }, 200)
    },
    async onRefeshCategoryDetail () {
      this.loading = true
      await axios.get('/admin/goods/category-detail', { params: { id: this.selected } }).then(response => {
        const { code, data } = response.data
        if (code === '200' && data.goodsCategory) {
          this.form = data.goodsCategory
          this.optTitle = data.goodsCategory.categoryName
          // if (this.form.thumbnail) {
          //   this.thumbnail[0] = this.form.thumbnail
          // }
          // if (this.form.categoryCover) {
          //   this.categoryCover[0] = this.form.categoryCover
          // }
        }
      }).catch(error => {
        console.error(error)
      })
      setTimeout(() => {
        this.loading = false
      }, 200)
    },
    onAdd () {
      this.optTitle = '创建分类'
      this.form = {
        id: null,
        pid: '0',
        content: ''
      }
    },
    async onSubmit () {
      this.loading = true
      delete this.form.created
      delete this.form.status
      await axios.post(`/admin/goods/category`, this.form).then(response => {
        const { code, message, data } = response.data
        if (code === '200' && data) {
          this.$q.notify({
            type: 'positive',
            message: '保存成功.'
          })
          this.onRequest()
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

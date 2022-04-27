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
          <q-breadcrumbs-el label="商品管理" />
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
          <q-route-tab to="/goods/list">商品列表</q-route-tab>
          <q-route-tab :to="`/goods/form${form.id!=null?'/'+form.id:''}`">{{form.id!=null?'编辑':'新增'}}商品</q-route-tab>
        </q-tabs>
      </div>
      <q-card
        flat
        class="fit "
      >
        <div class="container">
          <q-form
            class="my-form gutter"
            @submit="onSubmit"
          >
            <q-card-section class="q-pa-xl">

              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-8 col-lg-8">
                  <label for="goodsName"> 商品名称</label>
                  <q-input
                    outlined
                    dense
                    no-error-icon
                    v-model.trim="form.goodsName"
                    placeholder="请输入商品名称"
                    :rules="[ val => val && val.length > 0 || '请设置商品名称']"
                    class="q-mt-sm"
                  >
                  </q-input>
                </div>
                <div class="col-12  col-md-4 col-lg-4">
                  <label for="brandInitial"> 商品类型 </label>
                  <q-dialog-tree-select
                    title="商品类型"
                    v-model="form.categoryId"
                    url="/admin/goods/category-tree"
                  />
                </div>
                <div class="col-12">
                  <label for="keywords"> 商品关键字</label>
                  <div class="q-mt-sm">
                    <q-input
                      outlined
                      dense
                      no-error-icon
                      v-model.trim="form.keywords"
                      placeholder="请输入商品关键字"
                      class="q-mt-sm"
                    >
                    </q-input>
                  </div>
                </div>
                <div class="col-12">
                  <label for="goodsSummary"> 商品简介</label>
                  <div class="q-mt-sm">
                    <q-input
                      outlined
                      dense
                      no-error-icon
                      v-model.trim="form.goodsSummary"
                      placeholder="请输入商品简介"
                      class="q-mt-sm"
                      autogrow
                      :input-style="{ minHeight: '60px' }"
                    >
                    </q-input>
                  </div>
                </div>
              </div>
              <div class="row q-mt-md">
                <div class="col-12">
                  <label for="volume"> 商品图片</label>
                  <div class="q-mt-sm">
                    <div class="q-col-gutter-md row items-start">
                      <div
                        class="col-3"
                        v-for="(item, index) in imageData"
                        :key="item.id"
                      >
                        <q-img
                          :src="baseUrl + item.fileUrl"
                          :ratio="4/3"
                        >
                          <div class="absolute-top row flex-center no-wrap image-header">
                            {{item.fileName}}
                            <q-space />
                            <q-btn
                              round
                              flat
                              dense
                              icon="close"
                              @click="imageData.splice(index, 1)"
                            />
                            <q-btn
                              round
                              flat
                              dense
                              icon="more_vert"
                            >
                              <q-popup-proxy>
                                <q-list
                                  bordered
                                  separator
                                >
                                  <q-item
                                    clickable
                                    dense
                                    @click="next(index)"
                                  >
                                    <q-item-section>向右</q-item-section>
                                  </q-item>
                                  <q-item
                                    clickable
                                    dense
                                    @click="prev(index)"
                                  >
                                    <q-item-section>向左</q-item-section>
                                  </q-item>
                                </q-list>
                              </q-popup-proxy>
                            </q-btn>
                          </div>
                        </q-img>
                      </div>
                    </div>
                    <div class="q-mt-md">
                      <q-btn
                        label="上传图片"
                        color="primary"
                        @click="uploadImage"
                      />
                      <q-btn
                        label="选择图片"
                        color="primary"
                        class="q-ml-xs"
                        @click="selectImage"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="row q-col-gutter-md q-mt-xs">
                <div class="col-12">
                  <label for="marketPrice"> 商品详细描述</label>
                  <div class="q-mt-sm">
                    <q-editor
                      v-model="form.goodsContent"
                      min-height="25rem"
                      max-height="90rem"
                      class="q-mt-sm"
                      :definitions="{
                          selectImage: {
                            icon: 'photo',
                            handler: selectImageEditor
                          }
                        }"
                      :toolbar="[
                          ['bold', 'italic', 'strike', 'underline'],
                          ['token', 'hr', 'link'],
                          ['selectImage']
                        ]"
                    />
                  </div>
                </div>
              </div>
              <div class="row q-col-gutter-md q-mt-xs">
                <div class="col-12 col-md-4 col-lg-4">
                  <label for="marketPrice"> 市场零售价</label>
                  <div class="q-mt-sm">
                    <q-input
                      outlined
                      dense
                      no-error-icon
                      v-model.trim="form.marketPrice"
                      placeholder="请输入市场零售价"
                      class="q-mt-sm"
                      type="number"
                    >
                    </q-input>
                  </div>
                </div>
                <div class="col-12 col-md-4 col-lg-4">
                  <label for="storeCount"> 库存量</label>
                  <div class="q-mt-sm">
                    <q-input
                      outlined
                      dense
                      no-error-icon
                      v-model.trim="form.storeCount"
                      placeholder="请输入库存量"
                      class="q-mt-sm"
                      type="number"
                    >
                    </q-input>
                  </div>
                </div>
              </div>
              <div class="row q-col-gutter-md q-mt-xs">
                <div class="col-12 col-md-4 col-lg-4">
                  <label for="sort"> 商品排序</label>
                  <div class="q-mt-sm">
                    <q-input
                      outlined
                      dense
                      no-error-icon
                      v-model.trim="form.sort"
                      placeholder="请输入商品排序"
                      class="q-mt-sm"
                      type="number"
                    >
                    </q-input>
                  </div>
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
import AlbumSelected from './AlbumSelected.vue'
import DialogUploader from '../../../components/DialogUploader.vue'
export default {
  name: 'GoodsForm',
  data () {
    return {
      baseUrl: axios.defaults.baseURL,
      loading: false,
      imageData: [],
      form: {
        goodsContent: ''
      }
    }
  },
  mounted () {
  },
  methods: {
    uploadImage () {
      this.$q.dialog({
        component: DialogUploader,
        parent: this
      }).onOk(e => {
        console.log('OK')
        this.imageData = this.imageData.concat(e)
      })
    },
    selectImage () {
      this.$q.dialog({
        component: AlbumSelected,
        parent: this,
        size: 9
      }).onOk(e => {
        console.log('OK')
        this.imageData = this.imageData.concat(e)
      })
    },
    selectImageEditor () {
      this.$q.dialog({
        component: AlbumSelected,
        parent: this,
        size: 100
      }).onOk(e => {
        console.log('OK')
        let temp = ''
        e.forEach(element => {
          temp += '<img src=' + this.baseUrl + element.fileUrl + ' />'
        })
        this.form.goodsContent = this.form.goodsContent + temp
      })
    },
    prev (index) {
      if (index !== 0 && this.imageData.length > 1) {
        this.swapItems(this.imageData, index, index - 1)
      }
    },
    next (index) {
      if (index < (this.imageData.length - 1)) {
        this.swapItems(this.imageData, index, index + 1)
      }
    },
    swapItems (arr, index1, index2) {
      arr[index1] = arr.splice(index2, 1, arr[index1])[0]
      return arr
    },
    async onSubmit (evt) {
      this.loading = true
      await axios.post(`/admin/goods`, this.form).then(response => {
        const { code, message, data } = response.data
        if (code === '200' && data) {
          this.$q.notify({
            type: 'positive',
            message: '保存成功.'
          })
          this.$router.go(-1)
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
<style lang="sass" scoped>
.image-header
  background: linear-gradient(180deg,rgba(0,0,0,0.7) 20%,transparent)
</style>

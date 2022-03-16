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
          <q-breadcrumbs-el label="发布商品" />
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
              <q-stepper
                v-model="step"
                ref="stepper"
                color="primary"
                animated
                flat
              >
                <q-step
                  :name="1"
                  title="基础信息"
                  icon="settings"
                  :done="step > 1"
                >
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
                        >
                        </q-input>
                      </div>
                    </div>
                    <div class="col-12">
                      <label for="brandInitial"> 商品类型 </label>
                      <q-dialog-tree-select
                        title="商品类型"
                        v-model="form.type"
                        url="/admin/goods/category-tree"
                      />
                    </div>
                    <div class="col-12 col-md-4 col-lg-4">
                      <label for="brandCover"> 商品品牌</label>
                      <div class="q-mt-sm">
                        <q-select
                          outlined
                          dense
                          no-error-icon
                          v-model="form.goodsBrand"
                          option-label="brandName"
                          option-value="id"
                          :options="brandOptions"
                        >
                          <template v-slot:no-option>
                            <q-item>
                              <q-item-section class="text-grey">
                                No results
                              </q-item-section>
                            </q-item>
                          </template>
                        </q-select>
                      </div>
                    </div>

                  </div>
                  <div class="row q-col-gutter-md q-mt-xs">
                    <div class="col-12 col-md-4 col-lg-4">
                      <label for="weight"> 供货商</label>
                      <div class="q-mt-sm">
                        <q-input
                          outlined
                          dense
                          no-error-icon
                          v-model.trim="form.weight"
                          placeholder="请输入商品重量"
                          class="q-mt-sm"
                        >
                        </q-input>
                      </div>
                    </div>
                  </div>
                  <div class="row q-col-gutter-md q-mt-xs">
                    <div class="col-12 col-md-4 col-lg-4">
                      <label for="weight"> 商户号</label>
                      <div class="q-mt-sm">
                        <q-input
                          outlined
                          dense
                          no-error-icon
                          v-model.trim="form.weight"
                          placeholder="请输入商品重量"
                          class="q-mt-sm"
                        >
                        </q-input>
                      </div>
                    </div>
                  </div>
                  <div class="row q-col-gutter-md q-mt-xs">
                    <div class="col-12 col-md-4 col-lg-4">
                      <label for="weight"> 销量</label>
                      <div class="q-mt-sm">
                        <q-input
                          outlined
                          dense
                          no-error-icon
                          v-model.trim="form.weight"
                          placeholder="请输入商品重量"
                          class="q-mt-sm"
                        >
                        </q-input>
                      </div>
                    </div>
                  </div>
                  <div class="row q-col-gutter-md q-mt-xs">
                    <div class="col-12 col-md-4 col-lg-4">
                      <label for="volume"> 库存量</label>
                      <div class="q-mt-sm">
                        <q-input
                          outlined
                          dense
                          no-error-icon
                          v-model.trim="form.storeCount"
                          placeholder="请输入商品体积"
                          class="q-mt-sm"
                        >
                        </q-input>
                      </div>
                    </div>
                  </div>
                  <div class="row q-col-gutter-md q-mt-xs">
                    <div class="col-12 col-md-4 col-lg-4">
                      <label for="volume"> 评论量</label>
                      <div class="q-mt-sm">
                        <q-input
                          outlined
                          dense
                          no-error-icon
                          v-model.trim="form.storeCount"
                          placeholder="请输入商品体积"
                          class="q-mt-sm"
                        >
                        </q-input>
                      </div>
                    </div>
                  </div>
                  <div class="row q-col-gutter-md q-mt-xs">
                    <div class="col-12 col-md-4 col-lg-4">
                      <label for="weight"> 点击量</label>
                      <div class="q-mt-sm">
                        <q-input
                          outlined
                          dense
                          no-error-icon
                          v-model.trim="form.weight"
                          placeholder="请输入商品重量"
                          class="q-mt-sm"
                        >
                        </q-input>
                      </div>
                    </div>
                  </div>
                  <div class="row q-col-gutter-md q-mt-xs">
                    <div class="col-12 col-md-4 col-lg-4">
                      <label for="weight"> 货品编码</label>
                      <div class="q-mt-sm">
                        <q-input
                          outlined
                          dense
                          no-error-icon
                          v-model.trim="form.weight"
                          placeholder="请输入商品重量"
                          class="q-mt-sm"
                        >
                        </q-input>
                      </div>
                    </div>
                  </div>
                  <div class="row q-col-gutter-md q-mt-xs">
                    <div class="col-12 col-md-4 col-lg-4">
                      <label for="spu"> SPU</label>
                      <div class="q-mt-sm">
                        <q-input
                          outlined
                          dense
                          no-error-icon
                          v-model.trim="form.spu"
                          placeholder="请输入SPU"
                          class="q-mt-sm"
                        >
                        </q-input>
                      </div>
                    </div>
                  </div>
                  <div class="row q-col-gutter-md q-mt-xs">
                    <div class="col-12 col-md-4 col-lg-4">
                      <label for="sku"> SKU</label>
                      <div class="q-mt-sm">
                        <q-input
                          outlined
                          dense
                          no-error-icon
                          v-model.trim="form.sku"
                          placeholder="请输入SKU"
                          class="q-mt-sm"
                        >
                        </q-input>
                      </div>
                    </div>
                  </div>
                  <div class="row q-col-gutter-md q-mt-xs">
                    <div class="col-12 col-md-4 col-lg-4">
                      <label for="weight"> 商品重量</label>
                      <div class="q-mt-sm">
                        <q-input
                          outlined
                          dense
                          no-error-icon
                          v-model.trim="form.weight"
                          placeholder="请输入商品重量"
                          class="q-mt-sm"
                        >
                        </q-input>
                      </div>
                    </div>
                  </div>
                  <div class="row q-col-gutter-md q-mt-xs">
                    <div class="col-12 col-md-4 col-lg-4">
                      <label for="volume"> 商品体积</label>
                      <div class="q-mt-sm">
                        <q-input
                          outlined
                          dense
                          no-error-icon
                          v-model.trim="form.volume"
                          placeholder="请输入商品体积"
                          class="q-mt-sm"
                        >
                        </q-input>
                      </div>
                    </div>
                  </div>
                  <div class="row q-col-gutter-md q-mt-xs">
                    <div class="col-12 col-md-4 col-lg-4">
                      <label for="volume"> 商品排序</label>
                      <div class="q-mt-sm">
                        <q-input
                          outlined
                          dense
                          no-error-icon
                          v-model.trim="form.volume"
                          placeholder="请输入商品体积"
                          class="q-mt-sm"
                        >
                        </q-input>
                      </div>
                    </div>
                  </div>
                  <div class="row q-col-gutter-md q-mt-xs">
                    <div class="col-12 col-md-4 col-lg-4">
                      <label for="volume"> 是否新品</label>
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
                  <div class="row q-col-gutter-md q-mt-xs">
                    <div class="col-12 col-md-4 col-lg-4">
                      <label for="volume"> 是否热卖</label>
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
                  <div class="row q-col-gutter-md q-mt-xs">
                    <div class="col-12 col-md-4 col-lg-4">
                      <label for="volume"> 是否推荐</label>
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
                  <div class="row q-col-gutter-md q-mt-xs">
                    <div class="col-12 col-md-4 col-lg-4">
                      <label for="volume"> 市场零售价</label>
                      <div class="q-mt-sm">
                        <q-input
                          outlined
                          dense
                          no-error-icon
                          v-model.trim="form.storeCount"
                          placeholder="请输入商品体积"
                          class="q-mt-sm"
                        >
                        </q-input>
                      </div>
                    </div>

                  </div>
                  <div class="row q-col-gutter-md q-mt-xs">
                    <div class="col-12 col-md-4 col-lg-4">
                      <label for="volume"> 本店供货价</label>
                      <div class="q-mt-sm">
                        <q-input
                          outlined
                          dense
                          no-error-icon
                          v-model.trim="form.storeCount"
                          placeholder="请输入商品体积"
                          class="q-mt-sm"
                        >
                        </q-input>
                      </div>
                    </div>

                  </div>
                  <div class="row q-col-gutter-md q-mt-xs">
                    <div class="col-12 col-md-4 col-lg-4">
                      <label for="volume"> 商品成本价</label>
                      <div class="q-mt-sm">
                        <q-input
                          outlined
                          dense
                          no-error-icon
                          v-model.trim="form.storeCount"
                          placeholder="请输入商品体积"
                          class="q-mt-sm"
                        >
                        </q-input>
                      </div>
                    </div>

                  </div>
                  <div class="row q-col-gutter-md q-mt-xs">
                    <div class="col-12 col-md-4 col-lg-4">
                      <label for="volume"> 价格阶梯</label>
                      <div class="q-mt-sm">
                        <q-input
                          outlined
                          dense
                          no-error-icon
                          v-model.trim="form.storeCount"
                          placeholder="请输入商品体积"
                          class="q-mt-sm"
                        >
                        </q-input>
                      </div>
                    </div>
                  </div>
                  <div class="row q-col-gutter-md q-mt-xs">
                  </div>
                  <div class="row q-col-gutter-md q-mt-xs">
                  </div>
                  <div class="row q-col-gutter-md q-mt-xs">
                  </div>
                </q-step>

                <q-step
                  :name="2"
                  title="商品属性"
                  icon="create_new_folder"
                  :done="step > 2"
                >
                  An ad group contains one or more ads which target a shared set of keywords.
                </q-step>

                <q-step
                  :name="3"
                  title="商品描述"
                  icon="assignment"
                  :done="step > 3"
                >
                  <div class="row q-col-gutter-md q-mt-xs">
                    <div class="col-12 col-md-4 col-lg-4">
                      <label for="volume"> 商品详细描述</label>
                      <div class="q-mt-sm">
                        <q-input
                          outlined
                          dense
                          no-error-icon
                          v-model.trim="form.storeCount"
                          placeholder="请输入商品体积"
                          class="q-mt-sm"
                        >
                        </q-input>
                      </div>
                    </div>
                    <div class="col-12 col-md-4 col-lg-4">
                      <label for="volume"> 商品手机端描述</label>
                      <div class="q-mt-sm">
                        <q-input
                          outlined
                          dense
                          no-error-icon
                          v-model.trim="form.storeCount"
                          placeholder="请输入商品体积"
                          class="q-mt-sm"
                        >
                        </q-input>
                      </div>
                    </div>
                    <div class="col-12 col-md-4 col-lg-4">
                      <label for="volume"> 商品原始图</label>
                      <div class="q-mt-sm">
                        <q-input
                          outlined
                          dense
                          no-error-icon
                          v-model.trim="form.storeCount"
                          placeholder="请输入商品体积"
                          class="q-mt-sm"
                        >
                        </q-input>
                      </div>
                    </div>
                    <div class="col-12 col-md-4 col-lg-4">
                      <label for="volume"> 视频</label>
                      <div class="q-mt-sm">
                        <q-input
                          outlined
                          dense
                          no-error-icon
                          v-model.trim="form.storeCount"
                          placeholder="请输入商品体积"
                          class="q-mt-sm"
                        >
                        </q-input>
                      </div>
                    </div>
                  </div>
                </q-step>

                <q-step
                  :name="4"
                  title="销售设置"
                  icon="add_comment"
                  :done="step > 4"
                >
                  Try out different ad text to see what brings in the most customers, and learn how to
                  enhance your ads using features like ad extensions. If you run into any problems with
                  your ads, find out how to tell if they're running and how to resolve approval issues.
                </q-step>
                <q-step
                  :name="5"
                  title="活动配置"
                  icon="add_comment"
                  :done="step > 5"
                >
                  <div class="row q-col-gutter-md q-mt-xs">
                    <div class="col-12 col-md-4 col-lg-4">
                      <label for="volume"> 活动类型</label>
                      <div class="q-mt-sm">
                        <q-input
                          outlined
                          dense
                          no-error-icon
                          v-model.trim="form.storeCount"
                          placeholder="请输入商品体积"
                          class="q-mt-sm"
                        >
                        </q-input>
                      </div>
                    </div>
                  </div>
                </q-step>

                <template v-slot:navigation>
                  <q-stepper-navigation>
                    <q-btn
                      @click="$refs.stepper.next()"
                      color="primary"
                      :label="step === 4 ? 'Finish' : 'Continue'"
                    />
                    <q-btn
                      v-if="step > 1"
                      flat
                      color="primary"
                      @click="$refs.stepper.previous()"
                      label="Back"
                      class="q-ml-sm"
                    />
                  </q-stepper-navigation>
                </template>
              </q-stepper>
            </q-card-section>
            <q-card-section class="q-pa-xl">
              <div class="row q-col-gutter-md q-mt-xs">
                <div class="col-12 col-md-4 col-lg-4">
                  <label for="volume"> 是否虚拟商品</label>
                  <div class="q-mt-sm">
                    <q-input
                      outlined
                      dense
                      no-error-icon
                      v-model.trim="form.storeCount"
                      placeholder="请输入商品体积"
                      class="q-mt-sm"
                    >
                    </q-input>
                  </div>
                </div>
                <div class="col-12 col-md-4 col-lg-4">
                  <label for="volume"> 虚拟商品有效期</label>
                  <div class="q-mt-sm">
                    <q-input
                      outlined
                      dense
                      no-error-icon
                      v-model.trim="form.storeCount"
                      placeholder="请输入商品体积"
                      class="q-mt-sm"
                    >
                    </q-input>
                  </div>
                </div>
                <div class="col-12 col-md-4 col-lg-4">
                  <label for="volume"> 虚拟商品购买上限</label>
                  <div class="q-mt-sm">
                    <q-input
                      outlined
                      dense
                      no-error-icon
                      v-model.trim="form.storeCount"
                      placeholder="请输入商品体积"
                      class="q-mt-sm"
                    >
                    </q-input>
                  </div>
                </div>
                <div class="col-12 col-md-4 col-lg-4">
                  <label for="volume"> 是否允许过期退款</label>
                  <div class="q-mt-sm">
                    <q-input
                      outlined
                      dense
                      no-error-icon
                      v-model.trim="form.storeCount"
                      placeholder="请输入商品体积"
                      class="q-mt-sm"
                    >
                    </q-input>
                  </div>
                </div>
                <div class="col-12 col-md-4 col-lg-4">
                  <label for="volume"> 是否上架</label>
                  <div class="q-mt-sm">
                    <q-input
                      outlined
                      dense
                      no-error-icon
                      v-model.trim="form.storeCount"
                      placeholder="请输入商品体积"
                      class="q-mt-sm"
                    >
                    </q-input>
                  </div>
                </div>
                <div class="col-12 col-md-4 col-lg-4">
                  <label for="volume"> 是否包邮</label>
                  <div class="q-mt-sm">
                    <q-input
                      outlined
                      dense
                      no-error-icon
                      v-model.trim="form.storeCount"
                      placeholder="请输入商品体积"
                      class="q-mt-sm"
                    >
                    </q-input>
                  </div>
                </div>
                <div class="col-12 col-md-4 col-lg-4">
                  <label for="volume"> 商品上架时间</label>
                  <div class="q-mt-sm">
                    <q-input
                      outlined
                      dense
                      no-error-icon
                      v-model.trim="form.storeCount"
                      placeholder="请输入商品体积"
                      class="q-mt-sm"
                    >
                    </q-input>
                  </div>
                </div>
                <div class="col-12 col-md-4 col-lg-4">
                  <label for="volume"> 商品所属类型</label>
                  <div class="q-mt-sm">
                    <q-input
                      outlined
                      dense
                      no-error-icon
                      v-model.trim="form.storeCount"
                      placeholder="请输入商品体积"
                      class="q-mt-sm"
                    >
                    </q-input>
                  </div>
                </div>
                <div class="col-12 col-md-4 col-lg-4">
                  <label for="volume"> 商品规格类型</label>
                  <div class="q-mt-sm">
                    <q-input
                      outlined
                      dense
                      no-error-icon
                      v-model.trim="form.storeCount"
                      placeholder="请输入商品体积"
                      class="q-mt-sm"
                    >
                    </q-input>
                  </div>
                </div>
                <div class="col-12 col-md-4 col-lg-4">
                  <label for="volume"> 购买赠送积分</label>
                  <div class="q-mt-sm">
                    <q-input
                      outlined
                      dense
                      no-error-icon
                      v-model.trim="form.storeCount"
                      placeholder="请输入商品体积"
                      class="q-mt-sm"
                    >
                    </q-input>
                  </div>
                </div>
                <div class="col-12 col-md-4 col-lg-4">
                  <label for="volume"> 积分兑换</label>
                  <div class="q-mt-sm">
                    <q-input
                      outlined
                      dense
                      no-error-icon
                      v-model.trim="form.storeCount"
                      placeholder="请输入商品体积"
                      class="q-mt-sm"
                    >
                    </q-input>
                  </div>
                </div>
                <div class="col-12 col-md-4 col-lg-4">
                  <label for="volume"> 佣金用于分成</label>
                  <div class="q-mt-sm">
                    <q-input
                      outlined
                      dense
                      no-error-icon
                      v-model.trim="form.storeCount"
                      placeholder="请输入商品体积"
                      class="q-mt-sm"
                    >
                    </q-input>
                  </div>
                </div>
                <div class="col-12 col-md-4 col-lg-4">
                  <label for="volume"> 运费模板</label>
                  <div class="q-mt-sm">
                    <q-input
                      outlined
                      dense
                      no-error-icon
                      v-model.trim="form.storeCount"
                      placeholder="请输入商品体积"
                      class="q-mt-sm"
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
import axios from 'axios'
export default {
  name: 'GoodsForm',
  data () {
    return {
      loading: false,
      step: 1,
      brandOptions: [],
      form: {
      }
    }
  },
  mounted () {
    this.onRefresh()
  },
  methods: {
    onRefresh () {
      this.onRequest()
    },
    async onRequest () {
      this.loading = true
      await axios.get('/admin/goods/brand-list', {}).then(response => {
        const { code, data } = response.data
        if (code === '200' && data) {
          this.brandOptions = data
        }
      }).catch(error => {
        console.error(error)
      })
      setTimeout(() => {
        this.loading = false
      }, 200)
    },
    onSubmit (evt) {

    }
  }
}
</script>

<style lang="sass" scoped>

</style>

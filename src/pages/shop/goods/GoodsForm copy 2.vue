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
                    <div class="col-12 col-md-8 col-lg-8">
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
                    <div class="col-12  col-md-4 col-lg-4">
                      <label for="brandInitial"> 商品类型 </label>
                      <q-dialog-tree-select
                        title="商品类型"
                        v-model="form.type"
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
                          clearable
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
                      <label for="weight"> 计量单位</label>
                      <div class="q-mt-sm">
                        <q-input
                          outlined
                          dense
                          no-error-icon
                          v-model.trim="form.weight"
                          placeholder="请输入计量单位"
                          class="q-mt-sm"
                        >
                        </q-input>
                      </div>
                    </div>
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
                          type="number"
                        >
                        </q-input>
                      </div>
                    </div>
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
                          type="number"
                        >
                        </q-input>
                      </div>
                    </div>
                  </div>
                  <!-- <div class="row q-col-gutter-md q-mt-xs">
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
                  </div> -->
                  <div class="row q-col-gutter-md q-mt-xs">
                    <div class="col-12 col-md-4 col-lg-4">
                      <label for="volume"> 评论量</label>
                      <div class="q-mt-sm">
                        <q-input
                          outlined
                          dense
                          no-error-icon
                          v-model.trim="form.storeCount"
                          placeholder="请输入评论量"
                          class="q-mt-sm"
                          type="number"
                        >
                        </q-input>
                      </div>
                    </div>
                    <div class="col-12 col-md-4 col-lg-4">
                      <label for="weight"> 点击量</label>
                      <div class="q-mt-sm">
                        <q-input
                          outlined
                          dense
                          no-error-icon
                          v-model.trim="form.weight"
                          placeholder="请输入点击量"
                          class="q-mt-sm"
                          type="number"
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
                          placeholder="请输入销量"
                          class="q-mt-sm"
                          type="number"
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
                      <label for="volume"> 市场零售价</label>
                      <div class="q-mt-sm">
                        <q-input
                          outlined
                          dense
                          no-error-icon
                          v-model.trim="form.storeCount"
                          placeholder="请输入市场零售价"
                          class="q-mt-sm"
                          type="number"
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
                          placeholder="请输入本店供货价"
                          class="q-mt-sm"
                          type="number"
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
                          placeholder="请输入商品成本价"
                          class="q-mt-sm"
                          type="number"
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
                          placeholder="请输入商品排序"
                          class="q-mt-sm"
                          type="number"
                        >
                        </q-input>
                      </div>
                    </div>
                  </div>
                  <div class="row q-col-gutter-md q-mt-xs">
                    <div class="col-12 col-md-4 col-lg-3">
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
                    <div class="col-12 col-md-4 col-lg-3">
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
                    <div class="col-12 col-md-4 col-lg-3">
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
                    <div class="col-12 col-md-4 col-lg-3">
                      <label for="volume"> 是否上架</label>
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
                </q-step>

                <q-step
                  :name="2"
                  title="商品属性"
                  icon="create_new_folder"
                  :done="step > 2"
                >
                  <div class="row q-col-gutter-md">
                    <div class="col-12 col-md-4 col-lg-4">
                      <label for="ate"> 商品属性</label>
                      <div class="q-mt-sm">
                        <q-select
                          outlined
                          dense
                          no-error-icon
                          v-model="form.goodsType"
                          option-label="typeName"
                          option-value="id"
                          :options="typeOptions"
                          clearable
                          @input="onChangeGoodsType"
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
                  <div class="q-mt-md">
                    <q-markup-table
                      separator="cell"
                      flat
                      bordered
                      v-if="goodsTypeData.length>0"
                    >
                      <thead>
                        <tr>
                          <th class="text-right wd-150">属性名称</th>
                          <th class="text-left">内容</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(item,index) in goodsTypeData"
                          :key="index"
                        >
                          <td class="text-right">{{item.attrName}}</td>
                          <td class="text-left">
                            <template v-if="item.attrType==='0'">
                              <q-input
                                outlined
                                dense
                                no-error-icon
                                v-model.trim="form.goodsSummary"
                                placeholder="请输入属性值"
                                autogrow
                              >
                              </q-input>
                            </template>
                            <template v-else-if="item.attrType==='1' && item.attrValues">
                              <q-radio
                                dense
                                v-model="form.shape"
                                v-for="item in item.attrValues.split(',')"
                                :key="item"
                                :val="item"
                                :label="item"
                                class="q-mr-md"
                              />
                            </template>
                            <template v-else-if="item.attrType==='2' && item.attrValues">
                              <q-checkbox
                                dense
                                v-model="form.atrs"
                                v-for="item in item.attrValues.split(',')"
                                :key="item"
                                :val="item"
                                :label="item"
                                class="q-mr-md"
                              />
                            </template>
                          </td>
                        </tr>
                      </tbody>
                    </q-markup-table>
                  </div>
                </q-step>

                <q-step
                  :name="3"
                  title="商品描述"
                  icon="assignment"
                  :done="step > 3"
                >
                  <div class="row">
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
                      <label for="volume"> 视频</label>
                      <div class="q-mt-sm">
                        <!-- <q-img
                          src="https://placeimg.com/500/300/nature"
                          :ratio="16/9"
                          style="width: 420px"
                        /> -->
                        <q-video
                          :src="`${baseUrl+videoData.fileUrl}?source=preview`"
                          style="width: 420px"
                        />
                        <div class="q-mt-sm">
                          <q-btn
                            label="上传视频"
                            color="primary"
                            @click="uploadVideo"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row q-col-gutter-md q-mt-xs">
                    <div class="col-12">
                      <q-toolbar class="q-pl-none">
                        商品详细描述
                        <q-space />
                        <q-tabs
                          v-model="tab"
                          narrow-indicator
                          align="right"
                          class="text-grey"
                          active-color="primary"
                          indicator-color="primary"
                        >
                          <q-tab
                            name="mobile"
                            label="移动端内容"
                          />
                          <q-tab
                            name="pc"
                            label="PC端内容"
                          />
                        </q-tabs>
                      </q-toolbar>
                      <q-separator />
                      <q-tab-panels
                        v-model="tab"
                        animated
                      >
                        <q-tab-panel
                          name="mobile"
                          class="q-pa-none"
                        >
                          <q-editor
                            v-model="form.content"
                            min-height="25rem"
                            class="q-mt-sm"
                          />
                        </q-tab-panel>
                        <q-tab-panel
                          name="pc"
                          class="q-pa-none"
                        >
                          <q-editor
                            v-model="form.content"
                            min-height="30rem"
                            class="q-mt-sm"
                          />
                        </q-tab-panel>
                      </q-tab-panels>
                    </div>
                  </div>
                </q-step>

                <q-step
                  :name="4"
                  title="规格设置"
                  icon="add_comment"
                  :done="step > 4"
                >
                  <div class="row q-col-gutter-md">
                    <div class="col-12">
                      <label for="volume"> 商品规格多规格</label>
                      <div class="q-mt-sm">
                        <q-markup-table>
                          <thead>
                            <tr>
                              <th class="text-left wd-200">规格名称</th>
                              <th class="text-left wd-200">类型</th>
                              <th class="text-left wd-150">排序</th>
                              <th class="text-left">属性选项（选择类型后点击单元格）</th>
                              <th class="text-left wd-80">操作</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(item,index) in specData"
                              :key="index"
                            >
                              <td>
                                <q-input
                                  outlined
                                  dense
                                  no-error-icon
                                  v-model.trim="item.specName"
                                  placeholder="请输入属性名称"
                                />
                              </td>
                              <td>
                                <q-select
                                  outlined
                                  dense
                                  options-dense
                                  v-model="item.specType"
                                  :options="specTypeOptions"
                                  emit-value
                                  map-options
                                />
                              </td>
                              <td>
                                <q-input
                                  outlined
                                  dense
                                  no-error-icon
                                  v-model.trim="item.sort"
                                  placeholder="请输入排序号"
                                />
                              </td>
                              <td>
                                {{item.specValues}}
                                <!-- {{item.specType===0?item.specValues=null:null}} -->
                                <q-popup-edit
                                  buttons
                                  v-model="item.specValues"
                                >
                                  <q-input
                                    type="textarea"
                                    v-model="item.specValues"
                                    autofocus
                                    counter
                                    @keyup.enter.stop
                                  />
                                  <div style="font-size:12px;">
                                    回车换行或逗号分隔属性
                                  </div>
                                </q-popup-edit>
                              </td>
                              <td class="q-gutter-xs action">
                                <a
                                  v-if="item.id"
                                  class="text-primary"
                                  href="javascript:;"
                                  v-del:refresh="{id:item.id, url:'/admin/goods/attribute-delete'}"
                                >删除</a>
                                <a
                                  v-else
                                  class="text-primary"
                                  href="javascript:;"
                                  @click="onRemoveRow(index)"
                                >删除</a>
                              </td>
                            </tr>
                          </tbody>
                        </q-markup-table>
                        <q-btn
                          label="新增一行"
                          color="primary"
                          class="q-mt-md q-mb-md"
                          @click="onAddRow"
                        />
                        <q-btn
                          label="同步一下"
                          color="primary"
                          class="q-ma-md"
                          @click="onOpecDataSyn"
                        />
                        <q-markup-table separator="cell">
                          <thead>
                            <tr>
                              <th
                                class="text-center"
                                :colspan="specData.length"
                              >商品规格</th>
                              <th
                                class="text-center wd-150"
                                rowspan="2"
                              >销售价格</th>
                              <th
                                class="text-center wd-150"
                                rowspan="2"
                              >市场价格</th>
                              <th
                                class="text-center wd-150"
                                rowspan="2"
                              > 库存</th>
                              <th
                                class="text-center wd-150"
                                rowspan="2"
                              >体积</th>
                              <th
                                class="text-center wd-150"
                                rowspan="2"
                              >重量</th>
                            </tr>
                            <tr>
                              <td
                                v-for="(item,index) in specData"
                                :key="index"
                                class="text-center"
                              >
                                {{item.specName}}
                              </td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(item,index) in specValueData"
                              :key="index"
                            >
                              <td
                                v-for="(ff,dd) in item.split(',')"
                                :key="dd"
                              >
                                {{ff}}
                              </td>
                              <td>
                                <q-input
                                  outlined
                                  dense
                                  no-error-icon
                                  v-model.trim="item.sort"
                                  type="number"
                                />
                              </td>
                              <td>
                                <q-input
                                  outlined
                                  dense
                                  no-error-icon
                                  v-model.trim="item.sort"
                                  type="number"
                                />
                              </td>
                              <td>
                                <q-input
                                  outlined
                                  dense
                                  no-error-icon
                                  v-model.trim="item.sort"
                                  type="number"
                                />
                              </td>
                              <td>
                                <q-input
                                  outlined
                                  dense
                                  no-error-icon
                                  v-model.trim="item.sort"
                                  type="number"
                                />
                              </td>
                              <td>
                                <q-input
                                  outlined
                                  dense
                                  no-error-icon
                                  v-model.trim="item.sort"
                                  type="number"
                                />
                              </td>
                            </tr>
                          </tbody>
                        </q-markup-table>
                      </div>
                    </div>
                  </div>
                  <!-- <div class="row q-col-gutter-md q-mt-xs">
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
                  </div> -->
                  <!-- <div class="row q-col-gutter-md q-mt-xs">

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
                  </div> -->
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
                      :label="step === 5 ? '完成' : '下一页'"
                    />
                    <q-btn
                      v-if="step > 1"
                      flat
                      color="primary"
                      @click="$refs.stepper.previous()"
                      label="返回"
                      class="q-ml-sm"
                    />
                  </q-stepper-navigation>
                </template>
              </q-stepper>
            </q-card-section>
            <!-- <q-card-section class="q-pa-xl">
            </q-card-section> -->
            <!-- <q-separator />
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
            </q-card-actions> -->
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
      step: 3,
      tab: 'mobile',
      brandOptions: [],
      typeOptions: [],
      goodsTypeData: [],
      imageData: [],
      videoData: {},
      form: {
        atrs: [],
        imagesUrl: ['/userfiles/fileupload/202009/2.jpg'],
        imagesUrl1: ['/userfiles/fileupload/202009/san.mp4'],
        content: ''
      },
      specTypeOptions: [
        { label: '文本', value: 0 },
        { label: '颜色', value: 1 },
        { label: '图片', value: 2 }
      ],
      specData: [],
      specValueData: [],
      spec: { id: null, specName: null, specId: this.$route.params.id, specType: 0, specValues: null, sort: '0' }
    }
  },
  mounted () {
    this.onRefresh()
  },
  watch: {

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
      await axios.get('/admin/goods/type-list', {}).then(response => {
        const { code, data } = response.data
        if (code === '200' && data) {
          this.typeOptions = data
        }
      }).catch(error => {
        console.error(error)
      })
      setTimeout(() => {
        this.loading = false
      }, 200)
    },
    async onChangeGoodsType (value) {
      if (value && value.id) {
        this.loading = true
        await axios.get('/admin/goods/type-detail', { params: { id: value.id } }).then(response => {
          const { code, data } = response.data
          if (code === '200' && data) {
            this.goodsTypeData = data.goodsAttributes
            console.log(this.goodsTypeData)
          }
        }).catch(error => {
          console.error(error)
        })
        setTimeout(() => {
          this.loading = false
        }, 200)
      } else {
        this.goodsTypeData = []
      }
    },
    uploadVideo () {
      this.$q.dialog({
        component: DialogUploader,
        parent: this
      }).onOk(e => {
        console.log('OK')
        this.videoData = e
      })
    },
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
    onAddRow () {
      const _spec = { ...this.spec }
      this.specData.push(_spec)
    },
    onRemoveRow (index) {
      this.specData.splice(index, 1)
    },
    onSubmit (evt) {

    },
    onOpecDataSyn () {
      let tempArrays = []
      this.specData.map((item, index) => {
        if (item.specValues) {
          // console.log(index)
          // console.log(item.specValues.split('\n'))
          // this.specValueData.push(item.specValues.split('\n'))
          tempArrays.push(item.specValues.split('\n'))
        }
      })
      this.specValueData = this.doExchange(tempArrays)
    },
    doExchange (doubleArrays) {
      var len = doubleArrays.length
      if (len >= 2) {
        var len1 = doubleArrays[0].length
        var len2 = doubleArrays[1].length
        var newlen = len1 * len2
        var temp = new Array(newlen)
        var index = 0
        for (var i = 0; i < len1; i++) {
          for (var j = 0; j < len2; j++) {
            temp[index] = doubleArrays[0][i] + ',' + doubleArrays[1][j]
            index++
          }
        }
        var newArray = new Array(len - 1)
        for (var ik = 2; ik < len; ik++) {
          newArray[ik - 1] = doubleArrays[ik]
        }
        newArray[0] = temp
        return this.doExchange(newArray)
      } else if (len === 1) {
        return doubleArrays[0]
      } else {
        return doubleArrays
      }
    }
  }
}
</script>
<style lang="sass" scoped>
.image-header
  background: linear-gradient(180deg,rgba(0,0,0,0.7) 20%,transparent)
</style>

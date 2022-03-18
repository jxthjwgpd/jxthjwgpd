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
          <q-breadcrumbs-el label="商品属性" />
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
          <q-route-tab to="/goods/attribute">属性列表</q-route-tab>
          <q-route-tab :to="`/goods/attribute/form${form.id!=null?'/'+form.id:''}`">{{form.id!=null?'编辑':'新增'}}属性</q-route-tab>
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
                <div class="col-12">
                  <label for="typeName"> 分类名称</label>
                  <q-input
                    outlined
                    dense
                    no-error-icon
                    v-model.trim="form.typeName"
                    placeholder="请输入分类名称"
                    :rules="[ val => val && val.length > 0 || '请设置分类名称']"
                    class="q-mt-sm"
                  >
                  </q-input>
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
                <div class="col-12">
                  <label for="attribute"> 属性 </label>
                  <div class="q-mt-md">
                    <q-markup-table>
                      <thead>
                        <tr>
                          <th class="text-left wd-200">属性名称</th>
                          <th class="text-left wd-200">类型</th>
                          <th class="text-left wd-150">排序</th>
                          <th class="text-left">属性选项（选择类型后点击单元格）</th>
                          <th class="text-left wd-80">操作</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(item,index) in attrData"
                          :key="index"
                        >
                          <td>
                            <q-input
                              outlined
                              dense
                              no-error-icon
                              v-model.trim="item.attrName"
                              placeholder="请输入属性名称"
                            />
                          </td>
                          <td>
                            <q-select
                              outlined
                              dense
                              options-dense
                              v-model="item.attrType"
                              :options="attrTypeOptions"
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
                            {{item.attrValues}}
                            {{item.attrType===0?item.attrValues=null:null}}
                            <q-popup-edit
                              v-if="item.attrType!==0"
                              buttons
                              v-model="item.attrValues"
                            >
                              <q-input
                                type="textarea"
                                v-model="item.attrValues"
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
                      class="q-mt-md"
                      @click="onAddRow"
                    />
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
  name: 'AttributeForm',
  data () {
    return {
      loading: false,
      form: {
        id: this.$route.params.id
      },
      attrTypeOptions: [
        { label: '手动输入', value: 0 },
        { label: '单选', value: 1 },
        { label: '复选', value: 2 }
      ],
      attrData: [],
      attr: { id: null, attrName: null, typeId: this.$route.params.id, attrType: 0, attrValues: null, sort: '0' }
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
      await axios.get('/admin/goods/type-detail', { params: { id: this.form.id } }).then(response => {
        const { code, data } = response.data
        if (code === '200' && data) {
          this.form = data.goodsType
          this.attrData = data.goodsAttributes
        }
      }).catch(error => {
        console.error(error)
      })
      setTimeout(() => {
        this.loading = false
      }, 200)
    },
    async onSubmit () {
      this.loading = true
      delete this.form.created
      delete this.form.status
      this.attrData.filter(e => e.attrValues).forEach(e => {
        e.attrValues = e.attrValues.replace(/\r\n/g, ',').replace(/\r/g, ',').replace(/\n/g, ',').replace(/,{2,}/g, ',')
      })
      const goodsTypeVo = {
        goodsType: this.form,
        goodsAttributes: this.attrData
      }
      await axios.post(`/admin/goods/type${this.form.id ? '-update' : 's'}`, goodsTypeVo).then(response => {
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
    },
    onAddRow () {
      const _attr = { ...this.attr }
      this.attrData.push(_attr)
    },
    onRemoveRow (index) {
      if (index) {
        this.attrData.splice(index, 1)
      }
    }
  }
}
</script>

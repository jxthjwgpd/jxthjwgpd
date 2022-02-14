<template>
  <q-page class="my-page">
    <!-- <div class="row items-center justify-between">
      <div class="my-page-header q-pb-none">
        <q-breadcrumbs align="left">
          <q-breadcrumbs-el
            label="首页"
            to="/"
          />
          <q-breadcrumbs-el
            label="系统设置"
            to="/system"
          />
          <q-breadcrumbs-el label="菜单管理" />
        </q-breadcrumbs>
      </div>
    </div> -->

    <div class="my-page-body-none">
      <div class="menu-f">
        <div class="menu-f-sider">
          <div class="menu-f-sider-header row items-center justify-center">
            <q-btn
              label="新增菜单"
              color="primary"
              size="12px"
            />
          </div>
          <div class="menu-f-sider-body">
            <q-scroll-area class="fit">
              <q-tree
                :nodes="treeData"
                node-key="id"
                label-key="name"
                selected-color="primary"
                :selected.sync="selected"
                default-expand-all
              />
            </q-scroll-area>
          </div>
        </div>
        <div class="menu-f-body">
          <div class="menu-f-body-header  row items-center justify-center q-pl-md">
            <q-chip
              v-show="loading"
              size="12px"
              color="primary"
              text-color="white"
            >
              <label class="q-mr-sm">正在编辑</label>
              <q-spinner-dots size="1.5em" />
            </q-chip>
          </div>
          <div class="menu-f-body-content q-pt-lg container">
            <q-card flat>
              <q-card-section>
                <q-icon name="last_page" /> 表单信息
              </q-card-section>
              <q-separator />
              <q-card-section class="q-pa-xl">
                <q-form class="my-form ">
                  <div class="row q-col-gutter-md">
                    <div class="col-12 col-lg-4">
                      <label for="username"> 上级菜单 </label>
                      <q-input
                        outlined
                        dense
                        no-error-icon
                        v-model.trim="form.pid"
                        placeholder="请输入上级菜单"
                        class="q-mt-sm"
                      />
                    </div>
                    <div class="col-12 col-lg-2">
                      <label for="username"> 菜单类型 </label>
                      <q-select
                        outlined
                        dense
                        options-dense
                        v-model="form.menuType"
                        :options="menuTypeOptions"
                        emit-value
                        map-options
                        class="q-mt-sm"
                      />
                    </div>
                    <div class="col-12 col-lg-6">
                      <label for="username"> 菜单名称 </label>
                      <q-input
                        outlined
                        dense
                        no-error-icon
                        v-model.trim="form.menuName"
                        placeholder="请输入菜单名称"
                        :rules="[ val => val && val.length > 0 || '请设置菜单名称']"
                        class="q-mt-sm"
                      >
                        <template v-slot:prepend>
                          <q-icon :name="form.icon" />
                        </template>
                      </q-input>
                    </div>
                    <div class="col-12 col-lg-12">
                      <label for="username"> 菜单地址 </label>
                      <q-input
                        outlined
                        dense
                        no-error-icon
                        v-model.trim="form.menuPath"
                        placeholder="请输入菜单地址"
                        class="q-mt-sm"
                      />
                    </div>
                    <div class="col-12 col-lg-6">
                      <label for="username"> 权限代码 </label>
                      <q-input
                        outlined
                        dense
                        no-error-icon
                        v-model.trim="form.permission"
                        placeholder="请输入权限代码"
                        class="q-mt-sm"
                      />
                    </div>
                    <div class="col-12 col-lg-6">
                      <label for="username"> 菜单排序 </label>
                      <q-input
                        outlined
                        dense
                        no-error-icon
                        v-model.trim="form.sort"
                        placeholder="请输入菜单排序"
                        class="q-mt-sm"
                        type="number"
                      />
                    </div>
                    <div class="col-12 col-lg-6">
                      <label for="username"> 徽章提示 </label>
                      <q-input
                        outlined
                        dense
                        no-error-icon
                        v-model.trim="form.badge"
                        placeholder="请输入提示内容"
                        class="q-mt-sm"
                      />
                    </div>
                  </div>
                  <div class="row q-mt-md">
                    <div class="col-12">
                      <label for="username"> 展开 </label>
                      <div class="q-mt-sm q-gutter-sm">
                        <q-radio
                          v-model="form.opened"
                          val="1"
                          label="是"
                          dense
                        />
                        <q-radio
                          v-model="form.opened"
                          val="0"
                          label="否"
                          dense
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row q-mt-md">
                    <div class="col-12">
                      <label for="username"> 显示 </label>
                      <div class="q-mt-sm q-gutter-sm">
                        <q-radio
                          v-model="form.isShow"
                          val="1"
                          label="是"
                          dense
                        />
                        <q-radio
                          v-model="form.isShow"
                          val="0"
                          label="否"
                          dense
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row q-mt-md">
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
                  </div>
                </q-form>
              </q-card-section>
              <q-separator />
              <q-card-actions class="q-pa-xl q-mb-lg">
                <q-btn
                  color="primary"
                  class="wd-80"
                >保存</q-btn>
                <q-btn class="wd-80">重置</q-btn>
                <q-space />
                <q-btn
                  color="negative"
                  class="wd-80"
                >删除</q-btn>
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>

      <!-- <div class="my-table">
        <q-table
          :data="data"
          :columns="columns"
          row-key="id"
          :pagination.sync="pagination"
          :loading="loading"
          @request="onRequest"
          binary-state-sort
          square
        >

          <template v-slot:top-left>

          </template>

          <template v-slot:no-data="{ message }">
            <div class="full-width row flex-center q-gutter-sm q-pa-lg">
              <span>
                {{ message }}
              </span>
            </div>
          </template>

          <template v-slot:body="props">
            <MenuTreeItem :lists="props" />
          </template>
        </q-table>
      </div> -->
    </div>
  </q-page>
</template>

<script>
import axios from 'axios'
// import MenuTreeItem from './MenuTreeItem.vue'
export default {
  name: 'MenuList',
  // components: {
  //   MenuTreeItem
  // },
  data () {
    return {
      loading: false,
      treeData: [],
      selected: null,
      menuTypeOptions: [
        { label: '菜单', value: '1' },
        { label: '权限', value: '2' }
      ],
      form: {
        sort: 10,
        opened: '0',
        isShow: '1'
      },
      smd5: null
    }
  },
  mounted () {
    this.onRefresh()
  },
  watch: {
    'selected' () {
      if (this.selected) {
        this.onRefeshMenuDetail()
      }
    }
  },
  methods: {
    onRefresh () {
      this.onRequest()
    },
    async onRequest () {
      this.loading = true
      await axios.get('/admin/menus/tree', {}).then(response => {
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
    async onRefeshMenuDetail () {
      this.loading = true
      await axios.get('/admin/menus/detail', { params: { id: this.selected } }).then(response => {
        const { code, data } = response.data
        if (code === '200' && data.menu) {
          this.form = data.menu
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
.menu-f
  position: relative
  &-sider
    &-header
      border-right: 1px solid #eee
      border-bottom: 1px solid #eee
      position: fixed
      top: 50px
      width: 260px
      height: 48px
      background: #fff
    &-body
      border-right: 1px solid #eee
      position: fixed
      top: 98px
      bottom: 0
      width: 260px
      background: #fff
  &-body
    position: absolute
    top: 0
    left: 260px
    right: 0
    bottom: 0
    &-header
      height: 48px
      background: #fff
    &-content
      position: absolute
      top: 48px
      left: 0
      right: 0
      bottom: 0
</style>

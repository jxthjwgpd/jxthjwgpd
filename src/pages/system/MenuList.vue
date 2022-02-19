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
                no-connectors
              />
            </q-scroll-area>
          </div>
        </div>
        <div class="menu-f-body">
          <div class="menu-f-body-header row items-center justify-center q-pl-md">
            <q-chip
              v-show="loading"
              size="12px"
              color="primary"
              text-color="white"
            >
              <label class="q-mr-sm">正在编辑</label>
              <q-spinner-dots size="1.5em" />
            </q-chip>
            <div v-show="!loading">菜单管理</div>
          </div>
          <div class="menu-f-body-content">
            <div class=" q-pt-lg container">
              <q-card flat>
                <q-card-section>
                  <q-icon name="last_page" /> 表单信息
                </q-card-section>
                <q-separator />
                <q-form
                  class="my-form "
                  @submit="onSubmit"
                >
                  <q-card-section class="q-pa-xl">
                    <div class="row q-col-gutter-md">
                      <div class="col-12 col-lg-4">
                        <label for="username"> 上级菜单 </label>
                        <q-input
                          outlined
                          dense
                          no-error-icon
                          v-model.trim="pNodeName"
                          placeholder="请输入上级菜单"
                          class="q-mt-sm"
                        >
                          <template v-slot:append>
                            <q-icon
                              name="low_priority"
                              @click="fixed=!fixed"
                            />
                          </template>
                        </q-input>
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
                          <template v-slot:append>
                            <q-icon
                              name="low_priority"
                              @click="fixed1=!fixed1"
                            />
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
                  </q-card-section>
                  <q-separator />
                  <q-card-actions class="q-pa-xl q-mb-lg">
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
              </q-card>
            </div>
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
    <q-dialog v-model="fixed">
      <q-card
        class="my-dialog"
        style="min-width:320px;"
      >
        <q-toolbar>
          <q-toolbar-title>上级菜单</q-toolbar-title>
          <q-btn
            flat
            round
            dense
            icon="close"
            v-close-popup
          />
        </q-toolbar>
        <q-separator />
        <q-card-section style="height: 36vh;">
          <q-scroll-area class="fit">
            <q-tree
              :nodes="treeData"
              node-key="id"
              label-key="name"
              selected-color="primary"
              :selected.sync="menuId"
            />
          </q-scroll-area>
        </q-card-section>
        <q-separator />

        <q-card-actions
          align="right"
          class="q-dialog-footer"
        >
          <q-btn
            :label="$q.lang.label.ok"
            color="primary"
            type="submit"
            @click="getNode(menuId)"
            v-close-popup
          />
          <q-btn
            :label="$q.lang.label.clear"
            @click="clearNode()"
            v-close-popup
          />
          <q-btn
            :label="$q.lang.label.cancel"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="fixed1">
      <q-card
        class="my-dialog"
        style="min-width:760px;"
      >
        <q-toolbar>
          <q-toolbar-title>图标选择</q-toolbar-title>
          <q-btn
            flat
            round
            dense
            icon="close"
            v-close-popup
          />
        </q-toolbar>
        <q-separator />
        <q-card-section style="height: 38vh; row column">
          <q-scroll-area
            class="fit"
            ref="scrollArea"
          >
            <div class="col q-col-gutter-xs">
              <q-btn
                flat
                v-for="icon in displayedIcons"
                :key="icon.name"
                :icon="icon.name"
                :color="`${(iconSelected && iconSelected===icon.name)?'primary':null}`"
                @click="iconSelected=icon.name"
              />
            </div>
          </q-scroll-area>
        </q-card-section>
        <q-separator />

        <q-card-section class="q-pa-sm flex flex-center">
          <q-pagination
            v-model="pagination.page"
            :max="pagination.totalPages"
            :input="true"
          >
          </q-pagination>
        </q-card-section>
        <q-card-actions class="q-dialog-footer">
          <q-chip
            square
            color="primary"
            text-color="white"
            :icon="iconSelected"
            v-show="iconSelected"
          >
            {{iconSelected}}
          </q-chip>
          <q-space />
          <q-btn
            :label="$q.lang.label.ok"
            color="primary"
            type="submit"
            @click="getIcon()"
            v-close-popup
          />
          <q-btn
            :label="$q.lang.label.clear"
            @click="clearIcon()"
            v-close-popup
          />
          <q-btn
            :label="$q.lang.label.cancel"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
        { label: '菜单', value: '1' }
        // { label: '权限', value: '2' }
      ],
      form: {
        sort: 10,
        opened: '0',
        isShow: '1',
        menuType: '1',
        id: null,
        pid: null,
        menuName: null,
        menuPath: null,
        permission: null,
        icon: null,
        badge: null
      },
      menuId: null,
      pNodeId: null,
      pNodeName: null,
      node: null,
      parentNode: null,
      smd5: null,
      fixed: false,
      fixed1: false,
      iconsList: [],
      iconSelected: null,
      pagination: {
        page: 1,
        itemsPerPage: 96,
        totalPages: 0
      }
    }
  },
  beforeMount () {
    if (this.pagination) {
      this.$emit('update:pagination', { ...this.computedPagination })
    }
  },
  mounted () {
    this.onRefresh()

    this.__loadIconSet('material-icons')

    this.__updatePagination()
  },
  computed: {
    filteredIcons () {
      let icons = this.iconsList
      if (icons) {
        if (this.tags !== void 0 && this.tags !== '' && this.tags !== null && this.tags.length > 0) {
          icons = icons.filter(icon => {
            const t = icon.tags.filter(tag => this.tags.includes(tag))
            if (t.length > 0) {
              return icon
            }
          })
        }
        if (this.filter !== void 0 && this.filter !== '' && this.filter !== null) {
          icons = icons.filter(icon => icon.name.includes(this.filter))
        }
      }
      return icons
    },
    displayedIcons () {
      let icons = []
      if (this.iconsList) {
        icons = this.filteredIcons
        // should the icons be paged?
        if (this.pagination && this.pagination.itemsPerPage !== 0) {
          icons = icons.slice(this.firstItemIndex, this.lastItemIndex)
        }
      }
      return icons
    },
    computedPagination () {
      return this.__fixPagination({
        ...this.pagination
      })
    },
    // index of first item on a page
    firstItemIndex () {
      const { page, itemsPerPage } = this.computedPagination
      return (page - 1) * itemsPerPage
    },

    // index of last item on a page
    lastItemIndex () {
      const { page, itemsPerPage } = this.computedPagination
      return page * itemsPerPage
    },

    // returns true if on first page
    isFirstPage () {
      return this.computedPagination.page === 1
    },

    // the number of pages available based on itemsPerPage
    pagesNumber () {
      return this.computedPagination.itemsPerPage === 0
        ? 1
        : Math.max(
          1,
          Math.ceil(this.filteredIcons.length / this.computedPagination.itemsPerPage)
        )
    },

    // returns true if on last page
    isLastPage () {
      return this.lastItemIndex === 0
        ? true
        : this.computedPagination.page >= this.pagesNumber
    }
  },
  watch: {
    'selected' () {
      if (this.selected) {
        this.onRefeshMenuDetail()
      }
    },
    'pNodeId' () {
      if (this.pNodeId) {
        this.getNode(this.pNodeId)
      }
    },
    'iconsList' (val) {
      if (this.iconsList !== void 0 && this.iconsList.length > 0) {
        this.__updatePagination()
        this.$nextTick(() => {
          // whenever the icon set changes, it resets pagination page to page 1
          this.__setPagination({ page: 1 })
        })
        // scroll to top of QScrollArea, if applicable
        // this.$refs.scrollArea.setScrollPosition(0)
      }
    },
    'pagination' (newVal, oldVal) {
      if (!this.__samePagination(oldVal, newVal)) {
        this.__updatePagination()
      }
    },
    'pagination.itemsPerPage' () {
      this.__updatePagination()
    },

    'pagination.page' () {
      this.__updatePagination()
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
          this.pNodeId = data.menu.pid
          this.iconSelected = data.menu.icon
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
      delete this.form.status
      delete this.form.pids
      this.form.pid = this.pNodeId
      this.form.icon = this.iconSelected
      console.log(this.form)
      await axios.post('/admin/menus', this.form).then(response => {
        const { code, message, data } = response.data
        if (code === '200' && data) {
          console.log(data)
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
      }, 500)
    },
    getNode (id) {
      if (!id) return
      this.menuId = id
      this.node = null
      this.parentNode = null
      this.pNodeId = null
      this.pNodeName = null
      const { node } = this.getParent(this.treeData, id)
      if (node) {
        this.pNodeId = node.id
        this.pNodeName = node.name
      }
    },
    clearNode () {
      this.node = null
      this.parentNode = null
      this.pNodeId = '0'
      this.pNodeName = null
    },
    getParent (list, id) {
      if (list && list.length > 0) {
        for (var i = 0; i < list.length; i++) {
          if (this.node) {
            break
          }
          let item = list[i]
          if (!item || !item.id) {
            continue
          }
          if (item.id === id) {
            this.node = item
            break
          } else {
            if (item.children && item.children.length > 0) {
              this.parentNode = item
              this.getParent(item.children, id)
            } else {
              continue
            }
          }
        }
      }
      if (!this.node) {
        this.parentNode = null
      }
      return {
        parentNode: this.parentNode,
        node: this.node
      }
    },
    // icon
    __loadIconSet (iconSet) {
      if (iconSet) {
        this.loading = true
        // detect if UMD version is installed
        if (window.IconPicker) {
          const name = iconSet.replace(/-([a-z])/g, g => g[1].toUpperCase())
          if (window.IconPicker.iconSet && window.IconPicker.iconSet[name]) {
            const iconsSet = window.IconPicker.iconSet[name]
            this.iconsList = iconsSet.icons
          } else {
            /* eslint-disable */
            console.error('IconPicker: no icon set loaded called ' + iconSet + '\'')
            console.error('Be sure to load the UMD version of the icon set in a script tag before using QIconPicker UMD version')
            /* eslint-enable */
          }
        } else {
          try {
            const iconsSet = require('assets/icon-set/' + iconSet + '.js').default
            this.iconsList = iconsSet.icons
          } catch (e) {
            // eslint-disable-next-line no-console
            console.error('IconPicker: cannot find icon set found called ' + iconSet + '\'')
          }
        }
        this.loading = false
      }
    },
    __fixPagination (p) {
      if (p.page < 1) {
        p.page = 1
      }
      if (p.itemsPerPage === void 0 || p.itemsPerPage < 1) {
        p.itemsPerPage = 0 // all
      }
      return p
    },
    // returns true if the pagination is the same,
    // otherwise returns false if it has changed
    __samePagination (oldPag, newPag) {
      // eslint-disable-next-line no-unused-vars
      for (const prop in newPag) {
        if (newPag[prop] !== oldPag[prop]) {
          return false
        }
      }
      return true
    },

    __setPagination (val) {
      const newPagination = this.__fixPagination({
        ...this.computedPagination,
        ...val
      })

      // if (this.pagination) {
      //   this.$emit('update:pagination', newPagination)
      // } else {
      this.pagination = newPagination
      // }
    },

    __updatePagination () {
      if (this.pagination !== void 0) {
        this.__setPagination({ total: this.filteredIcons.length, totalPages: this.pagesNumber })
      }
    },

    // public function - goes to previous page
    prevPage () {
      const { page } = this.computedPagination
      if (page > 1) {
        this.__setPagination({ page: page - 1 })
      }
    },

    // public function - goes to next page
    nextPage () {
      const { page, itemsPerPage } = this.computedPagination
      if (this.lastItemIndex > 0 && page * itemsPerPage < this.filteredIcons.length) {
        this.__setPagination({ page: page + 1 })
      }
    },
    getIcon () {
      if (this.iconSelected) {
        this.form.icon = this.iconSelected
      }
    },
    clearIcon () {
      this.form.icon = null
      this.iconSelected = null
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

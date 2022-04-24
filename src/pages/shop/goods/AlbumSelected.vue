<template>
  <q-dialog
    ref="dialog"
    @hide="hide"
  >
    <q-card
      class="my-dialog"
      style="min-width:860px;"
    >
      <q-toolbar>
        <q-toolbar-title>选择图片</q-toolbar-title>
        <q-btn
          flat
          label="创建相册"
          @click="createDialog=!createDialog"
        />
        <q-btn
          flat
          label="上传图片"
          @click="uploadDialog=!uploadDialog"
        />
        <q-btn
          flat
          round
          dense
          icon="close"
          v-close-popup
        />
      </q-toolbar>
      <q-separator />
      <q-card-section class="scroll q-mt-none">
        <div class="
            row
            q-col-gutter-md">
          <div class="col-3">
            <q-card
              flat
              bordered
              style="height: 460px;"
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
          <div class="col-9">
            <q-card
              flat
              bordered
            >
              <div
                class="scroll q-pa-xs"
                style="height: 460px;"
              >
                <div class="row q-col-gutter-xs">
                  <div
                    v-for="album in albumData"
                    :key="album.id"
                    class="col-2"
                  >
                    <q-img
                      :src="baseUrl + album.albumCover"
                      style="height: 100px;border:1px solid #eee"
                      v-if="album.albumCover"
                    />
                    <div
                      v-else
                      class="flex flex-center"
                      style="height: 100px; width:98px; border:1px solid #eee"
                    >
                      无封面
                    </div>
                    <a
                      style="font-size:10px"
                      class="text-primary "
                      href="javascript:;"
                      @click="selected = album.id"
                    >
                      <q-icon
                        name="folder_open"
                        size="14px"
                      /> {{album.albumName}}
                    </a>
                  </div>
                  <div
                    v-for="album in albumFileData"
                    :key="album.id"
                    class="col-2 marker"
                  >
                    <div
                      class="marker-icon marker-top-right pos-absolute t-0 r-0"
                      v-if="album.done"
                    >
                      <q-icon name="done" />
                    </div>
                    <q-img
                      :src="baseUrl + album.fileUrl"
                      style="height: 100px;border:1px solid #eee"
                      @click="onFileSelect(album)"
                    />
                    <a
                      style="font-size:10px"
                      class="text-primary "
                      href="javascript:;"
                    >
                      <q-icon
                        name="image"
                        size="14px"
                      /> {{album.fileName}}
                    </a>

                  </div>
                </div>
                <div class="absolute-bottom row justify-center">
                  <q-pagination
                    v-model="pagination.current"
                    :max="pagination.pages"
                    :input="true"
                  >
                  </q-pagination>
                </div>
              </div>
            </q-card>
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-actions
        align="right"
        class="q-dialog-footer"
      >
        <div v-if="size>0">可选择 {{ fileCount }} 张</div>
        <q-space />
        <q-btn
          :label="$q.lang.label.ok"
          color="primary"
          @click="onOk"
        />
        <q-btn
          :label="$q.lang.label.cancel"
          v-close-popup
        />
      </q-card-actions>
      <q-inner-loading :showing="loading">
        <q-spinner-hourglass
          size="sm"
          color="primary"
        />
      </q-inner-loading>
    </q-card>
    <q-dialog v-model="createDialog">
      <q-card
        class="my-dialog"
        style="min-width:480px;"
      >
        <q-toolbar>
          <q-toolbar-title>创建相册</q-toolbar-title>
          <q-btn
            flat
            round
            dense
            icon="close"
            v-close-popup
          />
        </q-toolbar>
        <q-separator />
        <q-form
          class="my-form gutter"
          @submit="saveAlbum"
        >
          <q-card-section class="q-pa-md q-gutter-y-md">
            <div class="row q-form-item">
              <div class="col-3 q-label text-right required">
                <label for="albumName">
                  相册名称
                </label>
              </div>
              <div class="col-8">
                <q-input
                  outlined
                  dense
                  no-error-icon
                  v-model.trim="albumForm.albumName"
                  placeholder="请输入相册名称"
                  :rules="[ val => val && val.length > 0 || '请设置相册名称']"
                />
              </div>
            </div>
            <div class="row q-form-item">
              <div class="col-3 q-label text-right">
                <label for="sort">
                  排序
                </label>
              </div>
              <div class="col-8">
                <q-input
                  outlined
                  dense
                  no-error-icon
                  v-model.trim="albumForm.sort"
                  placeholder="请输入排序号"
                />
              </div>
            </div>
          </q-card-section>
          <q-card-actions
            align="right"
            class="q-dialog-footer"
          >
            <q-btn
              :label="$q.lang.label.ok"
              color="primary"
              type="submit"
            />
            <q-btn
              :label="$q.lang.label.cancel"
              v-close-popup
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
    <q-dialog v-model="uploadDialog">
      <q-card class="my-dialog">
        <q-card-section class="q-pa-none">
          <q-uploader
            label="上传文件"
            :url="`${baseUrl}/uploader`"
            flat
            multiple
            auto-upload
            @uploaded="uploaded"
          >
          </q-uploader>
        </q-card-section>
        <q-card-actions
          align="right"
          class="q-dialog-footer"
        >
          <q-btn
            :label="$q.lang.label.ok"
            color="primary"
            @click="saveUploaded"
          />
          <q-btn
            :label="$q.lang.label.cancel"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-dialog>
</template>

<script>
import axios from 'axios'
export default {
  name: 'DialogImageSelect',
  data () {
    return {
      baseUrl: axios.defaults.baseURL,
      loading: false,
      treeData: [],
      selected: null,
      albumData: [],
      albumFileData: [],
      pagination: {
        current: 1,
        pages: 1
      },
      fileValue: [],
      createDialog: false,
      uploadDialog: false,
      uploadFiles: [],
      albumForm: {}
    }
  },
  props: {
    size: {
      type: Number,
      default: 0
    }
  },
  mounted () {
    this.onRequest()
  },
  watch: {
    selected () {
      if (this.selected) {
        this.onRequestGoodsAlbums()
        this.onRequestGoodsAlbumFiles()
      }
    },
    albumFileData () {
      this.albumFileData.forEach(a => {
        this.fileValue.forEach(b => {
          if (a.fileId === b.fileId) {
            a.done = true
          }
        })
      })
    }
  },
  computed: {
    fileCount () {
      return this.size - this.fileValue.length
    }
  },
  methods: {
    async onRequest () {
      this.loading = true
      await axios.get('/admin/goods/album-tree', {}).then(response => {
        const { code, data } = response.data
        if (code === '200' && data) {
          this.treeData = data
          if (data[0]) {
            this.selected = data[0].id
          }
        }
      }).catch(error => {
        console.error(error)
      })
      setTimeout(() => {
        this.loading = false
      }, 200)
    },
    async onRequestGoodsAlbums () {
      this.loading = true
      await axios.get('/admin/goods/albums', { params: { pid: this.selected } }).then(response => {
        const { code, data } = response.data
        if (code === '200' && data) {
          this.albumData = data
        }
      }).catch(error => {
        console.error(error)
      })
      setTimeout(() => {
        this.loading = false
      }, 200)
    },
    async onRequestGoodsAlbumFiles () {
      this.loading = true
      await axios.get('/admin/goods/album-files', { params: { albumId: this.selected, current: this.pagination.current || 1, size: 30 } }).then(response => {
        const { code, data } = response.data
        if (code === '200' && data) {
          this.pagination.current = data.current
          this.pagination.pages = data.pages

          this.albumFileData = data.records
        }
      }).catch(error => {
        console.error(error)
      })
      setTimeout(() => {
        this.loading = false
      }, 200)
    },
    onFileSelect (album) {
      let fileValueSet = new Set(this.fileValue)
      if (album.done) {
        fileValueSet.delete(album)
        album.done = false
      } else {
        if (this.fileValue.length >= this.size) {
          console.warn('超过数量=>' + this.size)
          return
        }
        album.done = true
        fileValueSet.add(album)
      }
      this.fileValue = Array.from(fileValueSet)
    },
    uploaded (info) {
      if (info.xhr && info.xhr.status === 200) {
        const response = JSON.parse(info.xhr.response)
        if (response && response.code === '200') {
          const item = {
            fileId: response.data[0].fileId,
            fileName: response.data[0].fileName,
            fileUrl: response.data[0].fileUrl
          }
          this.uploadFiles.push(item)
        }
      }
    },
    async saveUploaded () {
      if (!this.selected) {
        this.$q.notify({
          message: '请选择相册！'
        })
        return
      }
      if (this.uploadFiles.length === 0) {
        this.$q.notify({
          message: '请选择文件完成上传！'
        })
        return
      }
      this.uploadFiles.map(e => {
        e.albumId = this.selected
        e.fileType = 'image'
      })
      console.log(this.uploadFiles)
      await axios.post(`/admin/goods/album-files`, this.uploadFiles).then(response => {
        const { code, message, data } = response.data
        if (code === '200' && data) {
          this.$q.notify({
            type: 'positive',
            message: '保存成功.'
          })
          this.onRequestGoodsAlbumFiles()
        } else {
          this.$q.notify({
            message
          })
        }
      }).catch(error => {
        console.error(error)
      })
      this.uploadFiles = []
      this.uploadDialog = false
    },
    async saveAlbum () {
      this.albumForm.pid = this.selected || '0'
      await axios.post(`/admin/goods/albums`, this.albumForm).then(response => {
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
      this.createDialog = false
      this.albumForm = {}
    },
    show () {
      this.$refs.dialog.show()
    },
    hide () {
      this.$refs.dialog.hide()
      this.$destroy()
      this.$el.remove()
    },
    onOk () {
      this.$emit('ok', this.fileValue)
      this.hide()
    }
  }
}
</script>
<style lang="sass" scoped>
.marker
  position: relative
  &-icon
    overflow: hidden
    display: flex
    width: 25px
    height: 25px
    &::before
      content: ''
      position: absolute
      z-index: 1
      top: -70%
      left: -70%
      width: 140%
      height: 140%
      background-color: $primary
      transform: rotate(45deg)
    &.marker-top-right
      &::before
        left: auto
        right: -70%
      & i
        margin-left: auto
        margin-right: calc(30% - 8px)
    & .material-icons
      position: relative
      z-index: 2
      color: #fff

.pos-absolute
  position: absolute
.t-0
  top: 5px
.r-0
  right: 1px
</style>

<template>
  <div>
    <div class="q-col-gutter-md row items-start">
      <div
        class="col-6 col-sm-6 col-md-3"
        v-for="(fileUrl, index) in fileUrls"
        :key="index"
      >
        <q-img
          :src="`${baseUrl+fileUrl}?source=preview`"
          :ratio="4/3"
          v-if="fileType==='image'"
        >
          <div
            class="absolute-bottom row justify-center"
            style="background:none"
          >
            <q-btn-group>
              <q-btn
                color="primary"
                size="10px"
                icon="arrow_back"
                class="wd-30"
                title="向前"
                v-if="maxFiles>1"
                @click="prev(index)"
              />
              <q-btn
                color="primary"
                size="10px"
                icon="save_alt"
                class="wd-30"
                title="保存"
                @click="downSaveUrl(index)"
              />
              <q-btn
                color="primary"
                size="10px"
                icon="center_focus_strong"
                class="wd-30"
                @click="showUrl(index)"
                title="查看"
              />
              <q-btn
                color="primary"
                size="10px"
                icon="cloud_upload"
                class="wd-30"
                title="上传"
                @click="uploader=!uploader"
                v-if="maxFiles<=1"
              />
              <q-btn
                color="primary"
                size="10px"
                icon="delete"
                class="wd-30"
                title="删除"
                @click="deleteUrl(index)"
              />
              <q-btn
                color="primary"
                size="10px"
                icon="arrow_forward"
                class="wd-30"
                title="向后"
                v-if="maxFiles>1"
                @click="next(index)"
              />
            </q-btn-group>
          </div>
          <template v-slot:error>
            <div
              class="absolute-full flex flex-center bg-negative text-white"
              @click="deleteUrl(index)"
              title="点击删除"
            >
              Cannot load {{fileType}}
            </div>
          </template>
        </q-img>
        <q-video
          :ratio="16/9"
          :src="`${baseUrl+fileUrl}?source=preview`"
          v-if="fileType==='video'"
        >

        </q-video>
      </div>
      <div
        class="col-3"
        v-if="fileUrls.length === 0 || maxFiles>1"
      >
        <div
          class="my-dropzone dropzone-default"
          @click="uploader=!uploader"
        >
          <div class="text-h6">单击此处上传</div>
          <div
            class="text-caption"
            v-if="fileType==='image'"
          >最多上传 {{cpMaxFiles}} 张图片</div>
          <div
            class="text-caption"
            v-if="fileType==='video'"
          >支持上传MP4，WEBM 格式文件</div>
        </div>
      </div>
    </div>
    <q-dialog v-model="viewDialog">
      <div
        class="row justify-center items-center image-window"
        style="width:80%;height:80%; max-width:80%;"
      >
        <img :src="baseUrl+viewUrl" />
      </div>
    </q-dialog>
    <q-dialog
      v-model="uploader"
      ref="uploaderDialogRef"
    >
      <q-card
        flat
        class="my-dialog"
        style="min-width:680px;"
      >
        <q-card-section class="q-pa-none">
          <q-uploader
            ref="uploaderRef"
            :url="`${baseUrl}/uploader`"
            flat
            bordered
            :multiple="multiple"
            :max-files="maxFiles"
            :accept="accept"
            style="width:100%;min-height:360px"
            @uploaded="uploaded"
          >
            <template v-slot:list="scope">
              <q-list separator>

                <q-item
                  v-for="file in scope.files"
                  :key="file.name"
                >
                  <q-item-section>
                    <q-item-label class="full-width ellipsis">
                      {{ file.name }}
                    </q-item-label>

                    <q-item-label caption>
                      Status: {{ file.__status }}
                    </q-item-label>

                    <q-item-label caption>
                      {{ file.__sizeLabel }} / {{ file.__progressLabel }}
                    </q-item-label>
                  </q-item-section>

                  <q-item-section
                    v-if="file.__img"
                    thumbnail
                    class="gt-xs"
                  >
                    <img :src="file.__img.src">
                  </q-item-section>

                  <q-item-section
                    top
                    side
                  >
                    <q-btn
                      class="gt-xs"
                      size="12px"
                      flat
                      dense
                      round
                      icon="delete"
                      @click="scope.removeFile(file)"
                    />
                  </q-item-section>
                </q-item>

              </q-list>
            </template>
          </q-uploader>
        </q-card-section>
        <q-card-actions
          align="right"
          class="q-dialog-footer"
        >
          <q-btn
            :label="$q.lang.label.ok"
            color="primary"
            type="submit"
            @click="onSubmit"
          />
          <q-btn
            :label="$q.lang.label.cancel"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'UploaderFile2',
  data () {
    return {
      baseUrl: axios.defaults.baseURL,
      viewDialog: false,
      uploader: false,
      uploaderState: false,
      fileUrlUploaders: [],
      fileUrls: [],
      viewUrl: null
    }
  },
  props: {
    value: {
      required: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    maxFiles: {
      type: Number,
      default: 1
    },
    fileType: {
      type: String,
      default: 'image'
    },
    accept: {
      type: String,
      default: '.jpg, image/*'
    }
  },
  watch: {
    uploader () {
      if (this.maxFiles === 1) {
        this.fileUrlUploaders = []
      }
      this.uploaderState = false
    },
    value () {
      if (this.value) {
        this.fileUrls = this.value
      }
    }
  },
  computed: {
    cpMaxFiles () {
      return this.maxFiles - this.fileUrls.length
    }
  },
  mounted () {
    if (this.value) {
      this.fileUrls = this.value
    }
    this.fileUrls.forEach(fileUrl => {
      this.fileUrlUploaders.push(fileUrl)
    })
  },
  methods: {
    uploaded (info) {
      if (info.xhr && info.xhr.status === 200) {
        const response = JSON.parse(info.xhr.response)
        if (response && response.code === '200') {
          this.fileUrlUploaders.push(response.data[0].fileUrl)
          this.uploaderState = true
        }
      }
    },
    onSubmit () {
      if (!this.uploaderState) {
        this.$q.notify({
          message: '请先选择文件上传后在确认！'
        })
        return
      }
      if (this.maxFiles > 1 && this.fileUrlUploaders.length > this.maxFiles) {
        this.$q.notify({
          message: '最多上传 ' + this.maxFiles + ' 张图片！'
        })
        return
      }
      let temp = []
      this.fileUrlUploaders.forEach(fileUrl => {
        temp.push(fileUrl)
      })
      this.$emit('input', temp)
      this.fileUrls = temp
      this.$refs.uploaderDialogRef.hide()
    },
    prev (index) {
      if (index !== 0 && this.fileUrls.length > 1) {
        this.swapItems(this.fileUrls, index, index - 1)
      }
    },
    next (index) {
      if (index < (this.fileUrls.length - 1)) {
        this.swapItems(this.fileUrls, index, index + 1)
      }
    },
    swapItems (arr, index1, index2) {
      arr[index1] = arr.splice(index2, 1, arr[index1])[0]
      return arr
    },
    showUrl (index) {
      this.viewUrl = this.fileUrls[index]
      this.viewDialog = !this.viewDialog
    },
    deleteUrl (index) {
      this.fileUrlUploaders.splice(index, 1)
      this.fileUrls.splice(index, 1)
    },
    downSaveUrl (index) {
      location.href = this.baseUrl + this.fileUrls[index]
    }
  }
}
</script>

<style lang="sass" scoped>
.image-window
  background: #fff
</style>

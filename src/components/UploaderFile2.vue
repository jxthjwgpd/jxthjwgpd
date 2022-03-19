<template>
  <div>
    <div class="q-col-gutter-md row items-start">
      <div
        class="col-6 col-sm-6 col-md-3"
        v-for="(fileUrl, index) in fileUrls"
        :key="index"
      >
        <q-img
          :src="baseUrl+fileUrl"
          :ratio="4/3"
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
              />
              <q-btn
                color="primary"
                size="10px"
                icon="save_alt"
                class="wd-30"
                title="保存"
              />
              <q-btn
                color="primary"
                size="10px"
                icon="center_focus_strong"
                class="wd-30"
                @click="image = !image"
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
              />
              <q-btn
                color="primary"
                size="10px"
                icon="arrow_forward"
                class="wd-30"
                title="向后"
                v-if="maxFiles>1"
              />
            </q-btn-group>
          </div>
          <template v-slot:error>
            <div class="absolute-full flex flex-center bg-negative text-white">
              Cannot load image
            </div>
          </template>
        </q-img>
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
          <div class="text-caption">最多上传 {{maxFiles}} 张图片</div>
        </div>
      </div>
    </div>
    <q-dialog v-model="image">
      <div
        class="row justify-center items-center image-window"
        style="width:80%;height:80%; max-width:80%;"
      >
        <img src="https://placeimg.com/500/600/nature" />
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
      image: false,
      uploader: false,
      successFileUploders: [],
      fileUrls: []
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
    }
  },
  watch: {
    uploader () {
      if (this.maxFiles === 1) {
        this.successFileUploders = []
      }
    },
    value () {
      this.fileUrls = this.value
    }
  },
  methods: {
    uploaded (info) {
      if (info.xhr && info.xhr.status === 200) {
        const response = JSON.parse(info.xhr.response)
        if (response && response.code === '200') {
          this.successFileUploders.push(response.data[0])
        }
      }
    },
    onSubmit () {
      if (this.successFileUploders.length === 0) {
        this.$q.notify({
          message: '请先选择文件上传后在确认！'
        })
        return
      }
      if (this.maxFiles > 1 && this.successFileUploders.length > this.maxFiles) {
        this.$q.notify({
          message: '最多上传 ' + this.maxFiles + ' 张图片！'
        })
        return
      }
      let temp = []
      this.successFileUploders.forEach(item => {
        temp.push(item.fileUrl)
      })
      this.$emit('input', temp)
      this.fileUrls = temp
      this.$refs.uploaderDialogRef.hide()
    }
  }
}
</script>

<style lang="sass" scoped>
.image-window
  background: #fff
</style>

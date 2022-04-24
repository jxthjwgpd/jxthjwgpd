<template>
  <q-dialog
    ref="dialog"
    @hide="hide"
  >
    <q-uploader
      label="上传文件"
      :url="`${baseUrl}/uploader`"
      flat
      multiple
      @uploaded="uploaded"
      @finish="onOk"
    >
    </q-uploader>
  </q-dialog>
</template>

<script>
import axios from 'axios'
export default {
  name: 'DialogUploader',
  data () {
    return {
      baseUrl: axios.defaults.baseURL,
      loading: false,
      uploadFiles: []
    }
  },
  methods: {
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
    show () {
      this.$refs.dialog.show()
    },
    hide () {
      this.$refs.dialog.hide()
      this.$destroy()
      this.$el.remove()
    },
    onOk () {
      this.$emit('ok', this.uploadFiles)
      this.hide()
    }
  }
}
</script>

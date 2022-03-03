<template>
  <div>
    <q-img
      :src="baseUrl+fileUrl"
      height="280px"
      v-if="fileUrl"
    >
      <div class="absolute-bottom row">
        <div>{{fileUrl}}</div>
        <q-space />
        <div class="row self-center">
          <q-icon
            size="18px"
            name="remove_red_eye"
            @click="$q.dialog({message:'<img src='+baseUrl+fileUrl+'/>',ok:false,html:true,style:'max-width:80%; width:80%;height:72%;'})"
          />
          <q-icon
            class="q-ml-sm"
            size="18px"
            name="delete"
            @click="fileUrl=''"
          />
          <q-icon
            class="q-ml-sm"
            size="18px"
            name="restore"
          />
        </div>
      </div>
    </q-img>
    <q-uploader
      ref="uploaderRef"
      :url="`${baseUrl}/uploader`"
      style="width: 100%;"
      class="q-mt-sm"
      flat
      bordered
      @uploaded="uploaded"
    />
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'UploaderFile',
  data () {
    return {
      baseUrl: axios.defaults.baseURL,
      fileUrl: ''
    }
  },
  props: {
    value: String
  },
  watch: {
    'value' () {
      this.fileUrl = this.value
    },
    'fileUrl' () {
      this.$emit('input', this.fileUrl)
    }
  },
  methods: {
    uploaded (info) {
      if (info.xhr && info.xhr.status === 200) {
        const response = JSON.parse(info.xhr.response)
        if (response && response.code === '200') {
          this.$q.notify({
            type: 'positive',
            message: '上传成功！'
          })
          this.fileUrl = response.data[0].fileUrl
          this.$refs.uploaderRef.reset()
        }
      }
    }
  }
}
</script>

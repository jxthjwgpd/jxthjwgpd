<template>
  <div>
    <div class="row justify-center q-pa-lg">
      <q-btn
        label="上传图片"
        color="primary"
        @click="uploadImage"
      />
      <q-btn
        label="选择图片"
        color="primary"
        class="q-ml-md"
        @click="selectImage"
      />
    </div>
    <div class="container">
      <div class="q-col-gutter-md row items-start">

        <div
          class="col-3"
          v-for="item in data"
          :key="item.id"
        >
          <q-img
            :src="baseUrl + item.fileUrl"
            :ratio="4/3"
          >
            <div class="absolute-top text-center image-header">
              {{item.fileName}}
            </div>
          </q-img>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import AlbumSelected from '../shop/goods/AlbumSelected.vue'
import DialogUploader from '../../components/DialogUploader.vue'
export default {
  name: 'Upload',
  data () {
    return {
      baseUrl: axios.defaults.baseURL,
      data: []
    }
  },
  methods: {
    uploadImage () {
      this.$q.dialog({
        component: DialogUploader,
        parent: this
      }).onOk(e => {
        console.log('OK')
        this.data = e
      })
    },
    selectImage () {
      this.$q.dialog({
        component: AlbumSelected,
        parent: this,
        size: 9
      }).onOk(e => {
        console.log('OK')
        this.data = e
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.image-header
  background: linear-gradient(180deg,rgba(0,0,0,0.7) 20%,transparent)
</style>

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
          v-for="(item, index) in data"
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
                @click="data.splice(index, 1)"
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
        this.data = e
      })
    },
    selectImage () {
      this.$q.dialog({
        component: AlbumSelected,
        parent: this,
        size: 9
      }).onOk(e => {
        this.data = e
      })
    },
    prev (index) {
      if (index !== 0 && this.data.length > 1) {
        this.swapItems(this.data, index, index - 1)
      }
    },
    next (index) {
      if (index < (this.data.length - 1)) {
        this.swapItems(this.data, index, index + 1)
      }
    },
    swapItems (arr, index1, index2) {
      arr[index1] = arr.splice(index2, 1, arr[index1])[0]
      return arr
    }
  }
}
</script>
<style lang="sass" scoped>
.image-header
  background: linear-gradient(180deg,rgba(0,0,0,0.7) 20%,transparent)
</style>

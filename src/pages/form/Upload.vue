<template>
  <div class="row justify-center q-pa-lg">
    <q-btn
      label="选择图片"
      color="primary"
      @click="alert"
    />
  </div>
</template>

<script>
import AlbumSelected from '../shop/goods/AlbumSelected.vue'
export default {
  name: 'Upload',
  methods: {
    alert () {
      this.$q.dialog({
        component: AlbumSelected,
        parent: this,
        size: 9
      }).onOk(e => {
        console.log('OK')
        console.log(e)
      })
    }
  }
}
</script>

<style lang="sass" scoped>

</style>

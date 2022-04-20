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
import DialogImageSelect from '../../components/DialogImageSelect.vue'
export default {
  name: 'Upload',
  methods: {
    alert () {
      this.$q.dialog({
        component: DialogImageSelect,
        parent: this
      }).onOk(() => {
        console.log('OK')
      }).onCancel(() => {
        console.log('Cancel')
      })
    }
  }
}
</script>

<style lang="sass" scoped>

</style>

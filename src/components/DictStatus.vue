<template>
  <q-badge :color="this.dictStatusData[this.status].color">{{this.dictStatusData[this.status].label}}</q-badge>
</template>

<script>
export default {
  name: 'DictStatus',
  data () {
    return {
      dictStatusData: {
        '0': {
          label: this.$t('status.normal'),
          color: 'positive'
        },
        '2': {
          label: this.$t('status.disable'),
          color: 'negative'
        }
      }
    }
  },
  props: {
    status: String
  }
}
</script>

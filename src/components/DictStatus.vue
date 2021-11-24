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
          label: '正常',
          color: 'positive'
        },
        '2': {
          label: '禁用',
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

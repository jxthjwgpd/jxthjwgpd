<template>
  <q-badge :color="this.dictStatusData[this.status].color">{{this.dictStatusData[this.status].label}}</q-badge>
</template>

<script>
export default {
  name: 'DictStatus',
  props: {
    status: String,
    dictStatusData: {
      default: {
        '0': {
          label: '正常',
          color: 'blue'
        },
        '1': {
          label: '删除',
          color: 'yellow-6'
        },
        '2': {
          label: '锁定',
          color: 'red'
        }
      }
    }
  }
}
</script>

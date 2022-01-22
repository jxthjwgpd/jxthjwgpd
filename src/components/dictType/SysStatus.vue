<template>
  <q-badge :color='sysStatus[value].color'>{{sysStatus[value].label}}</q-badge>
</template>

<script>
import { sysStatus } from '../../assets/dict.js'
export default {
  name: 'DictStatus',
  data () {
    return {
      sysStatus
    }
  },
  props: {
    value: String
  }
}
</script>

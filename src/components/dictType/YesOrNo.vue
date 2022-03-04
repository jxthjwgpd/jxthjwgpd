<template>
  <span>{{yesOrno[value]}}</span>
</template>

<script>
import { yesOrno } from '../../assets/dict.js'
export default {
  name: 'YesOrNo',
  data () {
    return {
      yesOrno
    }
  },
  props: {
    value: String
  }
}
</script>

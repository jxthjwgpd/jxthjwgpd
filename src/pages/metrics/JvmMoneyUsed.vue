<template>
  <q-card
    flat
    v-show="data"
  >
    <q-card-section>
      <div class="text-h6 row no-wrap items-center">
        <div class="ellipsis text-capitalize">{{data.name}}</div>
        <div class="q-space"></div>
      </div>
    </q-card-section>
    <q-card-section class="text-h5 q-pb-none">
      {{humanStorageSize(measurement.value)}}/{{humanStorageSize(measurement1.value)}}
    </q-card-section>
    <q-card-section>
      {{data.description}}
    </q-card-section>
  </q-card>
</template>

<script>
import axios from 'axios'
import { format } from 'quasar'
const { humanStorageSize } = format
export default {
  name: 'JvmMoneyUsed',
  data () {
    return {
      data: {},
      measurement: {
        value: 0
      },
      data1: {},
      measurement1: {
        value: 0
      }
    }
  },
  mounted () {
    this.onRefresh()
  },
  methods: {
    humanStorageSize,
    onRefresh () {
      axios.get('/actuator/metrics/jvm.memory.max', {}).then(response => {
        this.data1 = response.data
        this.measurement1 = response.data.measurements[0]
      })
      axios.get('/actuator/metrics/jvm.memory.used', {}).then(response => {
        this.data = response.data
        this.measurement = response.data.measurements[0]
      })
    }
  },
  computed: {
    // progressLabel () {
    //   return (this.progress * 100).toFixed(2) + '%'
    // }
  }
}
</script>

<style lang="sass" scoped>

</style>

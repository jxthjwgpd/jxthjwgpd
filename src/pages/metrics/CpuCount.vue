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
    <q-card-section class="text-h3 q-pb-none">
      {{measurement.value}}
    </q-card-section>
    <q-card-section>
      {{data.description}}
    </q-card-section>
  </q-card>
</template>

<script>
import axios from 'axios'
export default {
  name: 'JvmMoneyUsed',
  data () {
    return {
      data: {},
      measurement: {}
    }
  },
  mounted () {
    this.onRefresh()
  },
  methods: {
    onRefresh () {
      axios.get('/actuator/metrics/system.cpu.count', {}).then(response => {
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

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
    <q-card-section class="text-bold q-pb-none">
      <q-linear-progress
        size="15px"
        :value="progress"
        color="accent"
      >
        <div class="absolute-full flex flex-center">
          <q-badge
            color="white"
            text-color="accent"
            :label="progressLabel"
          />
        </div>
      </q-linear-progress>
    </q-card-section>
    <q-card-section>
      {{data.description}}
    </q-card-section>
  </q-card>
</template>

<script>
import axios from 'axios'
export default {
  name: 'CpuUsage',
  data () {
    return {
      data: {},
      progress: 0
    }
  },
  mounted () {
    this.onRefresh()
  },
  methods: {
    onRefresh () {
      axios.get('/actuator/metrics/system.cpu.usage', {}).then(response => {
        this.data = response.data
        this.progress = response.data.measurements[0].value
      })
    }
  },
  computed: {
    progressLabel () {
      return (this.progress * 100).toFixed(2) + '%'
    }
  }
}
</script>

<style lang="sass" scoped>

</style>

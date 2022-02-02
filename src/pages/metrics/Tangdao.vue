<template>
  <q-card
    flat
    v-show="data"
  >
    <q-card-section>
      <div class="text-h6 row no-wrap items-center">
        <div class="ellipsis text-capitalize">
          <span :class="`${tangdao.status==='UP'?'text-positive':''}`">{{tangdao.status}}</span>
        </div>
        <q-space />
        <div>{{tangdao.details.applicationName}}</div>
      </div>
    </q-card-section>
    <q-card-section class="q-pb-none q-pt-none">
      <div
        class="row no-wrap items-center"
        style="line-height:36px"
      >
        Cache
        <q-space />
        {{tangdao.details.cacheNameCount}}
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import axios from 'axios'
import { format } from 'quasar'
const { humanStorageSize } = format
export default {
  name: 'Tangdao',
  data () {
    return {
      data: {},
      tangdao: {
        details: {
          name: '-'
        }
      }
    }
  },
  mounted () {
    this.onRefresh()
  },
  methods: {
    humanStorageSize,
    onRefresh () {
      axios.get('/actuator/health', {}).then(response => {
        this.data = response.data
        this.tangdao = response.data.components.tangdao
      })
    }
  },
  computed: {
  }
}
</script>

<style lang="sass" scoped>

</style>

<template>
  <q-card
    flat
    v-show="data"
  >
    <q-card-section>
      <div class="text-h6 row no-wrap items-center">
        <div class="ellipsis text-capitalize">
          <span :class="`${data.status==='UP'?'text-positive':''}`">{{data.status}}</span>
        </div>
        <q-space />
        <div>Server</div>
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section v-if="diskSpace">
      <div class="text-h6 row no-wrap items-center">
        <div class="ellipsis text-capitalize">
          <span :class="`${diskSpace.status==='UP'?'text-positive':''}`">{{diskSpace.status}}</span>
        </div>
        <q-space />
        <div>DiskSpace</div>
      </div>
    </q-card-section>
    <q-card-section class="q-pb-none q-pt-none">
      <div
        class="row no-wrap items-center"
        style="line-height:36px"
      >
        total
        <q-space />
        {{  humanStorageSize(diskSpace.details.total)}}
      </div>
      <div
        class="row no-wrap items-center"
        style="line-height:36px"
      >
        free
        <q-space />
        {{  humanStorageSize(diskSpace.details.free)}}
      </div>
      <div
        class="row no-wrap items-center"
        style="line-height:36px"
      >
        threshold
        <q-space />
        {{  humanStorageSize(diskSpace.details.threshold)}}
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section v-if="db">
      <div class="text-h6 row no-wrap items-center">
        <div class="ellipsis text-capitalize">
          <span :class="`${db.status==='UP'?'text-positive':''}`">{{db.status}}</span>
        </div>
        <q-space />
        <div>DbServer</div>
      </div>
    </q-card-section>
    <q-card-section class="q-pb-none q-pt-none">
      <div
        class="row no-wrap items-center"
        style="line-height:36px"
      >
        database
        <q-space />
        {{  db.details.database || '-'}}
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div class="text-h6 row no-wrap items-center">
        <div class="ellipsis text-capitalize">
          <span :class="`${ping.status==='UP'?'text-positive':''}`">{{ping.status}}</span>
        </div>
        <q-space />
        <div>Inter</div>
      </div>
    </q-card-section>
    <q-card-section class="text-h5 q-pb-none">
      0.0.0.0
    </q-card-section>
    <q-card-section>
      Control
    </q-card-section>
  </q-card>
</template>

<script>
import axios from 'axios'
import { format } from 'quasar'
const { humanStorageSize } = format
export default {
  name: 'Health',
  data () {
    return {
      data: {},
      diskSpace: {
        details: {
          total: 0,
          free: 0,
          threshold: 0
        }
      },
      db: { details: {} },
      ping: {
        details: {}
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
        this.diskSpace = response.data.components.diskSpace
        this.db = response.data.components.db
        this.ping = response.data.components.ping
      })
    }
  },
  computed: {
  }
}
</script>

<style lang="sass" scoped>

</style>

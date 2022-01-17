<template>
  <q-card
    flat
    v-show="data"
  >
    <q-card-section>
      <div class="text-h6 row no-wrap items-center">
        <div class="ellipsis text-capitalize">
          Env
        </div>
        <q-space />
        -
      </div>
    </q-card-section>
    <q-card-section class="q-pb-none q-pt-none">
      <div
        class="row no-wrap items-center"
        style="line-height:36px"
      >
        Profiles
        <q-space />
        {{activeProfiles}}
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-pb-none q-pt-none">
      <div
        class="row no-wrap items-center"
        style="line-height:36px"
      >
        Pid
        <q-space />
        {{systemProperties['PID'].value}}
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-pb-none q-pt-none">
      <div
        class="row no-wrap items-center"
        style="line-height:36px"
      >
        Java
        <q-space />
        <span class="text-right">{{systemProperties['java.vm.name'].value}}</span>
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-pb-none q-pt-none">
      <div
        class="row no-wrap items-center"
        style="line-height:36px"
      >
        Java Version
        <q-space />
        {{systemProperties['java.runtime.version'].value}}
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-pb-none q-pt-none">
      <div
        class="row no-wrap items-center"
        style="line-height:36px"
      >
        系统
        <q-space />
        {{systemEnvironments['OS'].value}}
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-pb-none q-pt-none">
      <div
        class="row no-wrap items-center"
        style="line-height:36px"
      >
        架构
        <q-space />
        {{systemEnvironments['PROCESSOR_ARCHITECTURE'].value}}
      </div>
    </q-card-section>
    <q-card-section class="q-pb-none q-pt-none">
      <div
        class="row no-wrap items-center"
        style="line-height:36px"
      >
        用户
        <q-space />
        {{systemEnvironments['USERNAME'].value}}
      </div>
    </q-card-section>

  </q-card>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Env',
  data () {
    return {
      data: {},
      activeProfiles: [],
      systemProperties: {
        'PID': '-',
        'java.vm.name': '-',
        'java.vm.vendor': '-',
        'java.runtime.name': '-',
        'java.runtime.version': '-'
      },
      systemEnvironments: {
        'PROCESSOR_ARCHITECTURE': '-',
        'USERNAME': '-',
        'OS': '-',
        'COMPUTERNAME': '-'
      }
    }
  },
  mounted () {
    this.onRefresh()
  },
  methods: {
    onRefresh () {
      axios.get('/actuator/env', {}).then(response => {
        this.data = response.data
        this.activeProfiles = response.data.activeProfiles
        if (response.data.propertySources[2]) {
          this.systemProperties = response.data.propertySources[2].properties
        }
        if (response.data.propertySources[3]) {
          this.systemEnvironments = response.data.propertySources[3].properties
        }
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
